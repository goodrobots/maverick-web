/*
    Note: All the commented lines in this file are to do with Cesium support,
    which is temporarily disabled.
*/

/*
const path = require('path')
const webpack = require('webpack')
const CopywebpackPlugin = require('copy-webpack-plugin')
const cesiumSource = 'node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'
*/

module.exports = {
  // Project deployment base
  // baseUrl: process.env.NODE_ENV == 'production' ? '/' : '/dev/maverick/',

  // where to output built files
  outputDir: 'dist',

  // whether to use eslint-loader for lint on save.
  // valid values: true | false | 'error'
  // when set to 'error', lint errors will cause compilation to fail.
  lintOnSave: process.env.NODE_ENV !== 'production',

  runtimeCompiler: true,

  // babel-loader skips `node_modules` deps by default.
  // explicitly transpile a dependency with this option.
  transpileDependencies: [
    /* string or regex */
  ],

  // generate sourceMap for production build?
  productionSourceMap: false,

  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {},

  configureWebpack: {
    /*
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      sourcePrefix: '' // Cesium - Needed to compile multiline strings in Cesium
    },
    amd: {
      toUrlUndefined: true // Enable webpack-friendly use of require in Cesium
    },
    node: {
      fs: 'empty' // Resolve node module use of fs
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        // vue$: 'vue/dist/vue.esm.js',
        // '@': path.resolve(__dirname, 'src'),
        cesium: path.resolve(__dirname, cesiumSource)
      }
    },
    */
    module: {
      /*
      unknownContextCritical: false,
      unknownContextRegExp: /^.\/.*$/,
      */
      rules: [
        /*
        {
          test : /\.css$/,
          use: [
              "style-loader",
              "css-loader"
          ]
        },
        {
          test : /\.(png|gif|jpg|jpeg)$/,
          use : ["file-loader"]
        },
        {
          test: /\.glsl$/,
          use: ['file-loader' ]
        },
        {
        // Strip cesium pragmas
        test: /\.js$/,
          enforce: 'pre',
          include: path.resolve(__dirname, cesiumSource),
          use: [{
            loader: 'strip-pragma-loader',
            options: {
              pragmas: {
                debug: false
              }
            }
          }]
        }
        */
      ]
    },
    optimization: {
      /*
      splitChunks: {
          cacheGroups: {
              commons: {
                  test: /[\\/]node_modules[\\/]cesium/,
                  name: 'Cesium',
                  chunks: 'all'
              }
          }
      }
      */
    },
    plugins: [
      /*
      // Copy Cesium Assets, Widgets, and Workers to a static directory
      new CopywebpackPlugin([
          // copy Cesium's non-JS assets
          {from: path.join(cesiumSource, '../Build/Cesium/Assets'), to: 'Assets'},
          // copy Cesium's non-JS widget-bits (CSS, SVG, etc.)
          {from: path.join(cesiumSource, '../Build/Cesium/Widgets'), to: 'Widgets'},
          // copy Cesium's Almond-bundled-and-minified Web Worker scripts
          {from: path.join(cesiumSource, '../Build/Cesium/Workers'), to: 'Workers'},
          // copy Cesium's minified third-party scripts
          {from: path.join(cesiumSource, '../Build/Cesium/ThirdParty/Workers'), to: 'ThirdParty/Workers'},
      ]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('../') // Define relative base path in cesium for loading assets
      }),
      new webpack.IgnorePlugin(/draco/)
      */
    ]
  },

  // CSS related options
  css: {
    // extract CSS in components into a single CSS file (only in production)
    // can also be an object of options to pass to extract-text-webpack-plugin
    extract: true,

    // enable CSS source maps?
    sourceMap: true,

    // pass custom options to pre-processor loaders. e.g. to pass options to
    // sass-loader, use { sass: { ... } }
    loaderOptions: {
      css: {},
      postcss: {},
      stylus: {}
    }

    // Enable CSS modules for all css / pre-processor files.
    // This option does not affect *.vue files.
    // modules: false
  },

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,

  // options for the PWA plugin.
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // configure webpack-dev-server behavior
  devServer: {
    open: false,
    compress: true,
    host: '0.0.0.0',
    public: 'http://newdev.maverick.one:6794',
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

  // options for 3rd party plugins
  pluginOptions: {}
}
