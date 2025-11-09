# uniapp-template

- 技术栈：`uniapp + Vue3 + TypeScript + Vite5 + UnoCSS`
- 多平台：支持 `H5 / App / 微信小程序 / 支付宝小程序(含钉钉) / 字节 / 快手 / 百度`
- 不依赖 `HBuilderX`，可通过命令行进行开发构建
- 内置： `约定式路由、Layout 布局、HTTP 封装与拦截、登录拦截、UnoCSS 原子化样式`
- 提供了 `代码提示`、`自动格式化`、`统一配置`、`代码片段` 等辅助功能
- 可选：第三方组件库（wot-ui、uview-pro、uv-ui、sard-ui、uview-plus）、`z-paging` 列表组件

---

## 平台兼容性

| H5  | IOS | 安卓 | 微信小程序 | 字节小程序 | 快手小程序 | 支付宝小程序 | 钉钉小程序 | 百度小程序 |
| --- | --- | ---- | -------- | -------- | -------- | ---------- | -------- | --------- |
| √   | √   | √    | √        | √        | √        | √          | √        | √         |

## 目录结构总览

- `src/pages/`：页面（约定式路由，文件名即路由）
- `src/pages-sub/`：分包页面（适用于小程序分包）
- `src/pages-fg/`：独立/功能性页面（如 `404`、`login`）
- `src/components/`：全局组件（PascalCase 命名）
- `src/layouts/`：布局（默认 `default.vue`）
- `src/api/`：业务接口（建议按模块划分）
- `src/http/`：HTTP 封装（请求/响应拦截、工具、类型）
- `src/store/`：Pinia 状态（`token`、`user`、`theme`、`tabbar`）
- `src/tabbar/`：底部导航（配置、组件、状态）
- `src/utils/`：工具（如 `definePageShim`、系统信息、上传封装）
- `src/static/`：静态资源（图标、图片、tabbar Icons）
- `src/App.ku.vue`：全局根组件（用于替代 App.vue 的 template 作用）
- 根配置文件：
  - `pages.config.ts`：约定式路由配置（生成 `pages.json`）
  - `manifest.config.ts`：应用清单（平台、权限、路由 base 等）
  - `uno.config.ts`：UnoCSS 配置（预设与规则）
  - `vite.config.ts`：Vite 构建与插件
  - `tsconfig.json`：TypeScript 配置
  - `env/.env*`：环境变量文件

## 环境与依赖

- Node `>=20`，pnpm `>=9`
- 推荐编辑器：VS Code + 插件（见 `.vscode/extensions.json`）， `Vue Official>=2.1.10`
- 代码风格与质量：`eslint.config.mjs` + `.editorconfig` + `husky`（提交钩子）
- 包管理器：使用 `pnpm`，避免与 `npm/yarn` 混用

## 安装与启动

- 安装依赖：
  - `pnpm i`
- 开发启动：（支持热更新）
  - H5：`pnpm dev` 或 `pnpm dev:h5`，访问 `http://localhost:9000/`
  - 微信小程序：`pnpm dev:mp`，使用微信开发者工具导入 `dist/dev/mp-weixin`
  - 支付宝/钉钉小程序：`pnpm dev:mp-alipay`，导入 `dist/dev/mp-alipay`
  - App：`pnpm dev:app`，HBuilderX 导入 `dist/dev/app`（或将整个项目导入 hbx 直接运行安卓/鸿蒙）
- 构建发布：
  - H5：`pnpm build:h5` 输出到 `dist/build/h5`，如非根路径，配置 `manifest.config.ts` 的 `h5.router.base`
  - 微信：`pnpm build:mp` 输出到 `dist/build/mp-weixin`，微信开发者工具上传
  - App：`pnpm build:app` 输出到 `dist/build/app`，HBuilderX 发行（或 hbx 菜单发行安卓/鸿蒙）

## 环境变量

- 配置文件位于 `env/.env*`（如 `.env.development`、`.env.production`）
- 读取方式：`import.meta.env.VITE_***`
- 注意事项：
  - 修改 `.env*` 后需重启开发服务以生效
  - 不同平台可使用条件编译控制变量差异

## 🧭 路由与页面开发（约定式）

- 页面文件放于 `src/pages/`，子目录即路由层级，如 `src/pages/me/index.vue` => `/pages/me/index`
- 分包页面放于 `src/pages-sub/`（小程序分包按需启用）
- 功能页面放于 `src/pages-fg/`（例如 `404`、`login`）
- 页面元信息在页面内通过 `definePage` 宏配置，自动生成到 `pages.json`
- 示例：
  ```vue
  <script setup lang="ts">
  definePage({
    navigationBarTitleText: '我的页面',
    enablePullDownRefresh: false,
  })
  </script>

  <template>
    <view class="page">内容</view>
  </template>
  ```

