<template>
  <s-loading v-if="loading"/>
  <v-card v-else class="detail-card">
    <div class="detail-card-title-box">
      <div class="detail-card-title ellipsis-col">
        <v-card-title class="detail-card-title-main" style="padding-bottom: 0">
          {{problem.title}}
          <v-card-subtitle>
            {{`${$t('problem.score')}: ${problem.fullScore}`}}
          </v-card-subtitle>
        </v-card-title>
        <v-card-subtitle class="s-problem-detail-card-sub">
          <span style="font-size: 14px">
            <s-tooltip-icon :icon-class="`icon-color-0 icon-left-5`" :text="$t('problem.memory')" direction="top">
              mdi-database
            </s-tooltip-icon>
            {{`${problem.spaceLimit}MB`}}
            <s-tooltip-icon :icon-class="`icon-color-0 icon-left-5`" :text="$t('problem.time')" direction="top">
              mdi-timer-sand
            </s-tooltip-icon>
            {{`${problem.timeLimit}ms`}}
            <s-tooltip-icon :icon-class="`icon-color-0 icon-left-5`" :text="$t('problem.submitted')" direction="top">
              mdi-upload
            </s-tooltip-icon>
            {{problem.numberSubmit}}
            <s-tooltip-icon :icon-class="`icon-color-0 icon-left-5`" :text="$t('problem.resolved')" direction="top">
              mdi-check
            </s-tooltip-icon>
            {{problem.numberSolve}}
          </span>
        </v-card-subtitle>
      </div>
      <v-tabs v-model="tab" background-color="white" right class="detail-card-tabs" height="60" color="secondary">
        <v-tabs-slider color="accent"/>
        <v-tab
          v-for="bar in tabs"
          :key="bar"
        >
          {{$t(bar)}}
        </v-tab>
        <v-tab v-if="!!problem.solution">
          {{$t('nav-bar.solution')}}
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
      <v-tab-item>
        <s-code-editor :code.sync="code" :lang.sync="lang" @submit="submit" :disabled="disableEditor" @pull="pullCode"/>
      </v-tab-item>
      <v-tab-item>
        <s-problem-statistic/>
      </v-tab-item>
      <v-tab-item>
        <s-record-list :records="records"/>
      </v-tab-item>
      <v-tab-item v-if="!!problem.solution">
        <s-markdown :markdown="problem.solution" class="description"/>
      </v-tab-item>
    </v-tabs-items>
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

@Component({
  components: {SLoading, SCodeEditor, STooltipIcon, SProblemStatistic, SMarkdown, SRecordList},
  computed: {...mapState(['width_height', 'problemInfo'])}
})
export default class SProblemDetailCard extends Vue {
  readonly width_height!: { width: number }
  readonly problemInfo!: EntityContainer<Problem>
  readonly keyInState:string = 'problem-detail'
  readonly tabs: Array<string> = ['nav-bar.description', 'submit', 'nav-bar.statistic', 'nav-bar.rec']
  pid: number = -1
  records: Array<Record> = []
  disableEditor: boolean = false
  loading: boolean = false
  recordsLoading: boolean = false
  lang: string = 'pgsql'
  code: string = ''
  private cnt = 1

  created() {
    this.pid = parseInt(this.$route.params.pid)
    this.loadProblem()
    this.loadCache()
    if(this.$route.params.code){
      this.code = this.$route.params.code
    }
  }

  mounted(){
    if(this.$route.query.recover){
      if(!window.state?.[this.keyInState]) return
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
      this.loadRecords()
    }
  }

  get problem(): Problem | undefined {
    let _ = this.cnt
    console.log(!!this.problemInfo.get(this.pid)?.solution)
    return this.problemInfo.get(this.pid)
  }

  loadCache(){
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
    }
  }

  async submit() {
    this.disableEditor = true
    try {
      const re = (await this.$api.submitCode(this.pid, {
        code: this.code,
        dialect: this.lang,
        submitTime: Date.now()
      }))
      this.$alert(new Alert({
        type: 'success',
        info: re.toString()
      }))
      await this.$router.push('/record/all')//TODO
    }catch (e) {
      this.$alert(new Alert({
        type:'error',
        info:e.info??e.toString(),
        time:8000
      }))
      await this.$router.push('/record/all')//TODO
    }
  }

  pullCode(){
    if(!!this.problem?.recentCode){
      this.code = this.problem.recentCode
    }else{
      this.$alert(new Alert({
        type:'warning',
        info:this.$t('warning.no-code').toString()
      }))
    }
  }

  beforeDestroy() {
    localStorage[`/problem/${this.pid}`] = JSON.stringify({
      code: this.code,
      lang: this.lang
    })
    window.state[this.keyInState] = {
      code:this.code,
      lang:this.lang
    }
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
</style>
