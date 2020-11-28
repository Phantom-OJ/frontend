<template>
  <div :style="`${recordColor(result)};`" :class="`record-box ellipsis-col ${extraClasses}`">
    <v-icon class="icon-color-F">
      {{recordIcon(result)}}
    </v-icon>
    {{result + (!!score||score===0?` (${score})`:'')}}
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
  readonly result!: string

  @Prop()
  readonly score!:number

  @Prop({
    type: String,
    default: ''
  })
  readonly extraClasses!: string


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
    max-width: 220px;
    min-width: 140px;
    height: 50px;
    line-height: 50px;
    color: #f8f8ff;
    flex-grow: 1;
  }
</style>
