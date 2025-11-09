<script lang="ts" setup>
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'
import { tabbarList } from '@/tabbar/config'
import { isPageTabbar } from '@/tabbar/store'
import { ensureDecodeURIComponent, parseUrlToObj } from '@/utils'

definePage({
  style: {
    navigationBarTitleText: '登录',
  },
})

const redirectUrl = ref('')
onLoad((options) => {
  redirectUrl.value = options?.redirect ? ensureDecodeURIComponent(options.redirect) : tabbarList[0].pagePath
})

const userStore = useUserStore()
const tokenStore = useTokenStore()

const form = reactive({ username: '', password: '' })
const showPwd = ref(false)

async function doLogin() {
  if (tokenStore.hasLogin) {
    uni.navigateBack()
    return
  }
  try {
    await tokenStore.login({
      username: form.username || 'demo',
      password: form.password || '123456',
    })
    await userStore.fetchUserInfo?.()
    uni.showToast({ title: '登录成功', icon: 'success' })
  }
  catch (error) {
    uni.showToast({ title: '登录失败', icon: 'none' })
    console.log(error)
    return
  }
  const path = redirectUrl.value.startsWith('/') ? redirectUrl.value : `/${redirectUrl.value}`
  const { path: _path } = parseUrlToObj(path)
  if (isPageTabbar(_path)) {
    uni.switchTab({ url: path })
  }
  else {
    uni.redirectTo({ url: path })
  }
}
</script>

<template>
  <view class="page">
    <view class="card">
      <view class="title">
        欢迎回来
      </view>
      <view class="sub">
        请输入账号与密码
      </view>

      <view class="form-row">
        <input v-model="form.username" class="input" placeholder="账号 / 邮箱 / 手机号">
      </view>
      <view class="form-row">
        <input v-model="form.password" :password="!showPwd" class="input" placeholder="密码">
        <view class="toggle" @click="showPwd = !showPwd">
          {{ showPwd ? '隐藏' : '显示' }}
        </view>
      </view>

      <button type="primary" class="btn" @click="doLogin">
        登录
      </button>

      <view class="help">
        <text>忘记密码</text>
        <text class="split">·</text>
        <navigator url="/pages-fg/login/register" open-type="navigate">
          注册
        </navigator>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #fff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  width: 88%;
  max-width: 640rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 28rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.06);
}
.title {
  font-size: 36rpx;
  font-weight: 700;
}
.sub {
  margin-top: 6rpx;
  color: #6b7280;
}
.form-row {
  margin-top: 16rpx;
  position: relative;
}
.input {
  height: 80rpx;
  border: 2rpx solid #e5e7eb;
  border-radius: 12rpx;
  padding: 0 18rpx;
}
.toggle {
  position: absolute;
  right: 18rpx;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
}
.btn {
  margin-top: 16rpx;
  padding: 14rpx 22rpx;
  border-radius: 999rpx;
}
.help {
  margin-top: 12rpx;
  color: #6b7280;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10rpx;
}
.split {
  color: #d1d5db;
}
</style>
