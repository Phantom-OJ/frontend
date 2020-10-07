<template>
  <v-app-bar app class="app-width h-center" color="white">
    <v-app-bar-nav-icon
      id="nav-icon"
      @click="$store.commit('setSideNav', {v:!$store.state.sideNav})"
    >
    </v-app-bar-nav-icon>
    <v-avatar id="logo-img">
      <v-img src="../assets/phantom.jpg"></v-img>
    </v-avatar>
    <label id="logo-text">
      Phantom OJ
    </label>
    <v-spacer></v-spacer>
    <ul class="inline-block" style="padding: 0">
      <li v-for="(btn, index) in $store.state.nav"
          :key="index"
          class="app-bar-btn-item inline-block hidden-md-and-down"
      >
        <v-btn
          text
          :key="index"
          :to="btn.to"
        >
          <v-icon class="app-bar-btn-item-btn-icon inline-block">
            {{btn.icon}}
          </v-icon>
          {{$t(btn.text)}}
        </v-btn>
      </li>
    </ul>
    <v-spacer></v-spacer>
    <s-avatar
      :size="48"
      id="app-bar-s-avatar"
    ></s-avatar>
  </v-app-bar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import SAvatar from "@/components/SAvatar.vue";

@Component({
  components: {SAvatar}
})
export default class SAppBar extends Vue {
}
</script>

<style scoped lang="scss">
  $app-bar-height: 56px;

  .app-bar-btn-item {
    margin: 0 18px;
  }

  .app-bar-btn-item-btn-icon {
    margin: 0 10px 0 0;
  }

  #app-bar-s-avatar {
    line-height: $app-bar-height;
    margin: 0 2% 0 0;
  }

  #logo-img {
    margin: 0 0 0 2%;
  }

  #logo-text {
    padding: 12px;
    font-weight: 600;
    line-height: $app-bar-height;
  }

  @media only screen and (min-width: 1300px) {
    #nav-icon {
      display: none !important
    }
  }
</style>
