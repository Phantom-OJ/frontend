<template>
  <v-card id="problem-card" class="all-card">
    <s-refreshable-card-title :title="'problem'" @refresh="loadProblems(true)" :subtitle="$t('problem.subtitle')">
      <div class="search">
        <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`problem.searchA`)"
                      type="text" dense v-model="searchID"/>
        <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`problem.searchB`)"
                      type="text" dense v-model="searchName"/>
        <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`problem.tag`)"
                      type="text" dense v-model="searchTags"/>
        <div>
          <v-btn class="search-btn" @click="search">filter</v-btn>
          <v-btn text style="padding: 8px;margin-left: 5px;min-width: 32px;" @click="clear">
            <v-icon class="icon-color-2">
              mdi-close
            </v-icon>
          </v-btn>
        </div>
      </div>
    </s-refreshable-card-title>
    <s-entry-list :entries="problems" :path="'problem'">
      <template v-slot="{entry:problem}">
        <v-col cols="2" class="ellipsis-col">
          <v-icon :color="solveStateColor(problem.solved)">
            {{solveStateIcon(problem.solved)}}
          </v-icon>
          {{ problem.ID }}
        </v-col>
        <v-col cols="4" class="ellipsis-col">
          <v-icon class="icon-color-1" style="position: relative;top:1px">
            mdi-quora
          </v-icon>
          {{ problem.title }}
        </v-col>
        <v-col cols="4" class="s-flex">
          <s-tag
            v-for="(tag, index) in problem.tags"
            :key="index"
            :tag="tag"
            @click="clickTag"
          ></s-tag>
        </v-col>
        <v-col cols="2" class="">
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
    <s-pagination :item-num="itemNum" :max-length="problemInfo.maxLength" :page-index.sync="pageIndex"/>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import SPagination from "@/components/General/SPagination.vue"
import {mapState} from "vuex"
import {Filter} from "@/ts/interfaces"
import {Problem} from '@/ts/entities'
import STag from "@/components/General/STag.vue"
import SEntryList from "@/components/General/SEntryList.vue"
import SRefreshableCardTitle from "@/components/General/SRefreshableCardTitle.vue";
import STooltipIcon from "@/components/General/STooltipIcon.vue";
import {SUtil} from '@/ts/utils'
import {EntityContainer} from "@/ts/entity-container";

@Component({
  components: {STooltipIcon, SRefreshableCardTitle, SEntryList, STag, SPagination},
  computed: {
    ...mapState(['width_height', 'problemInfo'])
  }
})
export default class SProblemCard extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum !: number
  readonly width_height !: { width: number, height: number }
  readonly problemInfo !: EntityContainer<Problem>

  loading: boolean = false
  private s_searchID: string = ''
  private s_searchName: string = ''
  private s_searchTags: string = ''

  solveStateColor=SUtil.solveStateColor
  solveStateIcon=SUtil.solveStateIcon

  created() {
    this.initFilter()
    this.loadProblems()
  }

  initFilter() {
    const filter = this.problemInfo.filter
    this.s_searchID = filter.id ?? ''
    this.s_searchName = filter.name ?? ''
    this.s_searchTags = filter.tags ?? ''
    this.commitFilter()
  }

  async loadProblems(force: boolean = false) {
    if (this.problemInfo.search || force) {
      this.loading = true
      let {start, end} = SUtil.rangeToLoad(this.problemInfo.pageIndex, this.itemNum)
      let entityCollection = await this.$api.searchProblemPage({
        start, end,
        filter: this.problemInfo.filter
      })
      this.$store.commit('setProblemInfo', {
        list: entityCollection.entities,
        max: entityCollection.count,
        listIndex: start - 1
      })
      this.loading = false
    }
  }

  get problems(): Array<Problem> {
    return this.problemInfo.list
  }

  search() {
    this.loadProblems(true)
  }

  clickTag(tag: string) {
    if (!this.searchTags) {
      this.searchTags = tag
    } else if (this.searchTags.indexOf(tag) === -1) {
      this.searchTags = `${this.searchTags} ${tag}`
    }
    this.search()
  }

  get searchID(): string {
    return this.s_searchID
  }

  set searchID(v: string) {
    this.s_searchID = v
    this.commitFilter()
  }

  get searchName(): string {
    return this.s_searchName;
  }

  set searchName(value: string) {
    this.s_searchName = value;
    this.commitFilter()
  }

  get searchTags(): string {
    return this.s_searchTags;
  }

  set searchTags(value: string) {
    this.s_searchTags = value;
    this.commitFilter()
  }

  get pageIndex() {
    return this.problemInfo.pageIndex
  }

  set pageIndex(v) {
    this.$store.commit('setProblemInfo', {pageIndex: v})
    this.loadProblems(true)
  }

  clear() {
    this.s_searchID = ''
    this.s_searchName = ''
    this.s_searchTags = ''
    this.commitFilter()
    this.loadProblems(true)
  }

  private commitFilter() {
    let filter: Filter = {
      id: this.searchID,
      name: this.searchName,
      tags: this.searchTags
    }
    this.$store.commit('setProblemInfo', {filter})
  }

}
</script>

<style scoped lang="scss">
</style>
