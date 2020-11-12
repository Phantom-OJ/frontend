<template>
  <div id="alert-container">
    <v-alert v-for="(alert,index) in alerts" :key="index" :color="alert.type" :type="alert.type"
             transition="fade-transition" :dismissible="true" :value="alert.show" class="alert-item">
      {{alert.info}}
    </v-alert>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Alert} from "@/ts/dataDef";

@Component({})
export default class SAlert extends Vue {
  alerts: Array<Alert> = []

  mounted() {
    setInterval(() => {
      this.alerts = this.alerts.filter(a => a.exist)
    }, 5000)
  }

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

<style scoped lang="scss">
  #alert-container {
    position: fixed;
    top: 80px;
    width: 15%;
    min-width: 100px;
    right: 20px;
    z-index: 100;
    opacity: 0.75;
  }
</style>
