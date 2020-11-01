<template>
  <v-card id="contest-card" class="all-card">
    <s-searchable-card-title :title="'contest'" @search="search"></s-searchable-card-title>
    <v-list class="list">
      <div
        v-for="(contest, index) in contests"
        :key="index"
        class="list-item-container"
      >
        <v-list-item
          class="list-item cursor-hand-hover"
          @click="click(contest.ID)"
        >
          <v-row justify="space-between" style="width: 100%">
            <v-col id="ID" :cols="2" class="ellipsis-col">
              {{contest.ID}}
            </v-col>
            <v-col id="title" :cols="4" class="ellipsis-col">
              <v-icon class="icon-color-2" style="margin-right: 2px">mdi-trophy-variant</v-icon>
              {{contest.title}}
            </v-col>
            <v-col id="time" :cols="4">
              <v-icon class="icon-color-2" style="margin-right: 2px">mdi-camera-timer</v-icon>
              {{(width_height.width&lt;750)?`@${contest.stopTime.sString()}`:`${contest.startTime.sString()} >>
              ${contest.stopTime.sString()}`}}
            </v-col>
            <v-col id="status" :cols="2">
              {{contest.status}}
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider/>
      </div>
    </v-list>
    <s-pagination :item-num="itemNum" :info="this.contestInfo" :info-name="'Contest'"></s-pagination>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {mapState} from "vuex";
import {InfoContainer} from "@/ts/DataDef";
import SPagination from "@/components/SPagination.vue";
import SSearchableCardTitle from "@/components/SSearchableCardTitle.vue";
import { Contest } from '@/ts/entries';

@Component({
  components: {SSearchableCardTitle, SPagination},
  computed: {
    ...mapState(['width_height', 'contestInfo'])
  }
})
export default class SContestCard extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum !: number
  readonly width_height !: { width: number, height: number }
  readonly contestInfo !: InfoContainer<Contest>

  click(ID: number) {
    this.$router.push(`/contest/${ID}`)
  }

  get contests(): Array<Contest> {
    let cInfo = this.contestInfo
    let {full, list} = cInfo.pageOf(cInfo.pageIndex, this.itemNum)
    if (!full) {
      //TODO
    }
    return list
  }

  search(payload:{searchContent:string}){
    let {searchContent} = payload
    console.log(searchContent)
  }

}
</script>

<style scoped lang="scss">
  @import "../css/variable";
  .list-item-container:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.03);
  }

  .list {
    min-height: 600px;
  }
</style>
