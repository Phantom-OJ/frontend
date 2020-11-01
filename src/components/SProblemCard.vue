<template>
  <v-card id="problem-card" class="all-card">
    <s-searchable-card-title :title="'problem'" @search="search"/>
    <v-list class="list">
      <div
        v-for="(problem, index) in problems"
        :key="index"
        class="list-item-container"
      >
        <v-list-item
          class="list-item cursor-hand-hover"
          @click="click(problem.ID)"
        >
          <v-row justify="space-between" style="width: 100%">
            <v-col cols="2" class="ellipsis-col">
              {{problem.ID}}
            </v-col>
            <v-col cols="6" class="ellipsis-col">
              {{problem.title}}
            </v-col>
            <v-col cols="3" class="">
              {{problem}}
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider/>
      </div>
    </v-list>
    <s-pagination :item-num="itemNum" :info="this.problemInfo" :info-name="'Problem'"/>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import SSearchableCardTitle from "@/components/SSearchableCardTitle.vue";
import SPagination from "@/components/SPagination.vue";
import {mapState} from "vuex";
import {InfoContainer} from "@/ts/DataDef";
import { Problem } from '@/ts/entries';

@Component({
  components: {SPagination, SSearchableCardTitle},
  computed: {
    ...mapState(['width_height', 'problemInfo'])
  }
})
export default class SProblemCard extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum !: number
  readonly width_height !: { width: number, height: number }
  readonly problemInfo !: InfoContainer<Problem>

  click(ID: number) {
    this.$router.push(`/problem/${ID}`)
  }

  get problems(): Array<Problem> {
    let {full, list} = this.problemInfo.pageOf(this.problemInfo.pageIndex, this.itemNum)
    if(!full){
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

</style>
