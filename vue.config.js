module.exports = {
    
  "transpileDependencies": [
    "vuetify"
  ],
  
  configureWebpack: {
    plugins: [
    ],
    externals: { ws: "WebSocket"},
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/sass/main.scss"`,
      },
    },
  },

  chainWebpack: config => {
    ["vue-modules", "vue", "normal-modules", "normal"].forEach((match) => {
      config.module.rule('scss').oneOf(match).use('sass-loader')
        .tap(opt => Object.assign(opt, { prependData: `@import '~@/sass/main.scss';` }))
    })
  },

  // configure webpack-dev-server behavior
  devServer: {
    open: false,
    compress: true,
    host: '0.0.0.0',
    public: 'http://dev.maverick.one:6794',
    disableHostCheck: true,
    port: 6794,
    https: false,
    hotOnly: true,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: null,
    before: app => {},
    clientLogLevel: 'warning',
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    }
  },
}
