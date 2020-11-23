<template>
  <v-card class="detail-card">
    <div v-if="width_height.width>9200" class="detail-card-title-box--vertical">
      <v-tabs v-model="tab" background-color="white" color="secondary" vertical
              class="detail-card-tabs--vertical" :height="tabHeight">
        <v-tabs-slider color="accent"/>
        <v-tab
          v-for="bar in tabs"
          :key="bar"
        >
          {{$t(bar)}}
        </v-tab>
        <v-tab v-if="!!problem.solution">
          {{$t('solution')}}
        </v-tab>
      </v-tabs>
      <div class="ellipsis-col detail-card-title--vertical">
        <v-card-title class="s-problem-detail-card-title">
          {{problem.title}}
        </v-card-title>
        <div class="s-problem-detail-card-sub">
          <div style="margin: 7px auto 10px auto">
            <v-icon class="icon-color-0 icon-left-5">
              mdi-database
            </v-icon>
            {{`${problem.spaceLimit}MB`}}
            <v-icon class="icon-color-0 icon-left-5">
              mdi-timer-sand
            </v-icon>
            {{`${problem.timeLimit}ms`}}
            <v-icon class="icon-color-0 icon-left-5" style="transform: scale(1.2) translateY(-1px)">
              mdi-cash-100
            </v-icon>
            {{`${problem.fullScore}`}}
            <v-icon class="icon-color-0 icon-left-5">
              mdi-upload
            </v-icon>
            {{problem.numberSubmit}}
            <v-icon class="icon-color-0 icon-left-5">
              mdi-check
            </v-icon>
            {{problem.numberSolve}}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="detail-card-title-box">
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
      </v-tabs>
      <v-btn text class="refresh">
        <v-icon class="icon-color-2">mdi-sync</v-icon>
      </v-btn>
    </div>
    <v-divider class="s-divider"/>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <s-markdown :markdown="problem.description" class="description"/>
      </v-tab-item>
      <v-tab-item>
        <s-code-editor :code.sync="code" :lang.sync="lang" @submit="submit" :disabled="disableEditor"/>
      </v-tab-item>
      <v-tab-item>
        <s-problem-statistic/>
      </v-tab-item>
      <v-tab-item>
        <s-record-list :records="records"/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import {mapState} from "vuex";
import {Problem, Record} from "@/ts/entries";
import SRecordList from "@/components/Record/SRecordList.vue";
import SMarkdown from "@/components/General/SMarkdown.vue";
import {ProblemInfoContainer} from "@/ts/interfaces";
import SProblemStatistic from "@/components/Problem/SProblemStatistic.vue";
import STooltipIcon from "@/components/General/STooltipIcon.vue";
import SCodeEditor from "@/components/Problem/SCodeEditor.vue";

@Component({
  components: {SCodeEditor, STooltipIcon, SProblemStatistic, SMarkdown, SRecordList},
  computed: {...mapState(['width_height', 'problemInfo'])}
})
export default class SProblemDetailCard extends Vue {
  readonly width_height!: { width: number }
  readonly problemInfo!: ProblemInfoContainer
  readonly tabs: Array<string> = ['nav-bar.description', 'submit', 'nav-bar.statistic', 'nav-bar.rec']
  records: Array<Record> = []
  disableEditor: boolean = false
  private cnt = 1

  created() {
    this.$store.commit('setProblemInfo', {selectedID: this.pid})
    this.loadProblem()
    this.records = this.$store.state.recordInfo.list//TODO
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
  }

  get loading(): boolean {
    return this.$store.state.loading
  }

  set loading(v) {
    this.$store.commit('setLoading', v)
  }

  /**
   * language chose to **submit**, such as pgsql
   * @return language chose
   */
  get lang(): string {
    return this.problemInfo.lang
  }

  /**
   * set language chose to **submit**, such as pgsql
   * It will change the problemInfo in vuex
   * @param v new language
   */
  set lang(v: string) {
    this.$store.commit('setProblemInfo', {lang: v})
  }

  get code(): string {
    return this.problemInfo.code
  }

  set code(v: string) {
    this.$store.commit('setProblemInfo', {code: v})
  }

  get pid(): number {
    return parseInt(this.$route.params.pid)
  }

  get problem(): Problem | undefined {
    let _ = this.cnt
    return this.problemInfo.get(this.pid)
  }

  async loadProblem(force = false) {
    this.loading = !this.problem
    if (this.loading || force) {
      let detailProblem = await this.$api.queryProblem(this.pid)
      this.$store.commit('setProblemInfo', {detailProblem})
      this.loading = false
      // trigger the problem from mapTable
      this.cnt++
    }
  }

  submit() {
    this.disableEditor = true
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
