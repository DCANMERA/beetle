module.exports = {
  publicPath: './',
  configureWebpack: {
    devtool: 'source-map'
  },
  // css相关配置 配置高于chainWebpack中关于css loader的配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/config.scss";`
      }
    }
  },
  devServer: {
    open: true,
    port: 8081
  }
}
