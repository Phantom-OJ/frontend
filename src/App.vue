<template>
  <v-app :class="`lang-${$i18n.locale}`" id="s-app">
    <s-nav-bar />
    <s-app-bar />

    <v-main>
      <router-view/>
    </v-main>
    <s-footer/>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import 'element-ui/lib/theme-chalk/display.css'
import SAppBar from "@/components/SAppBar.vue";
import SNavBar from "@/components/SNavBar.vue";
import SFooter from "@/components/SFooter.vue";

@Component({
  name: 'App',
  components: {SFooter, SNavBar, SAppBar}
})
export default class App extends Vue {
  mounted(){

  }
}
</script>
<style lang="scss">
  @import "./css/global.scss";
  #s-app-not{
    background-color: rgba(200, 240, 252, 1);
    background-position: center;
    background-repeat: no-repeat;
  }

</style>
