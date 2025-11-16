<script setup lang="ts">
import { t } from '@/locale'
import { useTokenStore, useUserStore } from '@/store'
import { HOME_PAGE } from '@/utils'

defineOptions({ name: 'Login' })
definePage({
  type: 'home',
  // 标题使用 i18n key（%xxx% 模式），配合 layouts/default.vue 的标题设置
  style: {
    navigationBarTitleText: '%login.title%',
    navigationStyle: 'custom',
  },
  // 登录页应作为“排除登录拦截”的白名单页面
  excludeLoginPath: true,
})

// 避免顶层直接调用 store，改为在函数内部调用

function enterHome() {
  // 根据项目 tabbar 策略选择跳转方式，这里优先 switchTab
  uni.switchTab({ url: HOME_PAGE })
}

function setAuthAndEnterHome(displayName: string, tokenLabel: string) {
  // 写入一个“单 Token”示例，过期时间设为 24h（86400 秒）
  const tokenStore = useTokenStore()
  const userStore = useUserStore()
  tokenStore.setTokenInfo({ token: `${tokenLabel}-token`, expiresIn: 86400 })
  userStore.setUserInfo({
    userId: Math.floor(Math.random() * 100000),
    username: displayName,
    nickname: displayName,
    avatar: '/static/images/default-avatar.png',
  })
  uni.showToast({ title: t('login.success'), icon: 'success' })
  enterHome()
}

function loginApple() {
  // #ifdef APP-PLUS
  // 使用 5+ OAuth
  // 声明 plus（避免 TS 报错）
  const plusAny: any = (globalThis as any).plus
  if (!plusAny || !plusAny.oauth) {
    uni.showToast({ title: t('login.apple.unavailable'), icon: 'none' })
    return
  }
  plusAny.oauth.getServices((services: any[]) => {
    const service = services.find(s => s.id === 'apple')
    if (!service) {
      uni.showToast({ title: t('login.apple.unavailable'), icon: 'none' })
      return
    }
    service.login(
      (res: any) => {
        const nick = res?.userInfo?.email || res?.userInfo?.displayName || 'AppleUser'
        setAuthAndEnterHome(nick, 'apple')
      },
      (err: any) => {
        console.error('Apple 登录失败', err)
        uni.showToast({ title: t('login.apple.failed'), icon: 'error' })
      },
    )
  }, (err: any) => {
    console.error('OAuth 服务获取失败', err)
    uni.showToast({ title: t('login.apple.failed'), icon: 'error' })
  })
  // #endif

  // #ifndef APP-PLUS
  uni.showToast({ title: t('login.apple.unavailable'), icon: 'none' })
  // #endif
}

function loginGoogle() {
  // #ifdef APP-PLUS
  const plusAny: any = (globalThis as any).plus
  if (!plusAny || !plusAny.oauth) {
    uni.showToast({ title: t('login.google.unavailable'), icon: 'none' })
    return
  }
  plusAny.oauth.getServices((services: any[]) => {
    const service = services.find(s => s.id === 'google')
    if (!service) {
      uni.showToast({ title: t('login.google.unavailable'), icon: 'none' })
      return
    }
    service.login(
      (res: any) => {
        const nick = res?.userInfo?.email || res?.userInfo?.displayName || 'GoogleUser'
        setAuthAndEnterHome(nick, 'google')
      },
      (err: any) => {
        console.error('Google 登录失败', err)
        uni.showToast({ title: t('login.google.failed'), icon: 'error' })
      },
    )
  }, (err: any) => {
    console.error('OAuth 服务获取失败', err)
    uni.showToast({ title: t('login.google.failed'), icon: 'error' })
  })
  // #endif

  // #ifndef APP-PLUS
  uni.showToast({ title: t('login.google.unavailable'), icon: 'none' })
  // #endif
}

function loginGuest() {
  setAuthAndEnterHome('Guest', 'guest')
}
</script>

<template>
  <view class="page">
    <view class="hero">
      <image class="hero-img" src="/static/images/login-hero.png" mode="widthFix" />
    </view>

    <view class="content">
      <view class="title">
        {{ t('login.title') }}
      </view>
      <view class="subtitle">
        {{ t('login.subtitle') }}
      </view>

      <view class="btns">
        <button class="btn btn-apple" @click="loginApple">
          <view class="logo">
            
          </view>
          <view class="text">
            {{ t('login.apple') }}
          </view>
        </button>
        <button class="btn btn-google" @click="loginGoogle">
          <view class="logo">
            G
          </view>
          <view class="text">
            {{ t('login.google') }}
          </view>
        </button>
        <button class="btn btn-guest" @click="loginGuest">
          <view class="text">
            {{ t('login.guest') }}
          </view>
        </button>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(180deg, #e8fff2 0%, #f7fffb 100%);
}

.nav {
  height: 88rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero {
  display: flex;
  justify-content: center;
  padding: 24rpx 24rpx 0;
}
.hero-img {
  width: 680rpx;
  border-radius: 24rpx;
}

.content {
  padding: 24rpx;
  text-align: center;
}
.title {
  font-size: 48rpx;
  font-weight: 700;
  color: #2aa26f;
}
.subtitle {
  margin-top: 12rpx;
  font-size: 26rpx;
  color: #7c8b8a;
}

.btns {
  margin-top: 36rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.btn {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999rpx;
  font-size: 28rpx;
}
.btn .logo {
  width: 36rpx;
  height: 36rpx;
  margin-right: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
.btn-apple {
  background: #ffffff;
  color: #141414;
}
.btn-google {
  background: #ffffff;
  color: #141414;
}
.btn-guest {
  background: #e3ebe9;
  color: #4b5b59;
}
</style>
