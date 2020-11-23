<template>
  <v-progress-circular v-if="loading" indeterminate color="secondary" class="detail-card-loading" :size="400"/>
  <v-card v-else class="detail-card">
    <div v-if="width_height.width>10200" class="detail-card-title-box--vertical">
      <v-tabs v-model="tab" background-color="white" color="secondary" vertical
              class="detail-card-tabs--vertical" :height="tabHeight">
        <v-tabs-slider color="accent"/>
        <v-tab
          v-for="bar in tabs"
          :key="bar"
        >
          {{$t(bar)}}
        </v-tab>
      </v-tabs>
      <div class="ellipsis-col detail-card-title--vertical">
        <v-card-title style="text-align: center;display: inline-block">
          {{assignment.title}}
        </v-card-title>
        <v-card-subtitle>
          {{`${assignment.startTime.sString()} >>> ${assignment.endTime.sString()}`}}<br>
          <v-icon class="icon-left-5 icon-color-0">
            mdi-clock
          </v-icon>
          {{now.sString()}} {{`| ${assignment.status}`}}
        </v-card-subtitle>
      </div>
    </div>
    <!--    not use -->
    <div v-else class="detail-card-title-box">
      <div class="detail-card-title ellipsis-col">
        <v-card-title class="detail-card-title-main">
          {{assignment.title}}
        </v-card-title>
        <v-card-subtitle>
          {{`${assignment.startTime.sString()} >>> ${assignment.endTime.sString()}`}}<br>
          <v-icon class="icon-left-5 icon-color-0">
            mdi-clock
          </v-icon>
          {{now.sString()}} {{`| ${assignment.status}`}}
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
        <s-markdown :markdown="description" class="description"/>
      </v-tab-item>
      <v-tab-item>
        <s-entry-list :entries="assignment.problemList" :path="'problem'">
          <template v-slot="{entry:problem}">
            <v-col cols="2" class="ellipsis-col">
              {{`No.${problem.indexInAssignment}`}}
            </v-col>
            <v-col cols="4" class="ellipsis-col">
              {{`[${problem.fullScore}] ${problem.title}`}}
            </v-col>
            <v-col cols="3" class="s-flex">
              <s-tag
                v-for="(tag, index) in problem.tags"
                :key="index"
                :tag="tag.tag"
                :color="tag.tag.hash().format(6)"
                class=""
                @click="clickTag"
              ></s-tag>
            </v-col>
            <v-col cols="3" lg="1" class="ellipsis-col">
              {{`${problem.numberSolve}/${problem.numberSubmit}`}}
            </v-col>
          </template>
        </s-entry-list>
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
import {Assignment, Record} from "@/ts/entries";
import STag from "@/components/General/STag.vue";
import {mapState} from "vuex";
import SRecordList from "@/components/Record/SRecordList.vue";
import SEntryList from "@/components/General/SEntryList.vue";
import SMarkdown from "@/components/General/SMarkdown.vue";
import {InfoContainer} from "@/ts/interfaces";

@Component({
  components: {SMarkdown, SEntryList, SRecordList, STag},
  computed: {...mapState(['width_height', 'assignmentInfo'])}
})
export default class SAssignmentDetailCard extends Vue {
  readonly width_height!: { width: number }
  readonly assignmentInfo!: InfoContainer<Assignment>
  readonly tabs: Array<string> = ['nav-bar.description', 'nav-bar.prob', 'nav-bar.statistic', 'nav-bar.rec']
  records: Array<Record> = []
  now: Date = new Date()
  private intervals: Array<number> = []
  private cnt = 1

  created() {
    this.$store.commit('setAssignmentInfo', {selectedID: this.aid})
    this.loadAssignment()
    this.records = this.$store.state.recordInfo.list//TODO
    this.intervals.push(window.setInterval(() => this.now = new Date(), 60000))
  }

  get tabHeight(): number {
    let height = 160
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
    return this.$store.state.loading;
  }

  set loading(value: boolean) {
    this.$store.commit('setLoading', value)
  }

  get aid(): number {
    return parseInt(this.$route.params.aid)
  }

  get assignment(): Assignment | undefined {
    let _ = this.cnt
    return this.assignmentInfo.get(this.aid)
  }

  get description() {
    return this.assignment?.description
  }

  clickTag(tag: string) {
    this.$store.commit('setProblemInfo', {
      filter: tag
    })
    this.$router.push('/problem/all')
  }

  async loadAssignment(force = false) {
    this.loading = !this.assignment
    if (this.loading || force) {
      let detailAssignment = await this.$api.queryAssignment(this.aid)
      this.$store.commit('setAssignmentInfo', {detailAssignment})
      this.loading = false
      // trigger the assignment from mapTable
      this.cnt++
    }
  }

  destroyed() {
    this.intervals.forEach(window.clearInterval)
  }
}
</script>

<style scoped lang="scss">
  .detail-card-tabs {
    display: inline-block;
  }

  .v-list.list {
    padding-top: 0;
  }

  .refresh {
    top: 20px;
  }
</style>
