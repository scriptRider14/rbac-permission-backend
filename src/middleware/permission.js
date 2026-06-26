const pool = require('../config/db');
const { error } = require('../utils/res');

// 传入需要的权限标识，校验当前用户是否拥有
const hasPerm = (permKey) => {
  return async (req, res, next) => {
    const uid = req.user.id;
    const [rows] = await pool.query(`
      SELECT p.perm_key
      FROM user u
      LEFT JOIN role_permission rp ON u.role_id = rp.role_id
      LEFT JOIN permission p ON rp.perm_id = p.id
      WHERE u.id = ?
    `, [uid])
    const permList = rows.map(item => item.perm_key);
    if (!permList.includes(permKey)) {
      return res.json(error('无当前接口访问权限', 403))
    }
    next();
  }
}
module.exports = hasPerm;