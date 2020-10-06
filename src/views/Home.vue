<template>
  <div class="home">
    <div id="home-main">
      <div id="home-announcement" class="card-shadow">
        <v-card-title>
          {{$t('home.announcement')}}
        </v-card-title>
        <hr/>
        <v-card-text style="padding-top: 12px">
          <ul style="padding-left: 12px">
            <li
              v-for="(a,index) in announcement"
              :key="index"
              class="home-announcement-item lang-en"
            >
              {{a.title}}
            </li>
          </ul>
        </v-card-text>
      </div>
      <div id="home-contest-assignment" class="card-shadow">
        <v-card-title>
          {{$t('home.c/a')}}
        </v-card-title>
        <hr/>
      </div>
    </div>
    <v-img>lslnb</v-img>
  </div>
</template>

<script lang="ts">
import API from '@/ts/api'
import {Component, Vue} from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'
import SAvatar from "@/components/SAvatar.vue"; // @ is an alias to /src

@Component({
  components: {
    SAvatar,
    HelloWorld
  }
})
export default class Home extends Vue {
  announcement = [{
    title: 'lslnb'
  },{
    title: 'nqsnb'
  },{
    title: 'mzynb'
  }]

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

    .home-announcement-item{
      padding: 2px 0;
      margin: 5px auto;
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
