<template>
  <v-card class="top-tabs-card">
    <v-slide-x-transition>
      <v-tabs class="s-top-tabs" :height="40" v-model="tab">
        <v-tab>
          {{ $t('create.description') }}
        </v-tab>
        <v-tab
          v-for="(problem, index) in problems"
          :key="index"
        >
          {{ `${$t('create.problem.&')}. ${index}` }}
        </v-tab>
      </v-tabs>
    </v-slide-x-transition>
      <v-form>
        <v-text-field :label="$t('create.title')" color="primary" hide-details v-model="title"></v-text-field>
        <s-date-time-picker :date.sync="startDate" :time.sync="startTime"/>
      </v-form>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SDateTimePicker from "@/components/General/SDateTimePicker.vue";

@Component({
  components: {SDateTimePicker}
})
export default class SCreateAssignmentCard extends Vue {
  tab: number = 0
  description: string = ''
  title: string = ''
  startDate:string = new Date().toISOString().substring(0, 10)
  startTime: string = '00:00'
  endDate:string=new Date().toISOString().substring(0, 10)
  endTime: string = '00:00'
  status: string = 'public'
  problems: any[] = [{}]


}
</script>

<style lang="scss">
.s-top-tabs {
  position: absolute;
  top: -40px;
}
</style>
