const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user');
const auth = require('../middleware/auth');
const hasPerm = require('../middleware/permission');

router.post('/login', userCtrl.login);
router.get('/list', auth, hasPerm('user:list'), userCtrl.getUserList);

module.exports = router;
// 临时接口：生成123456对应的bcrypt哈希
const bcrypt = require('bcryptjs');
router.get('/make-pwd', (req, res) => {
  const hash = bcrypt.hashSync('123456', 10);
  res.send(hash);
});