<template>
  <v-card id="contest-card">
    <v-card-title id="contest-card-title">
      {{$t('nav-bar.contest').toUpperCase()}}
      <v-card-subtitle v-if="width_height.width>580">
        True mastery of any skill takes a lifetime
      </v-card-subtitle>
      <v-btn text style="position: absolute;right: 20px">
        <v-icon class="icon-color-2">mdi-sync</v-icon>
      </v-btn>
    </v-card-title>
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
    <div class="pagination-container">
      <v-pagination :length="contestInfo.maxLength/itemNum" circle v-model="pageIndex" :total-visible="5"
                    style="display: inline-block">
      </v-pagination>
      <input type="number" class="pagination-input" v-model="pageIndex">
    </div>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {mapState} from "vuex";
import {Alert, Contest, InfoContainer} from "@/ts/DataDef";

@Component({
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

  get maxPageNum(): number {
    return this.contestInfo.maxLength / this.itemNum
  }

  get contests(): Array<Contest> {
    let cInfo = this.contestInfo
    let {full, list} = cInfo.pageOf(cInfo.pageIndex, this.itemNum)
    if (!full) {
      //TODO
    }
    return list
  }

  get pageIndex() {
    return this.contestInfo.pageIndex + 1
  }

  set pageIndex(index: number) {
    if (index > this.maxPageNum || index <= 0 || index === void 0) {
      this.$alert(new Alert('error', this.$t('error.pageIndex').toString()))
      return
    }
    this.$store.commit('setContestPageIndex', index - 1)
  }
}
</script>

<style scoped lang="scss">
  @import "../css/variable";

  #contest-card {
    width: $app-width;
    margin: 30px auto;
  }


  .list-item-container:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.03);
  }


  #contest-card-title {
    padding: 24px 0 6px 28px;
  }

  .list {
    min-height: 600px;
  }
</style>
