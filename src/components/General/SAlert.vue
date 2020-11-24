<template>
  <div id="s-alert-container">
    <v-alert v-for="(alert,index) in alerts" :key="index" :color="alert.type" :type="alert.type"
             transition="fade-transition" :dismissible="true" :value="alert.show" class="alert-item">
      {{alert.info}}
    </v-alert>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import {Alert} from "@/ts/entities";

@Component({})
export default class SAlert extends Vue {
  alerts: Array<Alert> = []

  mounted() {
    setInterval(() => {
      this.alerts = this.alerts.filter(a => a.exist)
    }, 5000)
  }

  /**
   * Add a alert for show. The alert will disappear after alert.time ms.
   * @param alert {@link Alert}
   */
  add(alert: Alert) {
    this.alerts.push(alert)
    setTimeout(() => {
      alert.show = false
    }, alert.time)
    setTimeout(() => {
      alert.exist = false
    }, alert.time + 2000)
  }
}
</script>

<style lang="scss">
  #s-alert-container {
    position: fixed;
    top: 80px;
    width: 20%;
    min-width: 120px;
    right: 20px;
    z-index: 100;
    opacity: 0.75;
  }
</style>
