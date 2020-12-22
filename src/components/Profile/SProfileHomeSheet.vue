<template>
  <s-loading v-if="loading" style="width: 100%;min-height: 700px"/>
  <div v-else class="s-profile-home" style="width: 100%;padding:12px 24px;">
    <div class="s-flex s-statistics-root space-around">
      <v-responsive aspect-ratio="1" class="s-statistics-chart">
        <canvas ref="chart1"/>
      </v-responsive>
      <v-responsive aspect-ratio="1" class="s-statistics-chart">
        <canvas ref="chart2"/>
      </v-responsive>
    </div>
    <div>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          autocomplete
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="grades"
        :search="search"
      ></v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import {SUtil} from "@/ts/utils";
import {Grade, ProblemStatSet} from "@/ts/entities";
import {LabelDataList} from "@/ts/interfaces";
import SLoading from "@/components/General/SLoading.vue";

const Chart = require('chart.js')

@Component({
  components: {SLoading}
})
export default class SProfileHomeSheet extends Vue {
  private readonly s_cType: Array<string> = ['problem.result', 'problem.dialect']
  readonly keyInState = 'profile-home'
  search: string = ''
  loading: boolean = false
  grades: Grade[] = []
  statistic!: ProblemStatSet
  labelData: LabelDataList = {
    labels: [],
    data: []
  }
  charts: any[] = []
  chartContexts: CanvasRenderingContext2D[] = []

  get cType(): Array<string> {
    return this.s_cType.map(s => this.$t(s).toString())
  }

  get headers(): { text: string, value: string }[] {
    return [{
      text: this.$t('create.title').toString(), value: 'title'
    }, {
      text: this.$t('profile.score').toString(), value: 'score'
    }, {
      text: this.$t('problem.score').toString(), value: 'fullScore'
    }]
  }

  created() {
    this.loadGrade()
  }

  mounted() {
    if (this.$route.query.recover) {
      if (!window.state?.[this.keyInState]) return
      for (let stateKey in window.state[this.keyInState]) {
        if (window.state[this.keyInState].hasOwnProperty(stateKey)) {
          //@ts-ignore
          this[stateKey] = window.state[this.keyInState][stateKey]
        }
      }
    }
    const c1: any = this.$refs.chart1
    const c2: any = this.$refs.chart2
    this.chartContexts[0] = c1.getContext('2d')
    this.chartContexts[1] = c2.getContext('2d')
    this.loadStatisticSet()
  }

  beforeDestroy() {
    window.state[this.keyInState] = {
      search: this.search
    }
  }

  get uid() {
    return parseInt(this.$route.params.uid)
  }

  async loadStatisticSet() {
    this.loading = true
    this.statistic = await this.$api.queryUserStatSet(this.uid)
    this.loading = false
    this.draw()
  }

  async loadGrade() {
    this.grades = await this.$api.queryUserGrade(this.uid)
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
        title: {
          display: true,
          text: this.cType[0]
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
        title: {
          display: true,
          text: this.cType[1]
        }
      }
    })
  }
}
</script>
