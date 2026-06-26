const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { success, error } = require('../utils/res');
require('dotenv').config();

// 登录
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [[user]] = await pool.query('SELECT * FROM user WHERE username=?', [username]);
    if (!user) return res.json(error('账号不存在'));
    if (user.status !== 1) return res.json(error('账号已被禁用'));
    const isPwdOk = bcrypt.compareSync(password, user.password);
    if (!isPwdOk) return res.json(error('密码错误'));

    // 生成token
    const token = jwt.sign(
      { id: user.id, username: user.username, roleId: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    )
    res.json(success({ token, nickname: user.nickname, roleId: user.role_id }, '登录成功'))
  } catch (e) {
    res.json(error('服务器异常'))
  }
}

// 用户列表
exports.getUserList = async (req, res) => {
  const [list] = await pool.query(`
    SELECT u.*, r.role_name
    FROM user u LEFT JOIN role r ON u.role_id = r.id
  `)
  res.json(success(list))
}