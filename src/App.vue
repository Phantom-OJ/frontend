<template>
  <v-app :class="`lang-${$i18n.locale}`" id="s-app" dark>
    <s-nav-bar/>
    <s-app-bar/>
    <s-alert ref="alert"/>
    <s-confirm ref="confirm"/>
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
import {SUtil} from "@/ts/utils";
import SConfirm from "@/components/General/SConfirm.vue";

@Component({
  components: {SConfirm, SAlert, SFooter, SNavBar, SAppBar}
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
    window.state = {}
    Vue.prototype.$api = API.getInstance()
    Vue.prototype.$alert = (alert) => {
      (this.$refs.alert as any).add(alert)
    }
    Vue.prototype.$confirm = (content: string) => (this.$refs.confirm as any).confirm(content)

    Vue.prototype.$api.$vue = this

    console.log(phantomIcon)

    window.onresize = () => {
      this.$store.commit('windowResize', {width: window.innerWidth, height: window.innerHeight})
    }
    window.onbeforeunload = () => {
      let state = {
        time: Date.now() + '',
        route: this.$route.path,
        problemInfo: this.$store.state.problemInfo,
        assignmentInfo: this.$store.state.assignmentInfo,
        recordInfo: this.$store.state.recordInfo,
        state: undefined as any
      }
      window.state = {}
      this.$destroy()
      state.state = window.state
      sessionStorage.setItem('leave', state.time)
      navigator.sendBeacon('/api/beacon', JSON.stringify(state))
    }
    this.checkState()
  }

  async checkState() {
    const [user, isAuthenticated] = await this.$api.checkState()
    this.$store.commit('setUser', {user, isAuthenticated})
    this.$i18n.locale = user.lang

    let leave = sessionStorage.getItem('leave')

    if (isAuthenticated && user.stateSave && ((!!leave && parseInt(user.state.time) >= parseInt(leave)) || !leave)) {
      SUtil.recover(user.state, this)
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
