<template>
  <v-menu :close-on-content-click="false" min-width="0">
    <template v-slot:activator="{on, attrs}">
      <v-text-field :label="$t('create.start-time')" color="primary" hide-details v-on="on" v-bind="attrs"
                    :value="`${s_date} ${s_time}`" readonly/>
    </template>
    <div class="s-flex inline-block">
      <v-date-picker v-model="s_date"/>
      <v-time-picker v-model="s_time"/>
    </div>
  </v-menu>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, PropSync} from 'vue-property-decorator'

@Component({})
export default class SDateTimePicker extends Vue {
  @PropSync('date')
  s_date!: string
  @PropSync('time')
  s_time!: string
}
</script>

<style scoped lang="scss">

</style>
