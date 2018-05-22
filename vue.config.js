const path = require('path')
const webpack = require('webpack')
const CopywebpackPlugin = require('copy-webpack-plugin')
const cesiumSource = 'node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'

module.exports = {
  // Project deployment base
  baseUrl: './',
  // devBaseUrl: '/dev/maverick/',

  // where to output built files
  outputDir: 'dist',

  // whether to use eslint-loader for lint on save.
  // valid values: true | false | 'error'
  // when set to 'error', lint errors will cause compilation to fail.
  lintOnSave: true,

  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  compiler: true,

  // babel-loader skips `node_modules` deps by default.
  // explicitly transpile a dependency with this option.
  transpileDependencies: [/* string or regex */],

  // generate sourceMap for production build?
  productionSourceMap: true,

  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
  },
  configureWebpack: {
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
      extensions: ['*', '.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, 'src'),
        cesium: path.resolve(__dirname, cesiumSource)
      }
    },
    module: {
      unknownContextCritical: false,
      rules: [
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
      }]
    },
    /*
    optimization: {
      splitChunks: {
      	cacheGroups: {
      		commons: {
      			name: "cesium",
      			chunks: "all",
      			minChunks: module => module.context && module.context.indexOf('cesium') !== -1
      		}
      	}
      }
    },
    */
    plugins: [
      // Copy Cesium Assets, Widgets, and Workers to a static directory
      new CopywebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' } ]),
      new CopywebpackPlugin([ { from: path.join(cesiumSource, 'Assets'), to: 'Assets' } ]),
      new CopywebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' } ]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('./') // Define relative base path in cesium for loading assets
      })
    ],
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
    loaderOptions: {},

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
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 6794,
    https: false,
    hotOnly: false,
    overlay: true,
    proxy: null, // string | Object
    before: app => {}
  },

  // options for 3rd party plugins
  pluginOptions: {
    // ...
  }
}