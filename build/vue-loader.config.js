module.exports = (isDev) => {
  if (isDev) {
    return {
      compilerOptions: {
        // 删除多余空格
        preserveWhiteSpace: true
      }
    }
  }
}
