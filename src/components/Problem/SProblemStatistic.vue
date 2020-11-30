<template>
    <!--    <v-btn-toggle v-model="type" group tile>-->
    <!--      <v-btn-->
    <!--        v-for="type in cType"-->
    <!--        :key="type"-->
    <!--        v-text="type"-->
    <!--      />-->
    <!--    </v-btn-toggle>-->
    <div class="s-flex s-statistics-root">
      <div class="s-flex s-statistics-box">
        <div class="s-statistics-chart">
          <canvas ref="chart1"/>
        </div>
        <div class="s-statistics-chart">
          <canvas ref="chart2"/>
        </div>
      </div>
      <div class="s-statistics-rank">

      </div>
    </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Watch} from 'vue-property-decorator'
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
  private readonly s_cType: Array<string> = ['result', 'dialect', 'rank']
  readonly width_height !: { width: number }
  loading: boolean = false
  type: number = 0
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

  @Watch('type')
  draw() {
    let data
    // switch (this.type) {
    // case 0:
    this.labelData = SUtil.genLabelDataFromStat(this.statistic.resultSet)
    data = {
      labels: this.labelData.labels,
      datasets: [{
        label: this.cType[0],
        data: this.labelData.data,
        borderWidth: 0,
        //@ts-ignore
        backgroundColor: this.labelData.labels.map(s => `#${s.hash().format(6)}`)
        // backgroundColor:'#069d61'
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
        }
      }
    })
    // break
    // case 1:
    this.labelData = SUtil.genLabelDataFromStat(this.statistic.dialectSet)
    data = {
      labels: this.labelData.labels,
      datasets: [{
        label: this.cType[1],
        data: this.labelData.data,
        borderWidth: 0,
        //@ts-ignore
        backgroundColor: this.labelData.labels.map(s => `#${s.hash().format(6)}`)
        // backgroundColor:'#177FFF'
      }]
    }
    // break

    // }
    this.charts[1] = new Chart(this.chartContexts[1], {
      type: 'pie', data,
      options: {
        ...SUtil.pieChartOption,
        aspectRatio: 1,
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    })
  }
}
</script>

<style lang="scss">
.s-statistics-chart {
  position: relative;
  max-width: 360px;
  max-height: 360px;
  margin-right: 2%;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 20px;
  }
}

.s-statistics-box {
  flex-direction: column;
  justify-content: space-around;
}
</style>
