module.exports = isProd => {
  if (!isProd) {
    return {
      compilerOptions: {
        // 删除多余空格
        preserveWhiteSpace: true
      }
    }
  }
}
