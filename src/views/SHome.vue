<template>
  <div id="home">
    <div id="home-main">
      <s-home-announcement id="home-announcement" :item-num="5"/>
      <s-home-contest-card id="home-contest-assignment" :item-num="5"/>
    </div>
    <v-card id="chart-card" style="margin: 10px auto 30px auto;padding: 5px 5%">
      <canvas id="home-chart" style="margin: 0 auto;" ref="homeChart"/>
    </v-card>
  </div>
</template>

<script>
import Chart from 'chart.js'
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'
import SHomeAnnouncement from "@/components/Home/SHomeAnnouncement.vue";
import SHomeContestCard from "@/components/Home/SHomeContestCard";
import {SUtil} from "@/ts/utils"; // @ is an alias to /src

@Component({
  components: {
    SHomeContestCard,
    SHomeAnnouncement,
    HelloWorld
  }
})
export default class Home extends Vue {

  myChart = ' '
  value = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]

  created() {
  }

  async mounted() {
    const homeChart = this.$refs.homeChart
    const ctx = homeChart.getContext('2d')
    const data = await this.$api.homeStat()
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(e => e.date.substring(5)),
        datasets: [{
          label: this.$t(`home['#AC']`),
          data: data.map(e => e.ac),
          backgroundColor: '#069d61',
          borderWidth: 0
        }, {
          label: this.$t(`home['#submission']`),
          data: data.map(e => e.total),
          borderColor: '#0765ca',
          // pointBorderWidth: 0,
          pointRadius: 1,
          fill: false,
          type: 'line'
        }]
      },
      options: SUtil.barChartOption
    })
  }

}
</script>

<style lang="scss">
@import "../css/variable.scss";

#home {
  width: $app-width;
  margin: 0 auto;

  #home-main {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 20px auto;

    hr {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    > div {
      height: auto;
      display: flex;
      flex-direction: column;
    }

  }
}
</style>

<style lang="scss" scoped>
#home-announcement {
  width: 38%;
}

#home-contest-assignment {
  width: 58%;
}
</style>
