<template>
  <v-card id="assignment-card" class="all-card">
    <s-searchable-card-title :title="'assignment'">
      <div class="search">
        <v-text-field color="secondary" outlined hide-details
                      class="search-input" :label="$t(`assignment.search`)"
                      type="text" dense clearable @click:clear="searchContent=``"
                      v-model="searchContent"></v-text-field>
        <v-btn class="search-btn" @click="search">filter</v-btn>
      </div>
    </s-searchable-card-title>
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
              {{(width_height.width&lt;750)?`@${assignment.stopTime.sString()}`:`${assignment.startTime.sString()} >>
              ${assignment.stopTime.sString()}`}}
            </v-col>
            <v-col id="status" :cols="2">
              {{assignment.status}}
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider/>
      </div>
    </v-list>
    <s-pagination :item-num="itemNum" :max-length="assignmentInfo.maxLength" :page-index.sync="pageIndex"></s-pagination>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {mapState} from "vuex";
import {InfoContainer} from "@/ts/DataDef";
import SPagination from "@/components/SPagination.vue";
import SSearchableCardTitle from "@/components/SSearchableCardTitle.vue";
import { Assignment } from '@/ts/Entries';

@Component({
  components: {SSearchableCardTitle, SPagination},
  computed: {
    ...mapState(['width_height', 'assignmentInfo'])
  }
})
export default class SAssignmentCard extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum !: number
  readonly width_height !: { width: number, height: number }
  readonly assignmentInfo !: InfoContainer<Assignment>

  get searchContent(){
    return this.assignmentInfo.filter
  }

  set searchContent(v){
    this.$store.commit('setAssignmentInfo',{
      filter:v
    })
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

  search(){
    console.log(this.searchContent)
  }

  get pageIndex(){
    return this.assignmentInfo.pageIndex
  }

  set pageIndex(v){
    this.$store.commit('setAssignmentInfo',{pageIndex:v})
  }

}
</script>

<style scoped lang="scss">
  @import "../css/variable";
</style>
