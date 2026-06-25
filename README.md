# rbac-permission-backend
基于 Node.js + Express + MySQL 实现 RBAC 权限管理后端项目
## 项目介绍
本项目采用经典 **RBAC（用户-角色-权限）三级权限模型**，是后台管理系统通用权限底座，实现登录认证、Token 鉴权、接口级访问权限控制，可直接用于各类管理系统二次开发。

## 技术栈
- 后端框架：Express
- 数据库：MySQL 5.7+
- 加密方案：bcrypt 密码哈希加密
- 身份认证：JWT 生成与校验
- 环境配置：dotenv 环境变量隔离

## 数据库设计
共5张数据表，实现权限体系解耦
1. `user` 用户表：存储账号、加密密码、所属角色ID
2. `role` 角色表：角色名称、角色描述
3. `permission` 权限表：接口权限标识、权限名称
4. `role_permission` 角色-权限中间表：多对多绑定
5. `menu` 菜单表（预留扩展前端菜单渲染）

## 核心功能
1. 用户登录：账号密码校验，bcrypt 加密比对，登录下发 JWT Token
2. 登录拦截中间件：未携带有效 Token 直接拦截（401）
3. 权限校验中间件：自动判断当前角色是否拥有接口访问权限，无权限拦截（403）
4. 用户管理：查询用户列表
5. 角色管理：角色新增、修改、删除
6. 权限分配：给指定角色批量分配接口权限

## 环境准备
1. 安装 Node.js
2. 安装 MySQL 并启动服务
3. 创建数据库 `rbac_perm`，执行项目配套初始化 SQL 脚本

## 快速部署运行
### 1. 克隆项目
```bash
git clone https://github.com/scriptRider14/rbac-permission-backend.git
cd rbac-permission-backend
