import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#FFFFFF',
        secondary: '#03a9f4',
        accent: '#2196f3',
        error: '#ff5722',
        warning: '#ff9800',
        info: '#cddc39',
        success: '#4caf50'

      }
    }
  }
})
