<template>
  <v-card id="record-card" class="all-card">
    <s-searchable-card-title :title="'record'">
      <div class="search">
        <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`record.searchA`)"
                      type="text" dense v-model="searchAssignment"/>
        <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`record.searchP`)"
                      type="text" dense v-model="searchProblem"/>
        <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`record.searchU`)"
                      type="text" dense v-model="searchUser"/>
        <div>
          <v-btn class="search-btn" @click="search">filter</v-btn>
          <v-btn text style="padding: 8px;margin-left: 5px;min-width: 32px;">
            <v-icon class="icon-color-2">
              mdi-close
            </v-icon>
          </v-btn>
        </div>
      </div>
    </s-searchable-card-title>
    <s-record-list :records="records"/>
    <s-pagination :item-num="itemNum" :max-length="recordInfo.maxLength" :page-index.sync="pageIndex"/>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import SSearchableCardTitle from "@/components/General/SSearchableCardTitle.vue";
import {mapState} from "vuex";
import {InfoContainer} from "@/ts/DataDef";
import {Assignment, Record} from "@/ts/Entries";
import SPagination from "@/components/General/SPagination.vue";
import SRecordList from "@/components/Record/SRecordList.vue";

@Component({
  components: {SRecordList, SPagination, SSearchableCardTitle},
  computed: {...mapState(['width_height', 'recordInfo'])}
})
export default class SRecordCard extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum !: number
  readonly width_height !: { width: number, height: number }
  readonly recordInfo !: InfoContainer<Record>

  searchAssignment: string = ''
  searchProblem: string = ''
  searchUser: string = ''

  created() {
    let filter = this.recordInfo.filter as Map<string, string>
    this.searchAssignment = filter.get('assignment')!
    this.searchProblem = filter.get('problem')!
    this.searchUser = filter.get('user')!
  }

  get records(): Array<Record> {
    let {full, list} = this.recordInfo.pageOf(this.recordInfo.pageIndex, this.itemNum)
    if (!full) {
      //TODO
    }
    return list
  }

  search() {
    let filter = new Map<string, string>([
      ['assignment', this.searchAssignment],
      ['problem', this.searchProblem],
      ['user', this.searchUser]
    ])
    this.$store.commit('setRecordInfo', {filter})
    //TODO
  }

  get pageIndex() {
    return this.recordInfo.pageIndex
  }

  set pageIndex(v) {
    this.$store.commit('setRecordInfo', {pageIndex: v})
  }
}
</script>

<style scoped lang="scss">
  .search {
    .v-input.search-input {
      width: 20% !important;
      min-width: 70px !important;
    }
  }
</style>
