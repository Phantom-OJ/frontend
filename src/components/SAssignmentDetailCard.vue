<template>
  <v-progress-circular v-if="loading" indeterminate color="secondary" class="detail-card-loading" :size="400"/>
  <v-card v-else class="detail-card">
    <div class="detail-card-title-box">
      <v-card-title class="detail-card-title ellipsis-col">{{assignment.title}}</v-card-title>
      <v-tabs v-model="tab" background-color="white" right class="detail-card-tabs">
        <v-tabs-slider color="accent"/>
        <v-tab
          v-for="bar in tabs"
          :key="bar"
        >
          {{$t(bar)}}
        </v-tab>
      </v-tabs>
    </div>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <div v-html="description" class="descrition">
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Assignment} from "@/ts/Entries";

@Component({})
export default class SContestDetailCard extends Vue {
  tab: any = null
  readonly tabs: Array<string> = ['nav-bar.introduction', 'nav-bar.problem', 'nav-bar.statistic']
  loading = true

  mounted() {
    this.$store.commit('setAnnouncementInfo', {selectedID: this.aid})
    this.loading = !this.assignment
  }

  get aid(): number {
    return parseInt(this.$route.params.aid)
  }

  get assignment(): Assignment | null {
    let a = this.$store.state.assignmentInfo.map.get(this.aid)
    console.log(a, '')
    if (!!a) {
      this.loading = false
      return a
    } else {
      this.loading = true
      return null
    }
  }

  get description(){
    return this.assignment?.description
  }

}
</script>

<style scoped lang="scss">
  .detail-card-tabs {
    display: inline-block;
    /*float: right;*/
  }
</style>
