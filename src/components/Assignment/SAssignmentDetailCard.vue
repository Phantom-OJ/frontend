<template>
  <v-progress-circular v-if="loading" indeterminate color="secondary" class="detail-card-loading" :size="400"/>
  <v-card v-else class="detail-card">
    <div v-if="width_height.width>1200" class="detail-card-title-box--vertical">
      <v-tabs v-model="tab" background-color="white" color="secondary" vertical
              class="detail-card-tabs--vertical" height="160">
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
          {{`${assignment.startTime.sString()} >>> ${assignment.stopTime.sString()}`}}<br>
          <v-icon class="icon-left-5 icon-color-0">
            mdi-clock
          </v-icon>
          {{now.sString()}} {{`| ${assignment.status}`}}
        </v-card-subtitle>
      </div>
    </div>
    <div v-else class="detail-card-title-box">
      <div class="detail-card-title ellipsis-col">
        <v-card-title>
          {{assignment.title}}
        </v-card-title>
        <v-card-subtitle>
          {{`${assignment.startTime.sString()} >>> ${assignment.stopTime.sString()}`}}<br>
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
    </div>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <s-markdown :markdown="description" class="description"/>
      </v-tab-item>
      <v-tab-item>
        <s-entry-list :entries="problems" :path="'problem'">
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
import {Component, Watch} from 'vue-property-decorator'
import {Assignment, Problem, Record} from "@/ts/entries";
import STag from "@/components/General/STag.vue";
import {mapState} from "vuex";
import SRecordList from "@/components/Record/SRecordList.vue";
import SEntryList from "@/components/General/SEntryList.vue";
import SMarkdown from "@/components/General/SMarkdown.vue";

@Component({
  components: {SMarkdown, SEntryList, SRecordList, STag},
  computed: {...mapState(['width_height'])}
})
export default class SAssignmentDetailCard extends Vue {
  readonly width_height!: { width: number }
  readonly tabs: Array<string> = ['nav-bar.description', 'nav-bar.prob', 'nav-bar.statistic', 'nav-bar.rec']
  tab: number = 0
  problems: Array<Problem> = []
  records: Array<Record> = []
  now: Date = new Date()
  private intervals: Array<number> = []

  get loading(): boolean {
    return this.$store.state.loading;
  }

  set loading(value: boolean) {
    this.$store.commit('setLoading', value)
  }

  created() {
    this.$store.commit('setAnnouncementInfo', {selectedID: this.aid})
    this.loading  = !this.assignment
    this.problems = this.$store.state.problemInfo.list//TODO
    this.records = this.$store.state.recordInfo.list//TODO
    this.intervals.push(window.setInterval(() => this.now = new Date(), 60000))
  }

  destroyed() {
    this.intervals.forEach(window.clearInterval)
  }

  get aid(): number {
    return parseInt(this.$route.params.aid)
  }

  get assignment(): Assignment | null {
    let a = this.$store.state.assignmentInfo.map.get(this.aid)
    if (!!a) {
      this.loading = false
      return a
    } else {
      this.loading = true
      return null
    }
  }

  get description() {
    console.log(this.assignment?.description)
    return this.assignment?.description
  }

  clickTag(tag: string) {
    this.$store.commit('setProblemInfo', {
      filter: tag
    })
    this.$router.push('/problem/all')
  }

}
</script>

<style scoped lang="scss">
  .detail-card-tabs {
    display: inline-block;
    /*float: right;*/
  }

  .v-list.list {
    padding-top: 0;
  }
</style>
