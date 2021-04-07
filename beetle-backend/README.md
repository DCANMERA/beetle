# beetle-backend

**必读**

## 后端接口

1. 文件夹名字为 beetle-backend
2. 可联系 hongwei.ye@outlook.com 查看
3. 可在项目文件查看接口文档

## 主要第三方库

```
- body-parser
- express
- jsonwebtoken
- mysql2
- nodemailer
- sequelize
```

## 1、环境依赖

```
- Node.js：推荐使用 10.x 以上 LTS 版本
- 包管理器：npm (^6.14.8)，使用 npm 锁定包版本，不要随意升级项目依赖的包版本
```

## 2、确保自己电脑装有 node 的环境

```
可以用 node --version 查看，
如果有版本号输出则说明环境支持
```

## 3、config 文件夹 服务端配置

```
  > 服务器配置
  > 随机昵称
  > 加盐配置, 用于加强加密
  > 数据库配置 --- 必须配置
    >> database: 'server_db', // 自己的数据库名称
    >> username: 'root', // 数据库用户名
    >> password: 'root', // 数据库登录密码
  > 邮件配置, 验证码
  > 允许请求(白名单)
  > 验证验证码请求路径
  > token 配置
```

## 4、初始化商品数据类型 在--》db 文件夹 --》model 文件夹 --》type.js 把下面这段代码注释打开即可，注运行一次后记得把其再注释掉，不然会多次累加商品类型

```
// .then(result => {
//   console.log('类型');
//   typeData.map(v => {
//     Type.create(v);
//   })

// }).catch(err => {
//   console.log('err ==>', err)
// })
```

## 5、项目构建

```
npm install
```

## 6、Project setup

```
node index.js
```
