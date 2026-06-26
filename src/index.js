const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

// 注册全局路由
app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`RBAC后端运行：http://localhost:${PORT}`)
})