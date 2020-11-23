<template>
  <v-app :class="`lang-${$i18n.locale}`" id="s-app" dark>
    <s-nav-bar/>
    <s-app-bar/>
    <s-alert ref="alert"/>
    <v-main>
      <v-slide-x-reverse-transition>
        <router-view/>
      </v-slide-x-reverse-transition>
    </v-main>
    <s-footer/>
  </v-app>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SAppBar from "@/components/Root/SAppBar.vue";
import SNavBar from "@/components/Root/SNavBar.vue";
import SFooter from "@/components/Root/SFooter.vue";
import SAlert from "@/components/General/SAlert.vue";
import {API} from "@/ts/api";


@Component({
  components: {SAlert, SFooter, SNavBar, SAppBar}
})
export default class App extends Vue {
  /**
   * Inject the $api and $alert into vue instance.
   */
  beforeMount() {
    Vue.prototype.$api = API.getInstance()
    Vue.prototype.$api.$alert = Vue.prototype.$alert = (alert) => {
      //@ts-ignore
      this.$refs.alert.add(alert)
    }
  }

  mounted() {
    //@ts-ignore dev TODO
    window.vue = this
    window.onresize = () =>
      this.$store.commit('windowResize', {width: window.innerWidth, height: window.innerHeight})
    window.onunload = () => {
      navigator.sendBeacon('http://localhost:9999/api/beacon', JSON.stringify({
        problemInfo: this.$store.state.problemInfo,
        assignmentInfo: this.$store.state.assignmentInfo,
        recordInfo: this.$store.state.recordInfo
      }))
    }
  }
}
</script>
<style lang="scss">
  @import "./css/global.scss";

  #s-app-not {
    background-color: rgba(200, 240, 252, 1);
    background-position: center;
    background-repeat: no-repeat;
  }

</style>
