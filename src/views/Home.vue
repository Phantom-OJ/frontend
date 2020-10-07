<template>
  <div class="home">
    <div id="home-main">
      <s-announcement  id="home-announcement" />
      <div id="home-contest-assignment" class="card-shadow">
        <v-card-title>
          {{$t('home.c/a')}}
        </v-card-title>
        <hr/>
      </div>
    </div>
    <v-sparkline
      fill
      :labels="label"
      :gradient=" ['#f72047', '#ffd200', '#1feaea']"
      :line-width="2"
      :padding="8"
      :smooth="10"
      :value="value"
      auto-draw
      height="60"
      style="width: 82%;margin: 0 auto"
    >
    </v-sparkline>
  </div>
</template>

<script lang="ts">
import API from '@/ts/api'
import {Component, Vue} from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'
import SAvatar from "@/components/SAvatar.vue";
import SAnnouncement from "@/components/SAnnouncement.vue"; // @ is an alias to /src

@Component({
  components: {
    SAnnouncement,
    SAvatar,
    HelloWorld
  }
})
export default class Home extends Vue {

  value = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]

  label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  created() {
    console.log('lslnb')
    API.getAnnouncement().then()
  }

}
</script>

<style lang="scss">

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

  #home-announcement {
    width: 38%;
  }

  #home-contest-assignment {
    width: 58%;
  }

  .mid-logo {
    display: block;
    margin: 0 auto;
  }
</style>
