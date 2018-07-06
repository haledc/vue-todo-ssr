module.exports = (isDev) => {
  return {
    // 删除多余空格
    preserveWhitepace: true,
    // 提取css
    extractCSS: !isDev,
    // css模块配置
    cssModules: {
      // 自定义命名
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      // 驼峰
      camelCase: true
    }
    // 热重载
    // hotReload: false,
  }
}