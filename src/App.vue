<template>
  <v-app :class="`lang-${$i18n.locale}`">
    <s-nav-bar />
    <s-app-bar />

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import 'element-ui/lib/theme-chalk/display.css'
import SAppBar from "@/components/SAppBar.vue";
import SNavBar from "@/components/SNavBar.vue";

@Component({
  name: 'App',
  components: {SNavBar, SAppBar}
})
export default class App extends Vue {

}
</script>
<style lang="scss">
  @import "./css/global.scss";
</style>
