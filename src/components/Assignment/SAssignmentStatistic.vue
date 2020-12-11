<template>
  <div class="s-flex s-statistics-root space-around">
    <v-simple-table style="flex-grow: 1;padding: 12px 26px;">
      <thead>
      <tr>
        <th>{{ $t('record.searchP') }}</th>
        <th> AC</th>
        <th>
          <del>AC</del>
        </th>
        <th> {{ $t('assignment.require') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="s in statistic" :key="s.problemId">
        <th>{{ s.problemTitle }}</th>
        <th>{{ s.ac }}</th>
        <th>{{ s.wa }}</th>
        <th>{{ s.total }}</th>
      </tr>
      </tbody>
    </v-simple-table>
    <v-responsive aspect-ratio="1" class="s-statistics-chart">
      <canvas ref="chart"/>
    </v-responsive>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import {AssignmentStat} from "@/ts/entities";
import {SUtil} from "@/ts/utils";

const Chart = require('chart.js')

@Component({})
export default class SAssignmentStatistic extends Vue {
  statistic: AssignmentStat[] = []
  loading: boolean = false

  chartContext: CanvasRenderingContext2D = {} as CanvasRenderingContext2D
  chart: any = {}

  mounted() {
    this.chartContext = (this.$refs.chart as any).getContext('2d')
    this.loadStatistic()
  }

  async loadStatistic() {
    this.loading = true
    this.statistic = await this.$api.queryAssignmentStat(this.aid)
    this.statistic.sort((i, j) => i.problemId - j.problemId)
    this.loading = false
    this.draw()
  }

  draw() {
    let data = {
      labels: this.statistic.map(e => e.problemTitle),
      datasets: [{
        label: '#',
        data: this.statistic.map(e => (e.ac / e.total).toFixed(3)),
        borderWidth: 1,
        backgroundColor: this.statistic.map(e => `#${e.problemTitle.hash().format(6)}5e`),
        borderColor: this.statistic.map(e => `#${e.problemTitle.hash().format(6)}`)
      }]
    }
    this.chart = new Chart(this.chartContext, {
      type: 'bar', data,
      options: {
        ...SUtil.barChartOption,
        aspectRatio: 1,
        animation: {
          animateRotate: true,
          animateScale: true
        },
        title: {
          display: true,
          text: `AC/${this.$t('assignment.require')}`
        }
      }
    })
  }

  get aid(): number {
    return parseInt(this.$route.params.aid)
  }
}
</script>

<style scoped lang="scss">

</style>
