module.exports = {
  productionSourceMap: false,
  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  devServer:{
    port : 80,
    https:false,
    proxy: {
      '/api':{
        target:'http://10.17.29.111:9999/'
      }
    }
  }
}
