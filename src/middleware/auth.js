const jwt = require('jsonwebtoken');
const { error } = require('../utils/res');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.json(error('未登录，请先登录', 401));

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode; // 挂载用户信息
    next();
  } catch (e) {
    return res.json(error('Token已失效，请重新登录', 401));
  }
}