<template>
  <v-card id="record-card" class="all-card">
    <s-refreshable-card-title :title="'record'" @refresh="loadRecords(true)" :subtitle="$t('record.subtitle')">
      <div class="search">
        <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`record.searchA`)"
                      type="text" dense v-model="searchAssignment"/>
        <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`record.searchP`)"
                      type="text" dense v-model="searchProblem"/>
        <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`record.searchU`)"
                      type="text" dense v-model="searchUser"/>
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
    <s-loading v-if="loading" class="s-list-loading"/>
    <s-record-list v-else :records="records"/>
    <s-pagination :item-num="itemNum" :max-length="recordInfo.maxLength" :page-index.sync="pageIndex"/>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import {mapState} from "vuex";
import {Record} from "@/ts/entities";
import SPagination from "@/components/General/SPagination.vue";
import SRecordList from "@/components/Record/SRecordList.vue";
import {EntityContainer} from "@/ts/entity-container";
import {SUtil} from "@/ts/utils";
import {Filter} from "@/ts/interfaces";
import SRefreshableCardTitle from "@/components/General/SRefreshableCardTitle.vue";
import SLoading from "@/components/General/SLoading.vue";

@Component({
  components: {SLoading, SRefreshableCardTitle, SRecordList, SPagination},
  computed: {...mapState(['width_height', 'recordInfo'])}
})
export default class SRecordCard extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum !: number
  readonly width_height !: { width: number, height: number }
  readonly recordInfo !: EntityContainer<Record>

  loading: boolean = false
  s_searchAssignment: string = ''
  s_searchProblem: string = ''
  s_searchUser: string = ''

  created() {
    this.initFilter()
    this.loadRecords()
  }

  initFilter() {
    let filter = this.recordInfo.filter
    this.s_searchAssignment = filter.assignment ?? ''
    this.s_searchProblem = filter.problem ?? ''
    this.s_searchUser = filter.user ?? ''
    this.commitFilter()
  }

  async loadRecords(force: boolean = false) {
    if (this.recordInfo.search || force) {
      let {start, end} = SUtil.rangeToLoad(this.recordInfo.pageIndex, this.itemNum)
      this.loading = true
      let entityCollection = await this.$api.searchRecordPage({
        start, end,
        filter: this.recordInfo.filter
      })
      this.$store.commit('setRecordInfo', {list: entityCollection.entities, max: entityCollection.count})

      this.loading = false
    }
  }

  get records(): Array<Record> {
    return this.recordInfo.list
  }

  search() {
    this.loadRecords(true)
  }

  get searchAssignment(): string {
    return this.s_searchAssignment;
  }

  set searchAssignment(value: string) {
    this.s_searchAssignment = value;
    this.commitFilter()
  }

  get searchProblem(): string {
    return this.s_searchProblem;
  }

  set searchProblem(value: string) {
    this.s_searchProblem = value;
    this.commitFilter()
  }

  get searchUser(): string {
    return this.s_searchUser;
  }

  set searchUser(value: string) {
    this.s_searchUser = value;
    this.commitFilter()
  }

  get pageIndex() {
    return this.recordInfo.pageIndex
  }

  set pageIndex(v) {
    this.$store.commit('setRecordInfo', {pageIndex: v})
    this.loadRecords(true)
  }

  clear(): void {
    this.s_searchUser = ''
    this.s_searchProblem = ''
    this.s_searchAssignment = ''
    this.commitFilter()
  }

  private commitFilter() {
    const f = this.recordInfo.filter
    if (this.searchAssignment !== f.assignment || this.searchProblem !== f.problem || this.searchUser !== f.user) {
      let filter: Filter = {
        assignment: this.searchAssignment,
        problem: this.searchProblem,
        user: this.searchUser
      }
      this.$store.commit('setRecordInfo', {filter})
    }
  }
}
</script>

<style scoped lang="scss">
</style>
