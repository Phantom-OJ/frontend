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
          {{`Now at ${now.sString()}`}}<br>{{assignment.status.toString()}}
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
          {{`Now at ${now.sString()}`}}<br>{{assignment.status}}
        </v-card-subtitle>
      </div>
      <v-tabs v-model="tab" background-color="white" right class="detail-card-tabs" height="80" color="secondary">
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
        <div v-html="description" class="description">
        </div>
      </v-tab-item>
      <v-tab-item>
        <s-problem-list :problems="problems">
          <template v-slot="{problem}">
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
        </s-problem-list>
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
import {Component, Vue, Watch} from 'vue-property-decorator'
import {Assignment, Problem, Record} from "@/ts/Entries";
import SProblemList from "@/components/Problem/SProblemList.vue";
import STag from "@/components/General/STag.vue";
import {mapState} from "vuex";
import SRecordList from "@/components/Record/SRecordList.vue";

@Component({
  components: {SRecordList, STag, SProblemList},
  computed: {...mapState(['width_height'])}
})
export default class SAssignmentDetailCard extends Vue {
  readonly width_height!: { width: number }
  readonly tabs: Array<string> = ['nav-bar.description', 'nav-bar.prob', 'nav-bar.statistic', 'nav-bar.rec']
  tab: number = 1
  loading = true
  problems: Array<Problem> = []
  records: Array<Record> = []
  now: Date = new Date()
  private intervals: Array<number> = []

  mounted() {
    this.$store.commit('setAnnouncementInfo', {selectedID: this.aid})
    this.loading = !this.assignment
    this.problems = this.$store.state.problemInfo.list//TODO
    this.records = this.$store.state.recordInfo.list//TODO
    this.tab = 0
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
