<template>
  <s-loading v-if="loading" class="s-card-loading"/>
  <v-card v-else class="detail-card">
    <div class="detail-card-title-box">
      <div class="detail-card-title ellipsis-col">
        <v-card-title class="detail-card-title-main" style="padding-bottom: 0">
          {{ problem.title }}
          <v-card-subtitle>
            {{ `${$t('problem.score')}: ${problem.fullScore}` }}
            <router-link :to="`/assignment/${problem.assignmentId}`" style="padding-left: 12px">
              {{ $t('problem.back') }}
            </router-link>
          </v-card-subtitle>
        </v-card-title>
        <v-card-subtitle class="s-problem-detail-card-sub">
          <span style="font-size: 14px">
            <s-tooltip-icon :icon-class="`icon-color-0 icon-left-5`" :text="$t('problem.memory')" direction="top">
              mdi-database
            </s-tooltip-icon>
            {{ `${problem.spaceLimit}MB` }}
            <s-tooltip-icon :icon-class="`icon-color-0 icon-left-5`" :text="$t('problem.time')" direction="top">
              mdi-timer-sand
            </s-tooltip-icon>
            {{ `${problem.timeLimit}ms` }}
            <s-tooltip-icon :icon-class="`icon-color-0 icon-left-5`" :text="$t('problem.submitted')" direction="top">
              mdi-upload
            </s-tooltip-icon>
            {{ problem.numberSubmit }}
            <s-tooltip-icon :icon-class="`icon-color-0 icon-left-5`" :text="$t('problem.resolved')" direction="top">
              mdi-check
            </s-tooltip-icon>
            {{ problem.numberSolve }}
          </span>
          <br>
        </v-card-subtitle>
      </div>
      <v-tabs v-model="tab" background-color="white" right class="detail-card-tabs" height="60" color="secondary">
        <v-tabs-slider color="accent"/>
        <v-tab
          v-for="bar in tabs"
          :key="bar"
        >
          {{ $t(bar) }}
        </v-tab>
        <v-tab v-if="!!problem.solution">
          {{ $t('nav-bar.solution') }}
        </v-tab>
      </v-tabs>
      <v-btn text class="refresh" @click="loadProblem(true)">
        <v-icon class="icon-color-2">mdi-sync</v-icon>
      </v-btn>
    </div>
    <v-divider class="s-divider"/>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <s-markdown :markdown="problem.description" class="description"/>
      </v-tab-item>
      <v-tab-item class="s-flex">
        <s-markdown v-if="flagShowProblem" :markdown="problem.description" class="description"/>
        <s-loading v-if="polling" style="width: 100%;min-height: 640px;">
          <div class="block-mid" style="font-size: 26px;text-align: center;">
            {{ pollingMessage }}
          </div>
        </s-loading>
        <s-code-editor v-else :code.sync="code" :lang.sync="lang" @submit="submit" :disabled="disableEditor"
                       @pull="pullCode"
                       @show-des="flagShowProblem=!flagShowProblem" :style="`width:${flagShowProblem?'48%':'100%'}`"/>
      </v-tab-item>
      <v-tab-item>
        <s-problem-statistic/>
      </v-tab-item>
      <v-tab-item>
        <s-loading v-if="recordsLoading" class="s-tab-loading"/>
        <s-record-list v-else :records="records"/>
      </v-tab-item>
      <v-tab-item v-if="!!problem.solution">
        <s-markdown :markdown="problem.solution" class="description"/>
      </v-tab-item>
    </v-tabs-items>

    <v-scale-transition>
      <div v-if="showEdit||showRejudge&&tab%4===0" class="s-problem-tool">
        <v-btn fab color="info" @click="$router.push(`/modify/assignment/${problem.assignmentId}/problem/${pid}`)"
               width="72" height="72" v-if="showEdit">
          <s-tooltip-icon :text="$t('create.edit')" direction="top" :size="32">
            mdi-pencil
          </s-tooltip-icon>
        </v-btn>
        <v-btn fab color="warning" @click="rejudge" width="72" height="72" v-if="showRejudge">
          <s-tooltip-icon :text="$t('problem.rejudge')" direction="top" :size="32">
            mdi-restart-alert
          </s-tooltip-icon>
        </v-btn>
      </div>
    </v-scale-transition>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import {mapState} from "vuex";
import {Alert, Problem, Record} from "@/ts/entities";
import SRecordList from "@/components/Record/SRecordList.vue";
import SMarkdown from "@/components/General/SMarkdown.vue";
import SProblemStatistic from "@/components/Problem/SProblemStatistic.vue";
import STooltipIcon from "@/components/General/STooltipIcon.vue";
import SCodeEditor from "@/components/Problem/SCodeEditor.vue";
import SLoading from "@/components/General/SLoading.vue";
import {EntityContainer} from "@/ts/entity-container";
import {Permission} from "@/ts/user";
import {SUtil} from "@/ts/utils";

