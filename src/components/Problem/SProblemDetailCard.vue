<template>
  <v-card class="detail-card">
    <div v-if="width_height.width>1200" class="detail-card-title-box--vertical">
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
        <v-card-subtitle class="s-problem-detail-card-sub">
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
          <div>
            <s-tag
              v-for="(tag, index) in problem.tags"
              :key="index"
              :tag="tag.tag"
              :color="tag.tag.hash().format(6)"
              class="cursor-hand-hover"
              @click="clickTag"
            ></s-tag>
          </div>
        </v-card-subtitle>
      </div>
    </div>
    <div v-else class="detail-card-title-box">
      <div class="detail-card-title ellipsis-col">
        <v-card-title class="s-problem-detail-card-title">
          {{problem.title}}
          <span style="font-size: 14px">
            <v-icon class="icon-color-0 icon-left-5">
              mdi-database
            </v-icon>
            {{`${problem.spaceLimit}MB`}}
            <v-icon class="icon-color-0 icon-left-5">
              mdi-timer-sand
            </v-icon>
            {{`${problem.timeLimit}ms`}}
            <v-icon class="icon-color-0 icon-left-5" style="transform: scale(1.25) translateY(-1px);">
              mdi-cash-100
            </v-icon>
            {{`${problem.fullScore}`}}
          </span>
        </v-card-title>
        <v-card-subtitle class="s-problem-detail-card-sub">
          {{`${$t('problem.submitted')}: ${problem.numberSubmit} / ${$t('problem.solved')}: ${problem.numberSolve}`}}
          <br>
          <div style="margin-top: 5px">
            <s-tag
              v-for="(tag, index) in problem.tags"
              :key="index"
              :tag="tag.tag"
              :color="tag.tag.hash().format(6)"
              class="cursor-hand-hover"
              @click="clickTag"
            ></s-tag>
          </div>
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
        TODO
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
import STag from "@/components/General/STag.vue";
import SRecordList from "@/components/Record/SRecordList.vue";
import SMarkdown from "@/components/General/SMarkdown.vue";
import SCodemirror from "@/components/General/SCodemirror.vue";
import SCodeEditor from "@/components/Problem/SCodeEditor.vue";
import {ProblemInfoContainer} from "@/ts/dataDef";

@Component({
  components: {SCodeEditor, SCodemirror, SMarkdown, SRecordList, STag},
  computed: {...mapState(['width_height', 'problemInfo'])}
})
export default class SProblemDetailCard extends Vue {
  readonly width_height!: { width: number }
  readonly problemInfo!: ProblemInfoContainer
  readonly tabs: Array<string> = ['nav-bar.description', 'submit', 'nav-bar.statistic', 'nav-bar.rec']
  records: Array<Record> = []
  disableEditor: boolean = false

  get tabHeight():number{
    let height = 160
    if(!!this.problem?.solution) height += 40
    // if(this.$store.state.user)
    return height
  }

  get tab():number{
    return parseInt(this.$route.hash.slice(1))
  }

  set tab(v:number){
    //@ts-ignore
    this.$router.replace({
      ...this.$route,
      hash:`#${v}`
    })
  }

  created() {
    this.$store.commit('setProblemInfo', {selectedID: this.pid})
    this.loading = !this.problem
    this.records = this.$store.state.recordInfo.list//TODO
  }

  get loading(): boolean {
    return this.$store.state.loading
  }

  set loading(v) {
    this.$store.commit('setLoading', v)
  }

  get lang(): string {
    return this.problemInfo.lang
  }

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

  get problem(): Problem | null {
    let a = this.problemInfo.map.get(this.pid)
    if (!!a) {
      this.loading = false
      return a
    } else {
      this.loading = true
      return null
    }
  }

  clickTag(tag: string) {
    this.$store.commit('setProblemInfo', {
      filter: tag
    })
    this.$router.push('/problem/all')
  }

  submit() {
    this.disableEditor = true
  }
}
</script>

<style lang="scss">
  .s-problem-detail-card-title {
    text-align: center;
    display: inline-block;
  }

  .s-problem-detail-card-sub {
    padding-bottom: 8px;
  }

  .s-divider {
    margin-bottom: 4px;
  }
</style>
