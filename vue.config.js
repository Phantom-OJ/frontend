module.exports = {
  productionSourceMap: false,
  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
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
        target:'https://starsky.ink:12222'
        // target:'http://localhost:8080/'
        // target:'http://10.17.29.111:8080/'
      }
    }
  }
}
