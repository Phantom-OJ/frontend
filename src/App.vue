<template>
  <v-app :class="`lang-${$i18n.locale}`" id="s-app" dark>
    <s-alert ref="alert"/>
    <s-nav-bar/>
    <s-app-bar/>

    <v-main>
      <router-view/>
    </v-main>
    <s-footer/>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import SAppBar from "@/components/SAppBar.vue";
import SNavBar from "@/components/SNavBar.vue";
import SFooter from "@/components/SFooter.vue";
import SAlert from "@/components/SAlert.vue";
import {Alert} from "@/ts/DataDef";

@Component({
  components: {SAlert, SFooter, SNavBar, SAppBar}
})
export default class App extends Vue {
  beforeCreate() {
  }

  created() {
  }

  beforeMount() {
    Vue.prototype.$alert = (alert: Alert) => {
      //@ts-ignore
      this.$refs.alert.add(alert)
    }
  }

  mounted() {
    // @ts-ignore dev TODO
    window["vue"] = this
    let that = this
    window.onresize = function () {
      that.$store.commit('windowResize', {width: window.innerWidth, height: window.innerHeight})
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
