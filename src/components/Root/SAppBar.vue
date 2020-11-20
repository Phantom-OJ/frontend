<template>
  <v-app-bar app class="app-width h-center border-radius4" color="white">
    <v-app-bar-nav-icon id="nav-icon"
      @click="$store.commit('setSideNav', !$store.state.sideNav)"
    />
    <v-avatar id="logo-img">
      <v-img src="../../assets/slogo.png"/>
    </v-avatar>
    <label id="logo-text" class="ellipsis-col">
      Phantom-OJ
    </label>
    <v-spacer></v-spacer>
    <ul class="inline-block" style="padding: 0">
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
    <v-btn-toggle v-model="localeToggle" style="margin-right: 30px" mandatory shaped>
      <v-btn v-for="(locale,i) in locales" :key="locale" text :class="`lang-${$i18n.availableLocales[i]}`">
        {{locale}}
      </v-btn>
    </v-btn-toggle>
    <s-avatar
      :size="48"
      id="app-bar-s-avatar"
    ></s-avatar>
  </v-app-bar>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import SAvatar from "@/components/Root/SAvatar.vue";

@Component({
  components: {SAvatar}
})
export default class SAppBar extends Vue {
  readonly localeMap = new Map<string, string>([['en', 'English'], ['zh-CN', '简体中文']])
  localeToggle: number = 1

  @Watch('localeToggle', {immediate: true})
  changeLocale() {
    this.$i18n.locale = this.$i18n.availableLocales[this.localeToggle]
  }

  get locales() {
    return this.$i18n.availableLocales.map(Map.prototype.get.bind(this.localeMap))
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

  @media only screen and (min-width: 1520px) {
    #nav-icon {
      display: none !important
    }
  }

  @media only screen and (max-width: 1520px) {
    .app-bar-btn-item {
      display: none !important;
    }
  }

</style>
<style scoped lang="scss">
  .v-btn-toggle > .v-btn.v-btn{
    border-style: none;
  }
</style>
