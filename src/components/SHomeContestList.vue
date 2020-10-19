<template>
  <v-card>
    <v-card-title>
      <span @click="$router.push('/contest/all')" class="cursor-hand-hover">
        {{$t('home.c/a')}}
      </span>
    </v-card-title>
    <hr/>
    <v-card-text class="lang-en s-card-container">
      <ul class="s-card-list">
        <li
          v-for="(contest,index) in contests"
          :key="index"
          class="s-card-item"
          @click="click(contest.ID)"
        >
          <v-row class="s-card-item-line" justify="space-between">
            <v-col :cols="width_height.width>1350?6:9" id="title" class="s-card-item-text cursor-hand-hover">
              {{contest.title}}
            </v-col>
            <v-col v-if="width_height.width>1350" cols="5" id="time" class="s-card-item-text">
              {{`${contest.startTime.sString()} -> ${contest.stopTime.sString()}`}}
            </v-col>
            <v-col lg="1" md="2" cols="3" id="status" class="s-card-item-text">
              {{contest.status}}
            </v-col>
          </v-row>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Contest} from "@/ts/DataDef";
import {mapState} from "vuex";

@Component({
  computed:{
    ...mapState(['width_height'])
  }
})
export default class SHomeContestList extends Vue {
  @Prop({type:Number, required:true})
  readonly itemNum !: number

  click(ID: number) {
    this.$router.push(`/contest/${ID}`)
  }

  mounted() {
  }

  get contests(): Array<Contest> {
    let cInfo = this.$store.state.contestInfo
    return cInfo.pageOf(cInfo.pageIndex, this.$props.itemNum)
  }

  get pageIndex() {
    return this.$store.state.contestInfo.pageIndex
  }

  set pageIndex(i) {
    this.$store.commit('setPageIndex', {type: 'contest', index: i})
  }
}
</script>

<style scoped lang="scss">

  #title{
    flex-shrink: 0;
  }

  #time{
    flex-shrink: 1;
  }

  #status{
    flex-shrink: 2;
  }
</style>
