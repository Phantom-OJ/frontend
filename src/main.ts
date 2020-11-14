// @ts-nocheck
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vueMathjax from './plugins/vueMathjax'
import codemirror from './plugins/vueCodemirror'
import i18n from './i18n'

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  vuetify,
  vueMathjax,
  codemirror,
  i18n,
  render: h => h(App)
}).$mount('#app')

