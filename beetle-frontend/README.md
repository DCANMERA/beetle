# beetle-frontend 甲壳虫前端基础架构

#工作/beetle-frontend

**必读**

## 技术选型

- JavaScript 框架：Vue (^2.6.11)
- 状态管理工具：Vuex (^3.4.0)
- 路由：Vue Router (^3.2.0)
- UI 库：element-ui (^2.15.1)
- CSS 预处理器：SCSS

## 主要第三方库

- 工具库：vue-cookies
- HTTP 库：axios
- CSS reset：reset-css

## 环境依赖

- 脚手架：Vue CLI (^v4.5.0)
- Node.js：推荐使用 10.x 以上 LTS 版本
- 包管理器：Yarn (^1.22.10)，使用 Yarn 锁定包版本，不要随意升级项目依赖的包版本

### 后端接口

1. 文件夹名字为 beetle-backend
2. 安装依赖 npm i 或 npm install
3. 可联系 hongwei.ye@outlook.com 查看
4. 进入后端代码目录，运行 node index. 接口： //localhost:10001

### 为什么选择 yarn 而不是 npm？

Yarn 是为了弥补 npm 的一些缺陷（速度慢/无法锁包版本/历史包袱过重等）而出现的。虽然 npm 一直都在改进这些缺陷，但是在实际的开发过程中发现 ，使用 npm 碰到的问题比使用 Yarn 碰到的问题更多，总结下来 Yarn 是一个更安全的选择。

更多：[Yarn](https://yarnpkg.com/zh-Hans/)

## 目录结构

```
| -- src：项目主目录
     | -- views：view 入口
          | -- main：主工作区
     | -- store：状态管理
     | -- router：路由
     | -- components：公共组件
     | -- services：服务层，提供不同业务逻辑需要的一些通用接口，所有接口调用都必须经过服务层
     | -- utils：工具函数
     | -- assets：静态资源，如图片/svg/icon 等
		      | -- bg.jpg
     | -- styles：SCSS 模块
          | -- config.scss：scss 配置
     | -- App.vue：应用入口
     | -- main.js：入口文件
| -- dist：生产环境构建文件的目录
| -- package.json
| -- 其它不一一列举
```

### 视图（views 文件夹）

views 文件夹用于存放各 view 独有业务组件，这里的 view 只是代指，并不是限定 views 的一个子文件夹就只能存放一个页面的组件，可以认为子文件夹是某个相同业务（可以有多个页面）的集合。

如果某个 view 很复杂，也可以为在该 view 文件夹下为某块业务创建一个单独的文件夹，文件夹的入口文件是 index.vue。

当新增页面的时候，必须在 views 文件夹中新增一个存放该业务的组件的文件夹，入口文件必须是 index.vue。该文件夹层级限制最大为 4 层，例如: views/main/home/...。一般情况下，3 层目录就足够满足需求。

views 里子文件夹下的文件不强制要求一定得是 .vue 文件，可以将只属于当前页面需要复用的模块（mixin/filter/config/静态资源等）放在这里。按照就近原则存放，便于管理。如果是全局通用的模块，应该放到 src 的子文件夹对应的目录下。

### 通用组件（components 文件夹）

views 文件夹用于存放项目通用组件，当新增组件时，须为该组件新增一个文件夹，文件夹名字使用**PascalCase**命名方式，组件入口文件是 index.vue 或 index.js。

## 状态管理

使用 Vuex 管理应用组件的状态，详见：[Vuex 是什么？ | Vuex](https://vuex.vuejs.org/zh/)。

### 模块

按业务划分模块，每个模块拥有自己的 state、mutation、action、getter，如果模块业务很复杂，可以在模块里嵌套子模块。

新增模块时，新增一个对应的模块文件夹，入口文件是 index.js。

必须为模块注册命名空间。

### 文件命名规范

- Vue 单文件组件的文件名使用 **PascalCase**（大驼峰）命名方式，其它文件用**kebab-case**（横线连接）命名方式
- 页面入口文件必须是 index.vue ，不需要使用 PascalCase 命名方式

### 路由

- 在配置路由时，必须为每个路径配置对应的名字，不要使用中文
- 子路径路由名字配置规则：路径组合拼接（忽略跟路径名称），单词之前使用半角 . 分隔，如路径 /butler/schedule，那么该子路径路由名字是 bulter.schedule

## 项目构建

```
yarn
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
