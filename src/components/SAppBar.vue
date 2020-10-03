<template>
  <v-app-bar app id="app-bar" color="white">
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="$emit('toggle-side-nav')"
    >
    </v-app-bar-nav-icon>
    <v-avatar>
      <v-img src="../assets/phantom.jpg"></v-img>
    </v-avatar>
    <label id="logo-text">
      Phantom OJ
    </label>
    <v-spacer></v-spacer>
    <ul id="app-bar-btn-list hidden-sm-and-down" style="padding: 0">
      <li v-for="(btn, index) in btns"
          :key="index"
          class="app-bar-btn-item hidden-sm-and-down"
      >
        <v-btn
          text
          :key="index"
          class="app-bar-btn-item-btn"
          :to="btn.to"
        >
          <v-icon class="app-bar-btn-item-btn-icon">
            {{btn.icon}}
          </v-icon>
          {{$t(btn.text)}}
        </v-btn>
      </li>
    </ul>
    <v-spacer></v-spacer>
    <s-avatar :size="40" id="app-bar-s-avatar"></s-avatar>
  </v-app-bar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import SAvatar from "@/components/SAvatar.vue";

@Component({
  components: {SAvatar}
})
export default class SAppBar extends Vue {
  btns = [{
    text: 'nav-bar.home',
    description: 'nav-bar.home_des',
    icon: 'mdi-home-circle-outline',
    to:'/'
  },{
    text: 'nav-bar.help',
    description: 'nav.help_des',
    icon: 'mdi-help-circle-outline',
    to:'/help'
  }, {
    text: 'nav-bar.problems',
    description: 'nav.problems_des',
    icon: 'mdi-folder-outline',
    to:'/problem/all'
  }, {
    text: 'nav-bar.state',
    description: 'nav-bar.state_des',
    icon: 'mdi-state-machine',
    to: '/state/all'
  },{
    text: 'nav-bar.assignment',
    description: 'nav-bar.assignment_des',
    icon: 'mdi-clipboard-text',
    to: '/assignment/all'
  }]
}
</script>

<style scoped lang="scss">
  $app-bar-height: 56px;

  #app-bar{
    width: 80%;
    margin: 0 auto;
  }

  #app-bar-btn-list {
    display: inline-block;
  }

  .app-bar-btn-item {
    display: inline-block;
    margin: 0 30px;
  }

  .app-bar-btn-item-btn-icon{
    display: inline-block;
    margin: 0 10px 0 0;
  }

  #app-bar-s-avatar {
    line-height: $app-bar-height;
    margin: 0 30px 0 0;
  }

  #logo-text {
    padding: 12px;
    font-weight: 600;
    line-height: $app-bar-height;
  }
</style>
