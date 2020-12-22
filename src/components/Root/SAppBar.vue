<template>
  <v-app-bar app class="app-width h-center border-radius4" color="white">
    <v-app-bar-nav-icon v-if="showIcon" id="nav-icon"
                        @click="$store.commit('setSideNav', !$store.state.sideNav)"
    />
    <v-avatar id="logo-img">
      <v-img src="@/assets/cute_phantom.jpg"/>
    </v-avatar>
    <label id="logo-text" class="ellipsis-col">
      Phantom-OJ
    </label>
    <v-spacer></v-spacer>
    <ul v-if="!showIcon" class="inline-block" style="padding: 0">
      <li v-for="(btn, index) in $store.state.nav"
          :key="index"
          class="app-bar-btn-item inline-block"
      >
        <v-btn
          text
          :key="index"
          :to="btn.to"
        >
          <v-icon class="app-bar-btn-item-btn-icon inline-block icon-color-0">
            {{btn.icon}}
          </v-icon>
          {{$t(btn.text)}}
        </v-btn>
      </li>
    </ul>
    <v-spacer/>
    <v-btn-toggle v-model="localeToggle" class="s-locale-box" mandatory shaped>
      <v-btn v-for="(locale,i) in locales" :key="locale" text :class="`lang-${$i18n.availableLocales[i]}`">
        {{locale}}
      </v-btn>
    </v-btn-toggle>
    <s-app-bar-avatar
      :size="48"
      id="app-bar-s-avatar"
    ></s-app-bar-avatar>
  </v-app-bar>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Watch} from 'vue-property-decorator'
import SAppBarAvatar from "@/components/Root/SAppBarAvatar.vue";
import {mapState} from "vuex";
import {SUtil} from "@/ts/utils";

@Component({
  components: {SAppBarAvatar},
  computed: {...mapState(['width_height'])}
})
export default class SAppBar extends Vue {
  readonly width_height!: { width: number }
  localeToggle: number = 1

  @Watch('localeToggle', {immediate: true})
  changeLocale() {
    if(this.$i18n.locale !== this.$i18n.availableLocales[this.localeToggle]) {
      this.$i18n.locale = this.$i18n.availableLocales[this.localeToggle]
    }
  }

  @Watch('$i18n.locale')
  localeChanged(){
    if(this.$i18n.locale !== this.$i18n.availableLocales[this.localeToggle]) {
      this.localeToggle = this.$i18n.availableLocales.findIndex(l => l=== this.$i18n.locale)
    }
  }

  get locales() {
    const locales: Array<string> = this.$i18n.availableLocales.map(Map.prototype.get.bind(SUtil.localeMap))
    if (this.width_height.width < 800) {
      return locales.map(i => i.slice(0, 2))
    }
    return locales
  }

  /**
   * whether show the nav-icon (the switch of left menu)
   */
  get showIcon(): boolean {
    if (this.$i18n.locale === 'zh-CN' && this.width_height.width < 1270)
      return true
    else if (this.$i18n.locale === 'en' && this.width_height.width < 1550)
      return true
    return false
  }
}
</script>

<style lang="scss">
  $app-bar-height: 56px;

  .app-bar-btn-item {
    margin: 0 10px;
  }

  .app-bar-btn-item-btn-icon {
    margin: 0 10px 0 0;
  }

  #app-bar-s-avatar {
    line-height: $app-bar-height;
    margin: 0 2% 0 0;
  }

  #logo-img {
    margin: 0 0 0 2%;
  }

  #logo-text {
    padding: 12px;
    font-weight: 600;
    line-height: $app-bar-height;
  }

  .s-locale-box {
    margin-right: 30px;
    @media screen and (max-width: 450px) {
      margin-right: 10px !important;
    }
  }

  /*@media only screen and (min-width: 1520px) {*/
  /*  #nav-icon {*/
  /*    display: none !important*/
  /*  }*/
  /*}*/

  /*@media only screen and (max-width: 1520px) {*/
  /*  .app-bar-btn-item {*/
  /*    display: none !important;*/
  /*  }*/
  /*}*/
  //replaced by js

</style>
<style scoped lang="scss">
  .v-btn-toggle > .v-btn.v-btn {
    border-style: none;
  }
</style>
