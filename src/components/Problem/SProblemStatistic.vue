<template>
  <div class="s-problem-statistic">
    <v-select label="chart type" :items="cType" v-model="type"/>
    <div>
      <canvas ref="pChart"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Watch} from 'vue-property-decorator'

const Chart = require('chart.js')

@Component({})
export default class SProblemStatistic extends Vue {
  private readonly s_cType: Array<string> = ['result', 'dialect', 'rank']
  type: number = -1
  pChart: any = 0
  statistic: Array<{}> = []

  get pid(): number {
    return parseInt(this.$route.params.pid)
  }

  get cType(): Array<{ text: string, value: number }> {
    return this.s_cType.map((s, i) => {
      return {
        text: this.$t(s).toString(),
        value: i
      }
    })
  }

  @Watch('type')
  typeChanged(newType: string, oldType: string) {
    console.log(newType)
    const c: any = this.$refs.pChart
    const ctx = c.getContext('2d')
    this.pChart = new Chart(ctx, {
      type: 'bar',
      data: {
        // labels: this.statistic.map()
      },
      options: {}
    })
  }

}
</script>

<style scoped lang="scss">

</style>
