# Vue3 Mobile Template

基于 Vue 3 + Vite 的移动端项目模板，支持 750 设计稿自适应。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全
- **Vite** - 下一代前端构建工具
- **Pinia** - Vue 状态管理
- **Vue Router** - 官方路由
- **Stylus** - CSS 预处理器
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **postcss-pxtorem** - 750 设计稿 px 转 rem

## 750 设计稿自适应

- 设计稿宽度：750px
- 基准：1rem = 100px（750 设计稿下）
- 开发时直接写 **设计稿 px 值**，postcss-pxtorem 自动转为 rem
- 不同分辨率下自动等比缩放

## 开发

```bash
pnpm install
pnpm dev
```

## 脚本

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 生产构建
- `pnpm preview` - 预览构建产物（端口 3000）
- `pnpm typecheck` - TypeScript 类型检查
- `pnpm lint` - ESLint 检查
- `pnpm lint:fix` - ESLint 自动修复
- `pnpm format` - Prettier 格式化

## 保存时自动格式化

在 VSCode 中安装 **ESLint** 和 **Prettier** 扩展后，保存文件时会自动：

1. Prettier 格式化代码
2. ESLint 自动修复可修复的问题

## 项目结构

```
src/
├── main.ts           # 入口（含 750 自适应初始化）
├── App.vue
├── router/           # 路由
├── store/            # Pinia 状态
├── views/            # 页面组件
├── assets/
│   └── styles/       # 全局样式（Stylus）
│       ├── app.styl
│       ├── base.styl
│       └── common.styl
└── vite-env.d.ts     # Vite 类型声明
```
