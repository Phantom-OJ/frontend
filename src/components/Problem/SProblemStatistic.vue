<template>
  <div class="s-flex s-statistics-root space-around">
    <v-responsive aspect-ratio="1" class="s-statistics-chart">
      <canvas ref="chart1"/>
    </v-responsive>
    <v-responsive aspect-ratio="1" class="s-statistics-chart">
      <canvas ref="chart2"/>
    </v-responsive>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import {ProblemStatSet} from "@/ts/entities";
import {SUtil} from "@/ts/utils";
import {LabelDataList} from "@/ts/interfaces";
import STag from "@/components/General/STag.vue";
import {mapState} from "vuex";

const Chart = require('chart.js')

@Component({
  components: {STag},
  computed: {
    ...mapState(['width_height'])
  }
})
export default class SProblemStatistic extends Vue {
  private readonly s_cType: Array<string> = ['problem.result', 'problem.dialect']
  readonly width_height !: { width: number }
  loading: boolean = false
  statistic!: ProblemStatSet
  labelData: LabelDataList = {
    labels: [],
    data: []
  }
  charts: any[] = []
  chartContexts: CanvasRenderingContext2D[] = []

  mounted() {
    const c1: any = this.$refs.chart1
    const c2: any = this.$refs.chart2
    this.chartContexts[0] = c1.getContext('2d')
    this.chartContexts[1] = c2.getContext('2d')
    this.loadStatisticSet()
  }

  async loadStatisticSet() {
    this.loading = true
    this.statistic = await this.$api.queryProblemStatSet(this.pid)
    this.loading = false
    this.draw()
  }

  get pid(): number {
    return parseInt(this.$route.params.pid)
  }

  get cType(): Array<string> {
    return this.s_cType.map(s => this.$t(s).toString())
  }

  draw() {
    let data
    this.labelData = SUtil.genLabelDataFromStat(this.statistic.resultSet)
    data = {
      labels: this.labelData.labels,
      datasets: [{
        label: this.cType[0],
        data: this.labelData.data,
        borderWidth: 1,
        backgroundColor: this.labelData.labels.map(s => `${SUtil.recordStatisticColor(s)}1f`),
        borderColor: this.labelData.labels.map(SUtil.recordStatisticColor)
      }]
    }
    this.charts[0] = new Chart(this.chartContexts[0], {
      type: 'bar', data,
      options: {
        ...SUtil.barChartOption,
        aspectRatio: 1,
        animation: {
          animateRotate: true,
          animateScale: true
        },
        title:{
          display:true,
          text:this.cType[0]
        }
      }
    })

    this.labelData = SUtil.genLabelDataFromStat(this.statistic.dialectSet)
    data = {
      labels: this.labelData.labels,
      datasets: [{
        data: this.labelData.data,
        borderWidth: 0,
        backgroundColor: this.labelData.labels.map(s => `#${s.hash().format(6)}9f`)
        // backgroundColor:'#177FFF'
      }]
    }

    this.charts[1] = new Chart(this.chartContexts[1], {
      type: 'pie', data,
      options: {
        ...SUtil.pieChartOption,
        aspectRatio: 1,
        animation: {
          animateRotate: true,
          animateScale: true
        },
        title:{
          display:true,
          text:this.cType[1]
        }
      }
    })
  }
}
</script>

<style lang="scss">
</style>
