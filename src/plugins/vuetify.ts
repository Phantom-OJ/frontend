import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme:{
    themes:{
      light:{
        primary: '#FFFFFF',
        secondary: '#FFFFFF',
        accent: '#FFFFFF'
      }
    },
    disable:true
  }
})
