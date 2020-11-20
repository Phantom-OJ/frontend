<template>
  <v-card id="assignment-card" class="all-card">
    <s-refreshable-card-title :title="'assignment'">
      <div class="search">
        <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`assignment.searchA`)"
                      type="text" dense v-model="searchID"/>
        <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`assignment.searchB`)"
                      type="text" dense v-model="searchName"/>
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
    <v-list class="list">
      <div
        v-for="(assignment, index) in assignments"
        :key="index"
        class="list-item-container"
      >
        <v-list-item
          class="list-item cursor-hand-hover"
          @click="click(assignment.ID)"
        >
          <v-row justify="space-between" style="width: 100%">
            <v-col id="ID" :cols="2" class="ellipsis-col">
              {{assignment.ID}}
            </v-col>
            <v-col id="title" :cols="4" class="ellipsis-col">
              <v-icon class="icon-color-1" style="margin-right: 2px">mdi-trophy-variant</v-icon>
              {{assignment.title}}
            </v-col>
            <v-col id="time" :cols="4">
              <v-icon class="icon-color-1" style="margin-right: 2px">mdi-camera-timer</v-icon>
              {{(width_height.width&lt;750)?`@${assignment.endTime.sString()}`:`${assignment.startTime.sString()} >>
              ${assignment.endTime.sString()}`}}
            </v-col>
            <v-col id="status" :cols="2">
              {{assignment.status}}
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider/>
      </div>
    </v-list>
    <s-pagination :item-num="itemNum" :max-length="assignmentInfo.maxLength"
                  :page-index.sync="pageIndex"></s-pagination>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import {mapState} from "vuex";
import {Alert, InfoContainer} from "@/ts/interfaces";
import SPagination from "@/components/General/SPagination.vue";
import {Assignment} from '@/ts/entries';
import SRefreshableCardTitle from "@/components/General/SRefreshableCardTitle.vue";

@Component({
  components: {SRefreshableCardTitle, SPagination},
  computed: {
    ...mapState(['width_height', 'assignmentInfo'])
  }
})
export default class SAssignmentCard extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum !: number
  readonly width_height !: { width: number, height: number }
  readonly assignmentInfo !: InfoContainer<Assignment>

  private s_searchID: string = ''
  private s_searchName: string = ''

  get searchID(): string {
    return this.s_searchID
  }

  set searchID(v: string) {
    this.s_searchID = v
    this.commitFilter()
  }

  get searchName(): string {
    return this.s_searchName
  }

  set searchName(v: string) {
    this.s_searchName = v
    this.commitFilter()
  }

  click(ID: number) {
    this.$router.push(`/assignment/${ID}`)
  }

  get assignments(): Array<Assignment> {
    let cInfo = this.assignmentInfo
    let {full, list} = cInfo.pageOf(cInfo.pageIndex, this.itemNum)
    if (!full) {
      //TODO
    }
    return list
  }

  search() {
    console.log(this.$alert)
    this.$alert(new Alert({type:'success', info:`search ${this.searchID}, ${this.searchName}`}))
  }

  get pageIndex() {
    return this.assignmentInfo.pageIndex
  }

  set pageIndex(v) {
    this.$store.commit('setAssignmentInfo', {pageIndex: v})
  }

  clear(){
    this.s_searchName = ''
    this.s_searchID = ''
    this.commitFilter()
  }

  commitFilter() {
    let filter = new Map([['ID', this.searchID], ['name', this.searchName]])
    this.$store.commit('setAssignmentInfo', {filter})
  }
}
</script>

<style scoped lang="scss">
  @import "../../css/variable";
</style>
