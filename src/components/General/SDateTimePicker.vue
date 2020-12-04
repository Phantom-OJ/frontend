<template>
  <v-menu :close-on-content-click="false" min-width="0" right>
    <template v-slot:activator="{on, attrs}">
      <v-text-field :label="label" :color="textColor" hide-details
                    :value="`${s_date} ${s_time}`" type="datetime" :class="['s-date-time-picker--text', sClass]">
        <template v-slot:append>
          <v-icon v-on="on" v-bind="attrs">
            mdi-calendar-clock
          </v-icon>
        </template>
      </v-text-field>
    </template>
    <div class="s-flex inline-block s-date-time-picker">
      <v-date-picker v-model="s_date" flat show-current :color="color"/>
      <v-time-picker v-model="s_time" flat :color="color"/>
    </div>
  </v-menu>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop, PropSync} from 'vue-property-decorator'

@Component({})
export default class SDateTimePicker extends Vue {
  @PropSync('date')
  s_date!: string
  @PropSync('time')
  s_time!: string
  @Prop({
    type:String,
    default:''
  })
  readonly sClass!:string
  @Prop({
    type:String,
    default:'secondary'
  })
  readonly color!:string
  @Prop({
    type:String,
    default:'primary'
  })
  readonly textColor!:string
  @Prop({
    type:String,
    required:true
  })
  readonly label!:string
}
</script>

<style lang="scss">
.s-date-time-picker--text{
  display: inline-block;
}
.s-date-time-picker {
  .v-picker--time{
    border-top-left-radius: 0 !important;
  }
  .v-picker--date{
    border-top-right-radius: 0 !important;
  }
  .v-time-picker-title__time .v-picker__title__btn, .v-time-picker-title__time span {
    height: 56px;
    font-size: 56px;
  }
}
</style>
