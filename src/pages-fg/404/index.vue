<script lang="ts" setup>
import { HOME_PAGE } from '@/utils'

definePage({
  style: {
    navigationBarTitleText: '页面不存在',
  },
})
function goHome() {
  if (HOME_PAGE) {
    if (HOME_PAGE.includes('/pages/index'))
      uni.switchTab({ url: HOME_PAGE })
    else uni.navigateTo({ url: HOME_PAGE })
  }
}
</script>

<template>
  <view class="page">
    <view class="container">
      <view class="code">
        404
      </view>
      <view class="msg">
        啊哦，页面走丢了
      </view>
      <view class="sub">
        请检查路由地址是否正确，或返回首页
      </view>
      <button type="primary" class="btn" @click="goHome">
        返回首页
      </button>
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
.container {
  text-align: center;
  padding: 40rpx 32rpx;
}
.code {
  font-size: 80rpx;
  font-weight: 800;
  color: #111827;
  letter-spacing: 4rpx;
}
.msg {
  margin-top: 8rpx;
  font-size: 30rpx;
  font-weight: 600;
}
.sub {
  margin-top: 6rpx;
  color: #6b7280;
}
.btn {
  margin-top: 20rpx;
  padding: 14rpx 22rpx;
  border-radius: 999rpx;
}
</style>
