# 喵窝 邀请管理系统 - 前端

## 部署

### 说明

本程式基于 React 开发，构建后为纯静态页面 SPA 项目，您可自由部署在各种无服务器托管平台上，例如 CloudFlare Pages 、 GitLab Pages 或是 GitHub Pages 。

如果您有自托管的需要，您也可以参考对应的部署方案。

### 设置

构建时需要指定的自定义环境变量：

1. `REACT_APP_BACKEND_URI` 设置为您的目标 [join-backend](https://github.com/nyaone/join-backend) 服务器地址。
2. `REACT_APP_TOS_LINK` 设置为指向您服务条款的链接。

## 二次开发

### 技术栈

本程式使用到的主要技术栈为 TypeScript + React ，样式部分由 Tailwind CSS 构建。

### 定制前端

如果您不喜欢我们提供的这套解决方案，有自定义前端的需求，您可以参照 `src/common/api` 目录下的代码，其封装了与 [join-backend](https://github.com/nyaone/join-backend) 服务器通讯相关的 API 接口，方便您使用。
