<template>
  <v-app>
    <s-app-bar>

    </s-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import 'element-ui/lib/theme-chalk/display.css'
import SAppBar from "@/components/SAppBar.vue";

@Component({
  name: 'App',
  components: {SAppBar},
  // components: {
  //   HelloWorld
  // },

  data: () => ({
    //
  })
})
export default class App extends Vue {

}
</script>
<style lang="scss">
  @import "./css/global.scss";
</style>
