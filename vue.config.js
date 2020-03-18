module.exports = {
    
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/maverick-web'
    : '/',
  
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
