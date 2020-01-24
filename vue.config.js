const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
    
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  
  /*
  chainWebpack: config => {
    const rule = config.module
      .rule('gql')
      .test(/\.(gql|graphql)$/)
      .include
      .end()

    rule
      .use('gql-loader')
      .loader('graphql-tag/loader')
      .end()
  },
  */
  
  /*
  configureWebpack: {
    module: {
      rules: [{
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              fiber: require('fibers'),
              indentedSyntax: true // optional
            }
          }
        ]
      }]
    },
    optimization: {
    },
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  },
  */
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/sass/main.scss"`,
      },
    },
  },

  chainWebpack: config => {
    ["vue-modules", "vue", "normal-modules", "normal"].forEach((match) => {
      config.module.rule('scss').oneOf(match).use('sass-loader')
        .tap(opt => Object.assign(opt, { data: `@import '~@/sass/main.scss';` }))
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
