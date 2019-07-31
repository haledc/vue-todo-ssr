module.exports = isProd => {
  if (!isProd) {
    return {
      compilerOptions: {
        preserveWhitespace: false // 删除多余空格
      }
    }
  }
}
