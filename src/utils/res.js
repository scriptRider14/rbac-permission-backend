// 成功返回
exports.success = (data, msg = '操作成功') => {
  return { code: 200, msg, data }
}
// 失败返回
exports.error = (msg = '操作失败', code = 500) => {
  return { code, msg, data: null }
}