## 🧩 组件规范

- 代码结构顺序：
  - 第一：`<script setup lang="ts">`
  - 第二：`<template>`
  - 最后：`<style scoped>`（通常省略，优先使用原子化类）
- 命名规范：
  - 组件使用 PascalCase，如 `UserCard.vue`
  - 页面放在 `src/pages/` 下，目录即路由层级
  - 局部组件优先在页面的 `components/` 子目录内
- 类型声明：
  - 使用 `interface` 定义对象结构，`type` 定义联合类型
  - 引入类型使用 `import type`
  - API 响应类型统一在 `src/api/types/` 或 `src/service/types.ts` 中维护
- 第三方组件：
  - 按需安装 wot-ui、uview-pro、uv-ui、sard-ui、uview-plus
  - 列表分页建议使用 `z-paging`，结合 `hooks/useRequest.ts` 管理加载状态

## 🧩 布局与 Tabbar

- 布局管理：
  - 默认布局位于 `src/layouts/default.vue`
  - 全局根组件为 `src/App.ku.vue`（用于统一全局 template 与平台适配）
- Tabbar 相关：
  - 配置文件：`src/tabbar/config.ts`
  - 组件：`src/tabbar/index.vue`
  - 状态：`src/tabbar/store.ts`
  - 图标：`src/static/tabbar/`
- 使用建议：
  - 新增/修改 Tabbar 时同步更新配置与页面路径
  - 保持图标资源命名一致，并校验构建后资源路径是否正确

## 🔌 HTTP 请求封装

- 核心文件：
  - `src/http/http.ts`：请求基础封装（方法、拦截、错误处理）
  - `src/http/interceptor.ts`：请求/响应拦截、登录态处理
  - `src/http/types.ts`：请求与响应相关的类型
  - `src/http/alova.ts`：使用 `alova` 的替代方案（可选）
- 推荐用法：
  - 在 `src/api/` 下为每个业务模块建立接口文件（如 `login.ts`、`foo.ts`）
  - 搭配 `hooks/useRequest.ts` 管理请求状态（loading、错误提示、重试）
- Token 与登录拦截：
  - Token 存储在 `src/store/token.ts`，用户信息在 `src/store/user.ts`
  - 未登录状态由拦截器统一处理，并通过 `src/utils/toLoginPage.ts` 跳转到登录页
  - 小程序与 H5 登录流程存在差异，注意条件编译与平台 API

示例：简单请求与类型约束
```ts
// src/api/foo.ts（示例）
import http from '@/http/http'
import type { FooItem } from './types'

export const getFooList = () => http.get<FooItem[]>('/foo/list')
```

配合组合式请求：
```ts
// src/hooks/useRequest.ts（使用示例）
const { data, loading, error, run } = useRequest(getFooList, { immediate: true })
```

## 🗂️ 状态管理（Pinia）

- 目录：`src/store/`
- Store 划分：`token`、`user`、`theme`、`tabbar` 等
- 定义方式：使用 `defineStore`，支持持久化（按需）
- 建议：
  - 用户信息与权限逻辑独立 store，避免耦合
  - 对外仅暴露必要的 actions/getters
  - 类型严格，避免 `any`，统一在 `types.ts` 中维护公共类型

## 🎨 样式（UnoCSS 原子化）

- 配置：`uno.config.ts`（预设与自定义规则）
- 使用建议：
  - 页面与组件优先使用原子化类名，如 `flex items-center gap-8`
  - 通用样式放在 `src/style/`（如 `index.scss`）或通过 Uno 自定义规则统一
  - 减少在组件中编写 `scoped` 样式，保持样式的原子化与可复用性

## 🧩 平台适配与条件编译

- 条件编译写法：
  ```ts
  // #ifdef H5
  // H5 逻辑
  // #endif

  // #ifdef MP-WEIXIN
  // 微信小程序逻辑
  // #endif
  ```
- 示例（页面内交互差异）：
  ```vue
  <script setup lang="ts">
  const handleClick = () => {
    // #ifdef H5
    uni.showToast({ title: 'H5 平台' })
    // #endif
    // #ifdef MP-WEIXIN
    uni.showToast({ title: '微信小程序' })
    // #endif
  }
  </script>
  ```
