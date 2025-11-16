<script lang="ts" setup>
import { isH5, isMpWeixin } from '@uni-helper/uni-env'
import { LOGIN_PAGE } from '@/router/config'
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'

definePage({
  style: {
    navigationBarTitleText: '关于',
    enablePullDownRefresh: false,
  },
})

// 避免顶层直接调用 store，改为使用 computed 在函数内部调用
const hasLogin = computed(() => useTokenStore().hasLogin)
const userInfo = computed(() => useUserStore().userInfo)

function goto(path: string) {
  uni.navigateTo({ url: path })
}

function gotoLogin() {
  const tokenStore = useTokenStore()
  if (tokenStore.hasLogin) {
    uni.showToast({ title: '已登录', icon: 'none' })
    return
  }
  uni.navigateTo({ url: LOGIN_PAGE })
}

function logout() {
  const tokenStore = useTokenStore()
  tokenStore.logout()
  uni.showToast({ title: '已退出登录', icon: 'success' })
}

const features = [
  { title: 'Alova 请求示例', path: '/pages-sub/about/alova' },
  { title: '上拉/下拉刷新', path: '/pages-sub/demo/scroll' },
  { title: '简单请求示例', path: '/pages-sub/demo/index' },
]
</script>

<template>
  <view class="page">
    <view class="hero">
      <view class="hero-title">
        关于模板
      </view>
      <view class="hero-sub">
        整合多端开发能力与常用工具的示例集合
      </view>
      <view class="hero-actions">
        <button type="primary" class="btn" @click="gotoLogin">
          登录
        </button>
        <button type="warn" class="btn ml-2" @click="logout">
          退出登录
        </button>
      </view>
    </view>

    <view class="card">
      <view class="card-title">
        平台信息
      </view>
      <view class="platform-row">
        <view class="tag" :class="{ on: isH5 }">
          H5
        </view>
        <view class="tag" :class="{ on: isMpWeixin }">
          微信小程序
        </view>
      </view>
    </view>

    <view class="card">
      <view class="card-title">
        示例入口
      </view>
      <view class="link-grid">
        <view v-for="f in features" :key="f.title" class="link" @click="goto(f.path)">
          {{ f.title }}
        </view>
      </view>
    </view>

    <view class="card">
      <view class="card-title">
        用户信息
      </view>
      <view class="user">
        <image
          :src="userInfo.avatar || '/static/images/default-avatar.png'" class="avatar"
          mode="aspectFill"
        />
        <view class="info">
          <view class="line">
            昵称：{{ userInfo.nickname || '未设置' }}
          </view>
          <view class="line">
            用户名：{{ userInfo.username || '未设置' }}
          </view>
          <view class="line">
            ID：{{ userInfo.userId === -1 ? '未登录' : userInfo.userId }}
          </view>
        </view>
      </view>
    </view>

    <view class="bottom-gap" />
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #fff 100%);
}

.hero {
  padding: 40rpx 32rpx 56rpx;
  background: linear-gradient(120deg, #a5b4fc 0%, #60a5fa 50%, #34d399 100%);
  color: #fff;
  border-bottom-left-radius: 24rpx;
  border-bottom-right-radius: 24rpx;
  text-align: center;
}

.hero-title {
  font-size: 40rpx;
  font-weight: 700;
}

.hero-sub {
  margin-top: 12rpx;
  font-size: 26rpx;
  opacity: 0.9;
}

.hero-actions {
  margin-top: 20rpx;
  display: flex;
  justify-content: center;
}

.btn {
  padding: 14rpx 22rpx;
  border-radius: 999rpx;
}

.card {
  margin: 24rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 24rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.06);
}

.card-title {
  font-size: 28rpx;
  font-weight: 600;
  margin-bottom: 10rpx;
}

.platform-row {
  display: flex;
  gap: 12rpx;
}

.tag {
  padding: 12rpx 16rpx;
  border-radius: 999rpx;
  border: 2rpx solid #e5e7eb;
  color: #374151;
}

.tag.on {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.link-grid {
  display: flex;
  gap: 12rpx;
  flex-wrap: wrap;
}

.link {
  padding: 14rpx 20rpx;
  border-radius: 12rpx;
  background: #f9fafb;
  color: #374151;
  border: 2rpx solid #e5e7eb;
}

.user {
  display: flex;
  align-items: center;
}

.avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 4rpx solid #f3f4f6;
  margin-right: 20rpx;
}

.info .line {
  font-size: 26rpx;
  color: #374151;
  margin-top: 6rpx;
}

.bottom-gap {
  height: 40rpx;
}
</style>
