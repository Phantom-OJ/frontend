<template>
  <div class="home">
    <div id="home-main">
      <s-announcement id="home-announcement" :item-num="10"/>
      <v-card id="home-contest-assignment">
        <v-card-title>
          <span @click="$router.push('/contest/all')" class="cursor-hand-hover">
            {{$t('home.c/a')}}
          </span>
        </v-card-title>
        <hr/>
        <v-card-text>
          <s-contest-list id="contest-list" :item-num="10"/>
        </v-card-text>
      </v-card>
    </div>
    <v-card id="chart-card" style="width:82%;margin: 10px auto 30px auto;">
      <div id="chart-div" style="width:80%;margin: 10px auto 30px auto;">
        <canvas id="home-chart" ref="homeChart"/>
      </div>
    </v-card>
  </div>
</template>

<script>
import Chart from 'chart.js'
import API from '@/ts/api'
import {Component, Vue} from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'
import SAvatar from "@/components/SAvatar.vue";
import SAnnouncement from "@/components/SAnnouncement.vue";
import SContestList from "@/components/SContestList"; // @ is an alias to /src

@Component({
  components: {
    SContestList,
    SAnnouncement,
    SAvatar,
    HelloWorld
  }
})
export default class Home extends Vue {

  myChart = ' '

  value = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]

  label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  created() {
    console.log('lslnb')
    API.getAnnouncement().then()
  }

  mounted() {
    console.log(this.$refs)
    const homeChart = this.$refs.homeChart
    const ctx = homeChart.getContext('2d')
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07', '10/08', '10/09', '10/10', '10/11', '10/12', '10/13', '10/14', '10/15', '10/16', '10/17', '10/18', '10/19', '10/20'],
        datasets: [{
          label: '# of AC',
          data: [400, 102, 50, 310, 91, 18, 182, 178, 127, 382, 287, 198, 22, 10, 212, 198, 341, 79, 310, 64],
          backgroundColor: '#069d61',
          borderWidth: 0
        }, {
          label: '# of submission',
          data: [1020, 310, 110, 700, 340, 140, 390, 360, 361, 530, 610, 350, 200, 154, 474, 445, 599, 134, 590, 190],
          borderColor: '#0765ca',
          pointBorderWidth: 0,
          pointRadius: 0,
          fill: false,
          type: 'line'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
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

  #home-main {
    display: flex;
    justify-content: space-between;
    width: 82%;
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
</style>

<style lang="scss" scoped>
  #contest-list {

  }

  #home-announcement {
    width: 38%;
  }

  #home-contest-assignment {
    width: 58%;
  }
</style>
