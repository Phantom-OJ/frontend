<template>
  <s-loading v-if="loading" class="s-card-loading"/>
  <v-card v-else class="detail-card">
    <div v-if="width_height.width>10200" class="detail-card-title-box--vertical">
      <v-tabs v-model="tab" background-color="white" color="secondary" vertical
              class="detail-card-tabs--vertical" :height="160">
        <v-tabs-slider color="accent"/>
        <v-tab
          v-for="bar in tabs"
          :key="bar"
        >
          {{ $t(bar) }}
        </v-tab>
      </v-tabs>
      <div class="ellipsis-col detail-card-title--vertical">
        <v-card-title style="text-align: center;display: inline-block">
          {{ assignment.title }}
        </v-card-title>
        <v-card-subtitle>
          {{ `${assignment.startTime.sString()} >>> ${assignment.endTime.sString()}` }}<br>
          <v-icon class="icon-left-5 icon-color-0">
            mdi-clock
          </v-icon>
          {{ now.sString() }} {{ `| ${assignment.status}` }}
        </v-card-subtitle>
      </div>
    </div>
    <!--    not use -->
    <div v-else class="detail-card-title-box">
      <div class="detail-card-title">
        <v-card-title class="detail-card-title-main">
          {{ assignment.title }}
          <v-card-subtitle>
            {{ `${$t('problem.score')}: ${assignment.fullScore}` }}
          </v-card-subtitle>
        </v-card-title>
        <v-card-subtitle>
          {{ `${assignment.startTime.sString()} >>> ${assignment.endTime.sString()}` }}<br>
          <v-icon class="icon-left-5 icon-color-0">
            mdi-clock
          </v-icon>
          {{ now.sString() }} {{ `| ${assignment.status}` }}
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
        <v-tab v-if="showStatistics">
          {{ $t('nav-bar.statistic') }}
        </v-tab>
      </v-tabs>
      <v-btn text class="refresh" @click="refresh">
        <v-icon class="icon-color-2">mdi-sync</v-icon>
      </v-btn>
    </div>
    <v-divider class="s-divider"/>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <s-markdown :markdown="description" class="description"/>
      </v-tab-item>
      <v-tab-item>
        <s-entry-list :entities="assignment.problemList" :path="'problem'">
          <template v-slot="{entity:problem}">
            <v-col cols="2" class="ellipsis-col">
              <v-icon :color="solveStateColor(problem.solved)">
                {{ solveStateIcon(problem.solved) }}
              </v-icon>
              {{ `No.${problem.indexInAssignment}` }}
            </v-col>
            <v-col cols="4" class="ellipsis-col">
              <v-icon class="icon-color-1" style="position: relative;top:1px">
                mdi-quora
              </v-icon>
              {{ `[${problem.fullScore}] ${problem.title}` }}
            </v-col>
            <v-col cols="3" class="s-flex">
              <s-tag
                v-for="(tag, index) in problem.tagList"
                :key="index"
                :tag="tag"
                @click="clickTag"
              ></s-tag>
            </v-col>
            <v-col cols="2" lg="2" class="ellipsis-col">
              <s-tooltip-icon icon-class="icon-color-1 icon-left-5" :text="$t('problem.submitted')" direction="top">
                mdi-upload
              </s-tooltip-icon>
              {{ problem.numberSubmit }}
              <s-tooltip-icon icon-class="icon-color-1 icon-left-5" :text="$t('problem.resolved')" direction="top">
                mdi-check
              </s-tooltip-icon>
              {{ problem.numberSolve }}
            </v-col>
          </template>
        </s-entry-list>
      </v-tab-item>
      <v-tab-item>
        <s-loading v-if="recordsLoading" class="s-tab-loading"/>
        <s-record-list v-else :records="records"/>
      </v-tab-item>
      <v-tab-item v-if="showStatistics">
        <s-assignment-statistic/>
      </v-tab-item>
    </v-tabs-items>
    <v-scale-transition>
      <div v-if="showEdit&&tab===0" class="s-assignment-tool">
        <v-btn fab color="info" @click="$router.push(`/modify/assignment/${aid}`)" width="72" height="72">
          <s-tooltip-icon :text="$t('create.edit')" direction="top" :size="32">
            mdi-pencil
          </s-tooltip-icon>
        </v-btn>
      </div>
    </v-scale-transition>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import {Assignment, Record} from "@/ts/entities";
import STag from "@/components/General/STag.vue";
import {mapState} from "vuex";
import SRecordList from "@/components/Record/SRecordList.vue";
import SEntryList from "@/components/General/SEntityList.vue";
import SMarkdown from "@/components/General/SMarkdown.vue";
import {EntityContainer} from "@/ts/entity-container";
import STooltipIcon from "@/components/General/STooltipIcon.vue";
import {SUtil} from "@/ts/utils";
import SAssignmentStatistic from "@/components/Assignment/SAssignmentStatistic.vue";
import {Permission} from "@/ts/user";
import SLoading from "@/components/General/SLoading.vue";

@Component({
  components: {SLoading, SAssignmentStatistic, STooltipIcon, SMarkdown, SEntryList, SRecordList, STag},
  computed: {...mapState(['width_height', 'assignmentInfo'])}
})
export default class SAssignmentDetailCard extends Vue {
  readonly width_height!: { width: number }
  readonly assignmentInfo!: EntityContainer<Assignment>
  readonly tabs: Array<string> = ['nav-bar.description', 'nav-bar.prob', 'nav-bar.rec']
  records: Array<Record> = []
  now: Date = new Date()
  loading: boolean = false
  recordsLoading: boolean = false
  private intervals: Array<number> = []
  private cnt = 1

  solveStateColor = SUtil.solveStateColor
  solveStateIcon = SUtil.solveStateIcon

  created() {
    this.loadAssignment()
    this.loadRecords()
    this.intervals.push(window.setInterval(() => this.now = new Date(), 60000))
  }

  get showEdit() {
    return this.$store.state.isAuthenticated && this.$store.state.user.hasPermission(Permission.ALLOWANCE.MODIFY_ASSIGNMENT)
  }

  get showStatistics() {
    return this.$store.state.isAuthenticated && this.$store.state.user.hasPermission(Permission.ALLOWANCE.VIEW_ALL_SUBMISSIONS)
  }

  async loadAssignment(force = false) {
    if (!this.assignment || force) {
      this.loading = true
      let detailAssignment = await this.$api.queryAssignment(this.aid)
      this.$store.commit('setAssignmentInfo', {detailAssignment})
      this.loading = false
      // trigger the assignment from mapTable
      this.cnt++
    }
  }

  async loadRecords(force = false) {
    if (this.records.length === 0 || force) {
      this.recordsLoading = true
      this.records = (await this.$api.searchRecordPage({
        start: 1,
        end: 10,
        filter: {
          problem: '',
          assignment: this.assignment?.title,
          user: ''
        }
      })).entities
      this.recordsLoading = false
    }
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
    if (v === 2) {
      this.loadRecords(true)
    }
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

  refresh() {
    this.loadAssignment(true)
    this.loadRecords(true)
  }

  clickTag(tag: string) {
    this.$store.commit('setProblemInfo', {
      filter: {
        ...this.$store.state.problemInfo.filter,
        tags:tag
      }
    })
    this.$router.push('/problem/all')
  }

  destroyed() {
    this.intervals.forEach(window.clearInterval)
  }
}
</script>
<style scoped lang="scss">
.v-list.list {
  padding-top: 0;
}

.refresh {
  top: 20px;
}

.s-assignment-tool {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10000;

  & > * {
    margin-top: 10px;
  }
}
</style>
