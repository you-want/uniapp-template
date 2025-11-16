<script lang="ts" setup>
import { useThemeStore } from '@/store'
import { safeAreaInsets } from '@/utils/systemInfo'

defineOptions({ name: 'Home' })
definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
})

// 避免顶层直接调用 store，改为在函数内部调用

function gotoAbout() {
  uni.navigateTo({ url: '/pages-sub/about/about' })
}
function gotoMe() {
  uni.navigateTo({ url: '/pages/me/me' })
}

// 简单主题示例：切换主题主色（示例值，可按项目主题系统调整）
const themeColors = ['blue', 'red', 'green', 'purple', 'orange']
const themeIdx = ref(0)
function cycleTheme() {
  themeIdx.value = (themeIdx.value + 1) % themeColors.length
  useThemeStore().setThemeVars?.({ colorTheme: themeColors[themeIdx.value] })
}

const features = [
  { title: '约定式路由', desc: '文件即路由，宏自动生成 pages.json', icon: 'home' },
  { title: '布局系统', desc: '默认布局与可扩展布局支持', icon: 'grid' },
  { title: 'HTTP 封装', desc: '拦截器、登录拦截、类型约束', icon: 'server' },
  { title: 'Pinia 状态', desc: '持久化、模块化、严格类型', icon: 'user' },
  { title: 'UnoCSS', desc: '原子化样式，快速构建页面', icon: 'palette' },
  { title: '多端适配', desc: 'H5/小程序/App 条件编译', icon: 'device' },
]
</script>

<template>
  <view class="page" :style="{ paddingTop: `${safeAreaInsets?.top || 0}px` }">
    <!-- 顶部 Hero -->
    <view class="hero">
      <view class="hero-content">
        <view class="title">
          我的植物
        </view>
        <view class="subtitle">
          集成 uniapp + Vue3 + TypeScript + Vite5 + UnoCSS 的多平台开发模板
        </view>
        <view class="actions">
          <button type="primary" class="btn" @click="gotoAbout">
            示例页
          </button>
          <button type="default" class="btn btn-secondary ml-2" @click="gotoMe">
            个人中心
          </button>
          <button type="warn" class="btn ml-2" @click="cycleTheme">
            切换主题色
          </button>
        </view>
      </view>
    </view>

    <!-- 特性卡片 -->
    <view class="section">
      <view class="section-title">
        内置特性
      </view>
      <view class="cards">
        <view v-for="f in features" :key="f.title" class="card">
          <view class="card-icon">
            {{ f.icon }}
          </view>
          <view class="card-title">
            {{ f.title }}
          </view>
          <view class="card-desc">
            {{ f.desc }}
          </view>
        </view>
      </view>
    </view>

    <!-- 快速入口 -->
    <view class="section">
      <view class="section-title">
        快速入口
      </view>
      <view class="quick-links">
        <view class="link" @click="gotoAbout">
          路由与拦截示例
        </view>
        <view class="link" @click="gotoMe">
          登录与用户信息
        </view>
      </view>
      <!-- 平台差异演示（非强依赖） -->
      <!-- #ifdef H5 -->
      <view class="notice">
        当前为 H5 平台，可直接打开浏览器 DevTools 进行调试。
      </view>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <view class="notice">
        当前为微信小程序平台，请通过微信开发者工具查看上传与登录逻辑。
      </view>
      <!-- #endif -->
    </view>

    <view class="footer">
      <view>模板示例页面，支持多端运行与热更新。</view>
      <view class="muted">
        可在 README 中查看详细的使用说明与开发注意事项。
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  background: linear-gradient(180deg, #f8fafc 0%, #fff 100%);
  min-height: 100vh;
}

/* Hero */
.hero {
  background: linear-gradient(120deg, #a5b4fc 0%, #60a5fa 50%, #34d399 100%);
  border-bottom-left-radius: 24rpx;
  border-bottom-right-radius: 24rpx;
  padding: 40rpx 32rpx 56rpx;
  color: #fff;
}
.hero-content {
  max-width: 1000rpx;
  margin: 0 auto;
  text-align: center;
}
.title {
  font-size: 44rpx;
  font-weight: 700;
  letter-spacing: 1rpx;
}
.subtitle {
  margin-top: 16rpx;
  font-size: 28rpx;
  opacity: 0.9;
}
.actions {
  margin-top: 28rpx;
  display: flex;
  justify-content: center;
}
.btn {
  padding: 14rpx 22rpx;
  border-radius: 999rpx;
}
.btn-secondary {
  background-color: #fff;
  color: #1f2937;
}

/* Sections */
.section {
  padding: 32rpx;
}
.section-title {
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 20rpx;
}

/* Feature cards */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}
.card {
  flex: 1 1 300rpx;
  min-width: 300rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 24rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.06);
}
.card-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 14rpx;
  background: #f3f4f6;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
  font-size: 26rpx;
}
.card-title {
  font-size: 28rpx;
  font-weight: 600;
}
.card-desc {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #6b7280;
}

/* Quick links */
.quick-links {
  display: flex;
  gap: 18rpx;
  flex-wrap: wrap;
}
.link {
  padding: 14rpx 20rpx;
  border: 2rpx solid #e5e7eb;
  border-radius: 999rpx;
  color: #374151;
  background: #fff;
}
.notice {
  margin-top: 16rpx;
  font-size: 24rpx;
  color: #6b7280;
}

/* Footer */
.footer {
  padding: 24rpx 32rpx 40rpx;
  text-align: center;
  color: #6b7280;
}
.muted {
  margin-top: 6rpx;
  font-size: 22rpx;
}
</style>
