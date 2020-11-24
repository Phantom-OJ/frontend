<template>
  <v-timeline dense>
    <v-timeline-item>
      <div class="inlist-user">
        <v-avatar
          :size="48"
          class="inlist-user-avatar"
        >
          <img :src="record.avatar" alt="avatar">
        </v-avatar>
        <div class="inlist-user-label ellipsis-col">
            <span class="padding-l-12 ellipsis-col">
              {{`${record.username}`}}
            </span>
          <span class="padding-l-12 ellipsis-col">
              {{record.submitTime.sString()}}
            </span>
        </div>
      </div>
    </v-timeline-item>
    <v-timeline-item
      v-for="(point,index) in points"
      :key="index"
      fill-dot
      :icon="recordIcon(point.result)"
      :color="recordColor(point.result)"
    >
      <s-record-result-box extra-classes="" :result="point.result"/>
    </v-timeline-item>
  </v-timeline>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import {SUtil} from "@/ts/utils";
import SRecordResultBox from "@/components/Record/SRecordResultBox.vue";
import {Record} from "@/ts/entities";

@Component({
  components: {SRecordResultBox}
})
export default class SRecordDescription extends Vue {
  @Prop({
    type:Object,
    required:true
  })
  record!:Record

  recordIcon=SUtil.recordIcon
  recordColor=SUtil.recordColor

  get points(){
    return this.record.description
  }
}
</script>

<style scoped lang="scss">
  .v-timeline-item{
    padding-bottom: 52px;
  }
</style>
