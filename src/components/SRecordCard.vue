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
    <v-list class="list">
      <div
        v-for="(record, index) in records"
        :key="index"
        class="list-item-container"
      >
        <v-list-item
          class="list-item cursor-hand-hover"
          @click="click(record.ID)"
        >
          <v-row justify="space-between" style="width: 100%">
            <v-col :cols="5" md="4">
              <span class="inlist-user">
                <v-avatar
                  :size="48"
                  class="inlist-user-avatar"
                >
                  <img :src="record.user.avatar">
                </v-avatar>
                <div class="inlist-user-label">
                  <span class="padding-l-12 ellipsis-col">
                    {{record.user.name}}
                  </span>
                  <span class="padding-l-12 ellipsis-col">
                    {{record.submitTime.sString()}}
                  </span>
                </div>
              </span>
            </v-col>
            <v-col :cols="3" :style="`${recordColor(record.result)};`" class="record ellipsis-col">
              <v-icon class="icon-color-F">
                {{recordIcon(record.result)}}
              </v-icon>
              {{record.result}}
            </v-col>
            <v-col :cols="3" class="ellipsis-col" style="min-width: 300px;margin-right: 10px">
              <v-row>
                <v-col cols="4">
                  <v-icon class="icon-color-0">
                    mdi-database
                  </v-icon>
                  {{`${record.space}MB`}}
                </v-col>
                <v-col cols="4">
                  <v-icon class="icon-color-0">
                    mdi-timer-sand
                  </v-icon>
                  {{`${record.time}ms`}}
                </v-col>
                <v-col cols="4">
                  <v-icon class="icon-color-0">
                    mdi-alpha-l-box
                  </v-icon>
                  {{`${record.dialect.toUpperCase()}`}}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-list-item>
      </div>
    </v-list>
    <s-pagination :item-num="itemNum" :max-length="recordInfo.maxLength" :page-index.sync="pageIndex"/>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import SSearchableCardTitle from "@/components/SSearchableCardTitle.vue";
import {mapState} from "vuex";
import {InfoContainer} from "@/ts/DataDef";
import {Contest, Record} from "@/ts/Entries";
import SPagination from "@/components/SPagination.vue";

@Component({
  components: {SPagination, SSearchableCardTitle},
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

  click(ID: number) {
    this.$router.push(`/record/${ID}`)
  }

  get pageIndex() {
    return this.recordInfo.pageIndex
  }

  set pageIndex(v) {
    this.$store.commit('setRecordInfo', {pageIndex: v})
  }

  recordIcon(result: string) {
    switch (result) {
      case 'AC':
        return 'mdi-check'
      case 'WA':
        return 'mdi-bomb'
      case 'TLE':
        return 'mdi-clock-out'
      case 'MLE':
        return 'mdi-memory'
      case 'RE':
        return 'mdi-bug'
      default:
        return 'mdi-help'
    }
  }

  recordColor(result: string) {
    switch (result) {
      case 'AC':
        // return `background-color: var(--v-success-lighten1);`
        return `background: radial-gradient(var(--v-success-base),var(--v-success-lighten1));`
      case 'WA':
        return `background: radial-gradient(var(--v-error-base),var(--v-error-lighten1));`
      case 'TLE':
      case 'MLE':
      case 'RE':
        return `background: radial-gradient(var(--v-warning-base),var(--v-warning-lighten1));`
      default:
        return `background: radial-gradient(var(--v-accent-base),var(--v-accent-lighten1));`
    }
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

  .inlist-user {
    display: flex;
    align-items: center;

    .inlist-user-avatar {
      flex-shrink: 2;
    }

    .inlist-user-label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 1.5;
    }
  }

  .col, .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12 {
    line-height: 36px;

    .v-icon.v-icon {
      position: relative;
      bottom: 3px;
    }
  }

  .record {
    text-align: center;
    border-radius: 5px;
    box-shadow: 2px -2px 10px -1px rgba(0, 0, 0, 0.1);
    margin: 5px 10px;
    max-width: 200px;
    height: 50px;
    line-height: 38px;
    color: #f8f8ff;
  }
</style>
