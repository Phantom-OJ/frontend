<template>
  <div>
    <v-timeline dense style="width: 100%;max-width: 800px;margin: 10px auto;">
      <v-timeline-item
        v-for="(point,index) in points"
        :key="index"
        fill-dot
        :color="recordColor(point.result)"
      >
        <template v-slot:icon>
          <span style="color:ghostwhite;">
            {{point.judgePointIndex}}
          </span>
        </template>
        <v-row align="center" class="s-record-point" justify="space-around">
          <s-record-result-box extra-classes="" :result="point.result"/>
          <v-col style="max-width: 260px">
            <v-row>
              <v-col cols="6">
                <v-icon class="icon-color-0">
                  mdi-database
                </v-icon>
                {{`${point.space}MB`}}
              </v-col>
              <v-col cols="6">
                <v-icon class="icon-color-0">
                  mdi-timer-sand
                </v-icon>
                {{`${point.time}ms`}}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
  </div>
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
    type: Object,
    required: true
  })
  record!: Record

  recordIcon = SUtil.recordIcon
  recordColor = SUtil.recordColor

  get points() {
    return this.record.description
  }
}
</script>

<style scoped lang="scss">
  .v-timeline-item {
    padding-bottom: 52px;
  }
</style>
<style lang="scss">
  .s-record-point{
    background-color: var(--v-info-lighten5);
  }
</style>
