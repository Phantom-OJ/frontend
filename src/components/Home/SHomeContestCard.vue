<template>
  <v-card>
    <v-card-title style="padding-left: 24px">
      <span @click="$router.push('/assignment/all')" class="cursor-hand-hover">
        {{$t('home.c/a')}}
      </span>
    </v-card-title>
    <hr/>
    <v-card-text class="lang-en s-card-container home-card">
      <ul class="s-card-list">
        <li
          v-for="(assignment,index) in assignments"
          :key="index"
          class="s-card-item item cursor-hand-hover"
          @click="click(assignment.ID)"
        >
          <v-row class="s-card-item-line" justify="space-between">
            <v-col :cols="width_height.width>1350?6:9" id="title" class="s-card-item-text">
              {{assignment.title}}
            </v-col>
            <v-col v-if="width_height.width>1350" cols="5" id="time" class="s-card-item-text">
                {{`${assignment.startTime.sString()} >> ${assignment.endTime.sString()}`}}
            </v-col>
            <v-col lg="1" md="2" cols="3" id="status" class="s-card-item-text">
              {{assignment.status}}
            </v-col>
          </v-row>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {InfoContainer} from "@/ts/interfaces";
import {mapState} from "vuex";
import { Assignment } from '@/ts/entries';

@Component({
  computed: {
    ...mapState(['width_height', 'assignmentInfo'])
  }
})
export default class SHomeContestList extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum !: number
  readonly assignmentInfo !: InfoContainer<Assignment>


  mounted() {
  }

  click(ID: number) {
    this.$router.push(`/assignment/${ID}`)
  }

  get assignments(): Array<Assignment> {
    let cInfo = this.assignmentInfo
    let {full, list} = cInfo.pageOf(1, this.itemNum)
    if (!full) {
      //TODO
    }
    return list
  }

  get pageIndex() {
    return this.$store.state.assignmentInfo.pageIndex
  }
}
</script>

<style scoped lang="scss">

  #title {
    flex-shrink: 0;
  }

  #time {
    flex-shrink: 1;
  }

  #status {
    flex-shrink: 2;
  }

  .item:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 5px;
    margin-left: -12px !important;
    padding-left: 12px !important;
  }

</style>
