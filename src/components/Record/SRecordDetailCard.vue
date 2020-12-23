<template>
  <s-loading v-if="loading" class="s-card-loading"/>
  <v-card v-else class="detail-card">
    <div class="detail-card-title-box" :style="`padding-left: ${width_height.width/80+4}px`">
      <div class="s-record-title-box" style="">
        <div class="ellipsis-col detail-card-title"
             :style="`padding-top: ${width_height.height/100}px;padding-bottom: 12px;`">
          <v-card-title class="s-record-detail-card-title">
            {{ `${$t('record.submission')}: #${record.ID.format(3, '0', false)}` }}
          </v-card-title>
          <v-card-subtitle class="s-record-detail-card-sub s-link"
                           @click="$router.push(`/problem/${record.problemID}`)">
            {{ `${$t('record.searchP')}: ${record.problemTitle}` }}
          </v-card-subtitle>
          <v-btn text class="refresh" @click="loadRecord(true)">
            <v-icon class="icon-color-2">mdi-sync</v-icon>
          </v-btn>
        </div>
        <s-record-result-box :result="record.result" :score="record.score"/>
      </div>
      <v-tabs v-model="tab" background-color="white" color="secondary" right
              class="detail-card-tabs" height="50">
        <v-tabs-slider color="accent"/>
        <v-tab>
          {{ $t('nav-bar.description') }}
        </v-tab>
        <v-tab v-if="!!record.code">
          {{ $t('nav-bar.code') }}
        </v-tab>
      </v-tabs>
    </div>
    <v-divider class="s-divider"/>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <s-record-description :record="record"/>
      </v-tab-item>
      <v-tab-item class="s-flex">
        <s-codemirror v-if="!!record.code" :code="record.code" :mime="`text/x-${record.dialect.toLowerCase()}`"
                      read-only="nocursor" :class="{'show-problem':flagShowProblem}" style="flex-grow: 1"/>
        <s-markdown v-if="flagShowProblem" :markdown="description" style="padding: 16px;width: 48%"/>
        <div class="s-record-tool">
          <v-btn fab color="info" @click="flagShowProblem=!flagShowProblem">
            <s-tooltip-icon :text="$t('problem.show-des')" direction="top">
              {{ flagShowProblem ? 'mdi-eye-off-outline' : 'mdi-eye-outline' }}
            </s-tooltip-icon>
          </v-btn>
          <v-btn fab color="accent" @click="edit">
            <s-tooltip-icon :text="$t('record.edit')" direction="top">
              mdi-pencil
            </s-tooltip-icon>
          </v-btn>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import {mapState} from "vuex";
import {Problem, Record} from "@/ts/entities";
import SCodeEditor from "@/components/Problem/SCodeEditor.vue";
import SCodemirror from "@/components/General/SCodemirror.vue";
import {EntityContainer} from "@/ts/entity-container";
import SRecordDescription from "@/components/Record/SRecordDescription.vue";
import SRecordResultBox from "@/components/Record/SRecordResultBox.vue";
import SMarkdown from "@/components/General/SMarkdown.vue";
import STooltipIcon from "@/components/General/STooltipIcon.vue";
import SLoading from "@/components/General/SLoading.vue";
import {SUtil} from "@/ts/utils";

@Component({
  components: {SLoading, STooltipIcon, SMarkdown, SRecordResultBox, SRecordDescription, SCodemirror, SCodeEditor},
  computed: {
    ...mapState(['width_height', 'recordInfo'])
  }
})
export default class SRecordDetailCard extends Vue {
  readonly width_height!: { width: number, height: number }
  readonly recordInfo!: EntityContainer<Record>

  loading: boolean = false
  polling: boolean = false
  private cnt: number = 1
  problem: Problem = {} as Problem
  flagShowProblem: boolean = false

  created() {
    this.loadRecord(true)
    this.polling_()
  }

  async polling_() {
    this.polling = this.record?.result.trim().toUpperCase() === 'PENDING'
    while (this.polling) {
      const re = await this.$api.polling(this.record!.ID)
      this.polling = this.polling&&!re.isComplete
      await SUtil.sleep(1500)
    }
    await this.loadRecord(true)
  }

  async loadRecord(force = false) {
    if (!this.record || force) {
      this.loading = true
      let detailRecord = await this.$api.queryRecord(this.rid)
      this.$store.commit('setRecordInfo', {detailRecord})
      this.loading = false
      this.cnt++
    } else if (!this.record.code) {
      let code = await this.record.queryCode()
      this.$store.commit('setRecordInfo', {
        code: {
          code: code,
          id: this.rid
        }
      })
    }
    if (this.$store.state.problemInfo.get(this.record?.problemID)) {
      this.problem = this.$store.state.problemInfo.get(this.record?.problemID)
    } else {
      this.problem = await this.$api.queryProblem(this.record!.problemID)
      this.$store.commit('setProblemInfo', {detailProblem: this.problem})
    }
  }

  edit() {
    this.$router.push({
      path: `/problem/${this.record?.problemID}#1`,
      params: {
        code: this.record?.code ?? ''
      }
    })
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
  }

  get rid(): number {
    return parseInt(this.$route.params.rid)
  }

  get record(): Record | undefined {
    let _ = this.cnt
    return this.recordInfo.get(this.rid)
  }

  get description() {
    return this.problem.description ?? ''
  }

  beforeDestroy() {
    this.polling = false
  }
}
</script>

<style lang="scss">
.s-record-detail-card-title {
  text-align: center;
  display: inline-block;
}

.inlist-user {
  flex-grow: 0;
}

.s-record-title-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-right: 60px;
  justify-content: flex-start;
  width: 400px
}

.s-record-tool {
  display: flex;
  flex-direction: column;
  //position: absolute;
  position: fixed;
  bottom: 60px;
  right: 40px;
  z-index: 10000;

  & > * {
    margin-top: 10px;
  }
}
</style>
<style scoped lang="scss">
.refresh {
  top: 15px;
}

.record-box {
  flex-grow: 3;
}

.show-problem {
  width: 48%;
}
</style>
