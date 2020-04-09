// const fs = require('fs');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: './',
  configureWebpack: {
    plugins: [
    ],
    externals: { ws: "WebSocket" },
    output: {
      filename: '[name].[hash].js',
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
  
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `yarn.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
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
    before: app => {},
    clientLogLevel: 'warning',
    compress: true,
    host: '0.0.0.0',
    public: 'http://0.0.0.0:6100',
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    },
    // Uncomment this https block below to enable https in the Maverick environment
    /*
    https: {
      key: fs.readFileSync('/srv/maverick/data/security/ssl/web/mavweb.key'),
      cert: fs.readFileSync('/srv/maverick/data/security/ssl/web/mavweb.crt'),
      ca: fs.readFileSync('/srv/maverick/data/security/ssl/ca/mavCA.pem'),
    },
    */
    https: false,
    hotOnly: true,
    inline: true,
    open: false,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 6100,
    proxy: null
  },
}
