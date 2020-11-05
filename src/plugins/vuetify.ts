import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options:{
      customProperties: true
    },
    themes: {
      light: {
        primary: '#3fc3ff',
        secondary: '#03a9f4',
        accent: '#3165e5',
        error: '#ff5722',
        warning: '#ff9800',
        info: '#f6f643',
        success: '#4caf50'
      }
    }
  }
})
