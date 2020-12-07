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
import phantomIcon from '@/ts/phantom-icon'
import {State} from "@/ts/user";
import {SUtil} from "@/ts/utils";

@Component({
  components: {SAlert, SFooter, SNavBar, SAppBar}
})
export default class App extends Vue {
  /**
   * Inject the $api and $alert into vue instance.
   * Log the console phantom icon
   * Set the observer (window.onunload) when destroy
   * Check state and recover
   */
  beforeMount() {
    //@ts-ignore dev TODO
    window.vue = this

    window.state = {}
    Vue.prototype.$api = API.getInstance()
    Vue.prototype.$alert = (alert) => {
      (this.$refs.alert as any).add(alert)
    }
    Vue.prototype.$api.$vue = this
    console.log(phantomIcon)

    window.onresize = () => {
      this.$store.commit('windowResize', {width: window.innerWidth, height: window.innerHeight})
    }
    window.onunload = () => {
      let state = {
        route: this.$route.path,
        problemInfo: this.$store.state.problemInfo,
        assignmentInfo: this.$store.state.assignmentInfo,
        recordInfo: this.$store.state.recordInfo,
        state: undefined as any
        // , time:Date.now()
      }
      window.state = {}
      this.$destroy()
      state.state = window.state
      const _state = JSON.stringify(state)
      sessionStorage.setItem('state', _state)
      navigator.sendBeacon('/api/beacon', _state)
    }
    this.checkState()
  }

  async checkState() {
    const [user, isAuthenticated] = await this.$api.checkState()
    this.$store.commit('setUser', {user, isAuthenticated})

    let sessionState = sessionStorage.getItem('state')
    let _state: State | undefined = undefined

    if (!!sessionState) {
      _state = JSON.parse(sessionState)
    } else if (isAuthenticated && user.stateSave) {
      _state = user.state
    }
    if (_state === undefined) return
    SUtil.recover(_state, this)
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
