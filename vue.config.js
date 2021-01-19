'use strict'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'vue-template' // page title
const proxyTarget = "http://localhost:56311"  //api的本地访问路径

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/SchoolHealthcare/Web',
  outputDir: '../../new-website/wwwroot/SchoolHealthcare/Web',      // 输出文件目录
  assetsDir: 'static',      // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  indexPath: "index.html",  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。

  lintOnSave: false,          // eslint-loader 是否在保存的时候检查 process.env.NODE_ENV === 'development'
  runtimeCompiler: false,     // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。一般情况不建议打开

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    // externals: {
    //   vue: 'Vue',
    //   'vue-router': 'VueRouter',
    //   axios: 'axios',
    //   'element-ui': 'ELEMENT'
    // },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    devtool: 'source-map'
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    // config
    //   // https://webpack.js.org/configuration/devtool/#development
    //   .when(process.env.NODE_ENV === 'development', config => config.devtool('source-map'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: proxyTarget,
        changeOrigin: true, // 是否跨域
      },
    }
  }
}
