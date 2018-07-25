# vue-todo-ssr

> vue-todo使用了服务端渲染

### 技术栈

**vue全家桶 + vue服务端渲染 + koa + APICloud**

### 说明

- 学习了vue服务端渲染课程后改进了以前写的todo应用。
- 使用的是Bundle Render 和手动注入模板的方式。
- [演示地址](http://todo.haledeng.com)

### 项目结构

```bash
|—— build        webpack编译配置文件
|—— client       客户端相关代码
|—— server       服务端相关代码
|—— client-dist  编译后的前端打包代码和服务端渲染前端json文件
|—— server-dist  编译后的服务端渲染后端json文件
```

### 安装和启动

```bash
# 安装前后端依赖
yarn install

# 启动开发环境服务(127.0.0.1:8080打开前端服务, 127.0.0.1:8081打开服务端渲染)
yarn dev

# 编译打包
yarn build

# 启动生产环境服务(127.0.0.1:8081打开服务端渲染)
yarn start
```
