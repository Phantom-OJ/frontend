<template>
  <div class="home">
    <s-avatar :size="200" id="super-ava" />
    <img alt="lslnb!!!" class="mid-logo" src="../assets/lslnb.jpg" style="display: none">
    <hello-world msg="Welcome to Your Vue.js + TypeScript App" hidden/>
    <router-link to="/user/lsl" style="text-align: center; display: block">
      <p class="s-inline">lslnb</p>
    </router-link>
  </div>
</template>

<script lang="ts">
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
}
</script>

<style lang="scss">

  .mid-logo {
    display: block;
    margin: 0 auto;
  }

  #super-ava {
    display: block;
    margin: 0 auto;
    width: 200px
  }
</style>
