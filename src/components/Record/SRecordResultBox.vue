<template>
  <div :style="`${recordColor(result)};`" :class="`record-box ellipsis-col ${extraClasses}`">
    <v-icon class="icon-color-F">
      {{recordIcon(result)}}
    </v-icon>
    {{result}}
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import {SUtil} from "@/ts/utils";

@Component({})
export default class SRecordResultBox extends Vue {
  @Prop({
    type: String,
    required: true
  })
  result!: string

  @Prop({
    type: String,
    default: ''
  })
  extraClasses!: string


  recordIcon=SUtil.recordIcon
  recordColor=SUtil.recordBoxStyle
}
</script>

<style lang="scss">
  .record-box {
    text-align: center;
    border-radius: 5px;
    box-shadow: 2px -2px 10px -1px rgba(0, 0, 0, 0.1);
    //margin: 5px 20px 5px 10px;
    max-width: 200px;
    min-width: 120px;
    height: 50px;
    line-height: 38px;
    color: #f8f8ff;
  }
</style>
