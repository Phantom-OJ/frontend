<template>
  <div id="home">
    <div id="home-main">
      <s-home-announcement id="home-announcement" :item-num="10"/>
      <s-home-contest-card id="home-contest-assignment" :item-num="10"/>
    </div>
    <v-card id="chart-card" style="margin: 10px auto 30px auto;padding: 5px 5%">
      <canvas id="home-chart" style="margin: 0 auto;" ref="homeChart"/>
    </v-card>
  </div>
</template>

<script>
import Chart from 'chart.js'
import {Component, Vue} from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'
import SAvatar from "@/components/Root/SAvatar.vue";
import SHomeAnnouncement from "@/components/Home/SHomeAnnouncement.vue";
import SHomeContestCard from "@/components/Home/SHomeContestCard"; // @ is an alias to /src

@Component({
  components: {
    SHomeContestCard,
    SHomeAnnouncement,
    SAvatar,
    HelloWorld
  }
})
export default class Home extends Vue {

  myChart = ' '

  value = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]

  label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  created() {
  }

  mounted() {
    const homeChart = this.$refs.homeChart
    const ctx = homeChart.getContext('2d')
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07', '10/08', '10/09', '10/10', '10/11', '10/12', '10/13', '10/14', '10/15', '10/16', '10/17', '10/18', '10/19', '10/20'],
        datasets: [{
          label: this.$t(`home['#AC']`),
          data: [400, 102, 50, 310, 91, 18, 182, 178, 127, 382, 287, 198, 22, 10, 212, 198, 341, 79, 310, 64],
          backgroundColor: '#069d61',
          borderWidth: 0
        }, {
          label: this.$t(`home['#submission']`),
          data: [1020, 310, 110, 700, 340, 140, 390, 360, 361, 530, 610, 350, 200, 154, 474, 445, 599, 134, 590, 190],
          borderColor: '#0765ca',
          // pointBorderWidth: 0,
          pointRadius: 1,
          fill: false,
          type: 'line'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines:{
              display:false
            }
          }],
          xAxes: [{
            ticks: {
              maxRotation: 0,
              autoSkipPadding: 15
            }
          }]
        },
      }
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