- 注意事项：
  - 避免在条件编译块中引用其他平台 API
  - 资源路径在不同平台解析差异，建议统一使用 `@/static/...` 或构建插件处理
  - H5 与小程序路由机制不同，统一使用 `uni.navigateTo` 等方法进行导航

## ⚙️ 核心配置说明

- `pages.config.ts`：
  - 维护页面/分包/Tabbar 配置，自动生成 `pages.json`
  - 新增页面后需更新此配置并重启开发服务
- `manifest.config.ts`：
  - H5 路由基础路径：`h5.router.base`（非根部署如 `/app/` 时必须设置）
  - 各平台权限/能力统一在此维护
- `vite.config.ts`：
  - 插件位于 `vite-plugins/`（如复制原生资源、同步 manifest）
  - 别名：`@` 指向 `src`，统一路径引用
- `uno.config.ts`：原子化样式预设与自定义规则
- `openapi-ts-request.config.ts`：需要自动生成类型化接口客户端时使用（可选）
- 环境变量：位于 `env/.env*`，通过 `import.meta.env.VITE_***` 读取

## 🛠️ 开发调试与脚本

- 调试工具：
  - 微信开发者工具导入 `dist/dev/mp-weixin` 或 `dist/build/mp-weixin`
  - HBuilderX 导入 `dist/dev/app` 或整个项目（安卓/鸿蒙）
- 脚本与工具：
  - `scripts/create-base-files.js`：初始化基础文件
  - `scripts/open-dev-tools.js`：打开开发者工具（按需）
  - `scripts/postupgrade.js`：升级后处理
- Git Hooks：
  - `husky` 提交钩子：`pre-commit`、`commit-msg`
  - 建议使用约定式提交（见 `.commitlintrc.cjs`）

## 🔒 登录与鉴权注意事项

- 统一登录入口与跳转：`src/utils/toLoginPage.ts`
- Token 存储与续期策略在拦截器内统一处理
- 微信小程序登录建议使用 `uni.login`/`wx.login` 换取 `code`，后端接口换取 Token
- 跨平台差异：
  - H5 登录可能涉及第三方重定向（需处理 `router.base`）
  - 小程序不支持浏览器跳转，使用 `uni` 导航方法

## 📦 静态资源与图标

- 放置目录：`src/static/`（`images/`、`my-icons/`、`tabbar/`）
- 引用规范：
  - 使用 `@/static/...` 或通过 `import` 引用，避免相对路径层级混乱
  - H5 非根部署需确保静态资源路径与 `h5.router.base` 一致

## 📝 开发注意事项

- TypeScript：
  - 避免 `any`，为请求/响应与 Store 明确类型
  - 公共类型集中放在 `src/service/types.ts` 或 `src/api/types/`
- 依赖管理：
  - 全项目使用 `pnpm`，避免与 `npm/yarn` 混用导致锁文件冲突
- 页面路由：
  - 新增页面更新 `pages.config.ts` 并重启开发服务
  - 分包页面需在对应分包配置中声明
- 构建输出目录：
  - 开发：`dist/dev/**`
  - 生产：`dist/build/**`
- 调试技巧：
  - 小程序端使用真机调试查看性能与权限问题
  - H5 端检查跨域、`router.base` 与资源加载路径

## ❓ 常见问题 FAQ

- H5 访问 404 或资源加载异常：
  - 检查 `manifest.config.ts` 中 `h5.router.base` 与部署路径是否一致
- 微信小程序导入失败：
  - 确认导入的是 `dist/dev/mp-weixin` 或 `dist/build/mp-weixin` 目录
- 请求未携带 Token：
  - 检查 `src/store/token.ts` 是否正确初始化
  - 确认拦截器已注入 Token 并处理过期状态
- UnoCSS 类名不生效：
  - 检查 `uno.config.ts` 配置是否正确，重启开发服务
- i18n 多语言：
  - 若需启用，建议集成 `vue-i18n` 并在入口统一注册；当前模板未强绑定，可按需扩展
- HBuilderX 相关：
  - App 构建发布推荐使用 HBuilderX 云打包；安卓/鸿蒙也可直接在 hbx 菜单发行

## 🔗 参考与扩展

- 组件库与 `z-paging`：按需安装与注册，在 `src/components/` 或页面 `components/` 中使用
- 路由扩展（H5）：`src/router/` 目录包含路由配置与拦截器，配合 uni-app pages 路由使用
- 服务编排：`src/service/` 聚合接口调用（如列表、详情、用户信息）
- VS Code 配置：参考 `.vscode/extensions.json` 和 `vue3.code-snippets` 获取更好的开发体验



