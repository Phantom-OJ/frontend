<template>
  <v-tooltip
    :bottom="is('bottom')"
    :top="is('top')"
    :right="is('right')"
    :left="is('left')"
    :transition="transition"
  >
    <template v-slot:activator="{on,attrs}">
      <v-icon v-on="on" v-bind="attrs" :class="iconClass" :size="size" @click="click">
        <slot/>
      </v-icon>
    </template>
    {{text}}
  </v-tooltip>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Emit, Prop} from 'vue-property-decorator'

@Component({})
export default class STooltipIcon extends Vue {
  @Prop({
    type: String,
    default: 'bottom'
  })
  readonly direction!: string

  @Prop({
    type: String,
    default: 'fab-transition'
  })
  readonly transition!: string

  @Prop({
    type:String,
    default:'icon-color-0'
  })
  readonly iconClass!:string

  @Prop({
    type:String,
    required:true
  })
  readonly text!:string

  @Prop({
    type:Number,
    default:24
  })
  readonly size!:number

  is(direction: string) {
    return this.direction.toLowerCase() === direction
  }

  @Emit()
  click(){

  }
}
</script>

<style scoped lang="scss">

</style>