@Component({
  components: {SLoading, SCodeEditor, STooltipIcon, SProblemStatistic, SMarkdown, SRecordList},
  computed: {...mapState(['width_height', 'problemInfo'])}
})
export default class SProblemDetailCard extends Vue {
  readonly width_height!: { width: number }
  readonly problemInfo!: EntityContainer<Problem>
  readonly keyInState: string = 'problem-detail'
  readonly tabs: Array<string> = ['nav-bar.description', 'submit', 'nav-bar.statistic', 'nav-bar.rec']
  pid: number = -1
  records: Array<Record> = []
  disableEditor: boolean = false
  loading: boolean = false
  recordsLoading: boolean = false
  flagShowProblem: boolean = false
  lang: string = 'pgsql'
  code: string = ''
  polling: boolean = false
  pollingMessage: string = 'Pending...'
  private cnt = 1

  created() {
    this.pid = parseInt(this.$route.params.pid)
    this.loadProblem()
    this.loadCache()
    if (this.$route.params.code) {
      this.code = this.$route.params.code
    }
  }

  get showEdit() {
    return this.$store.state.isAuthenticated && this.$store.state.user.hasPermission(Permission.ALLOWANCE.MODIFY_ASSIGNMENT)
  }

  get showRejudge(){
    return this.$store.state.isAuthenticated && this.$store.state.user.hasPermission(Permission.ALLOWANCE.REJUDGE)
  }

  mounted() {
    if (this.$route.query.recover) {
      if (!window.state?.[this.keyInState]) return
      for (let stateKey in window.state[this.keyInState]) {
        if (window.state[this.keyInState].hasOwnProperty(stateKey)) {
          //@ts-ignore
          this[stateKey] = window.state[this.keyInState][stateKey]
        }
      }
    }
  }

  get tabHeight(): number {
    let height = 160
    if (!!this.problem?.solution) height += 40
    // if(this.$store.state.user)
    return height
  }

  get tab(): number {
    return parseInt(this.$route.hash.slice(1))
  }

  set tab(v: number) {
    //@ts-ignore
    this.$router.replace({
      ...this.$route,
      hash: `#${v}`
    })
    if (v === 3) { // 记录页面
      this.loadRecords(true)
    }
  }

  get problem(): Problem | undefined {
    let _ = this.cnt
    return this.problemInfo.get(this.pid)
  }

  loadCache() {
    const cache = JSON.parse(localStorage[`/problem/${this.pid}`])
    this.code = cache.code
    this.lang = cache.lang
  }

  async loadRecords(force = false) {
    if (this.records.length === 0 || force) {
      this.recordsLoading = true
      this.records = (await this.$api.searchRecordPage({
        start: 1,
        end: 10,
        filter: {
          problem: this.problem?.title,
          assignment: '',
          user: ''
        }
      })).entities
      this.recordsLoading = false
    }
  }

  async loadProblem(force = false) {
    if (!this.problem || force) {
      this.loading = true
      let detailProblem = await this.$api.queryProblem(this.pid)
      this.$store.commit('setProblemInfo', {detailProblem})
      this.loading = false
      // trigger the problem from mapTable
      this.cnt++
      this.disableEditor = this.problem?.status.trim().toUpperCase() === 'CLOSED'
        && !this.$store.state.user.hasPermission(Permission.ALLOWANCE.TEST_CODE)
    }
  }

  async submit() {
    this.disableEditor = true
    try {
      const re = await this.$api.submitCode(this.pid, {
        code: this.code,
        dialect: this.lang,
        submitTime: Date.now()
      })
      if (re.msg.trim().toUpperCase() !== 'SUCCESS') {
        return
      }
      this.$alert(new Alert({
        type: 'success',
        info: re.msg
      }))
      this.polling = true
      let pollingRes = await this.$api.polling(re.data)
      while (!pollingRes.isComplete && this.polling) {
        if (pollingRes.hasError) {
          this.$alert(new Alert({
            type: 'error',
            info: pollingRes.description
          }))
        }
        this.pollingMessage = pollingRes.description
        await SUtil.sleep(1500)
        pollingRes = await this.$api.polling(re.data)
      }
      this.polling = false
      await this.$router.push(`/record/${pollingRes.recordId}`)
    } catch (e) {
      this.$alert(new Alert({
        type: 'error',
        info: e.info ?? e.toString(),
        time: 8000
      }))
      this.polling = false
      this.disableEditor = false
    }
  }

  pullCode() {
    if (!!this.problem?.recentCode) {
      this.code = this.problem.recentCode
    } else {
      this.$alert(new Alert({
        type: 'warning',
        info: this.$t('warning.no-code').toString()
      }))
    }
  }

  async rejudge() {
    if (!window.confirm(this.$t('warning.warn').toString())) return
    const msg = await this.$api.rejudgeProblem(this.pid)
    SUtil.alertIfSuccess(msg, 'success.submit', this)
  }

  beforeDestroy() {
    this.polling = false
    const _ = {
      code: this.code,
      lang: this.lang
    }
    window.state[this.keyInState] = _
    localStorage[`/problem/${this.pid}`] = JSON.stringify(_)
  }
}
</script>

<style lang="scss">

.s-problem-detail-card-sub {
  padding-top: 6px !important;
  padding-bottom: 10px;
}


</style>
<style scoped lang="scss">
.refresh {
  top: 15px;
}

.s-problem-tool {
  display: flex;
  flex-direction: column;
  //position: absolute;
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10000;

  & > * {
    margin-top: 10px;
  }
}
</style>
