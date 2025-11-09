<script lang="ts" setup>
import type { IFooItem } from '@/api/foo'
import { getFooAPI } from '@/api/foo'

definePage({
  style: {
    navigationBarTitleText: '分包页面',
  },
})

const loading = ref(false)
const error = ref<string | null>(null)
const data = ref<IFooItem | null>(null)

async function run() {
  loading.value = true
  error.value = null
  data.value = null
  try {
    const res = await getFooAPI('demo')
    data.value = res
  }
  catch (e) {
    error.value = e instanceof Error ? e.message : '未知错误'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <view class="page">
    <view class="hero">
      <view class="title">分包示例</view>
      <view class="sub">演示分包页面与简单请求</view>
    </view>

    <view class="card">
      <view class="card-title">请求示例</view>
      <view class="card-desc">点击下方按钮发送请求，查看返回数据。</view>
      <button type="primary" class="btn" @click="run">发送请求</button>

      <view class="result">
        <view v-if="loading">loading...</view>
        <view v-else-if="error" class="error">错误：{{ error }}</view>
        <view v-else-if="data" class="json">{{ JSON.stringify(data, null, 2) }}</view>
        <view v-else class="muted">暂无数据</view>
      </view>
    </view>

    <view class="bottom-gap" />
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: linear-gradient(180deg,#f8fafc 0%,#fff 100%); }
.hero { padding: 40rpx 32rpx 24rpx; text-align: center; }
.title { font-size: 40rpx; font-weight: 700; }
.sub { margin-top: 8rpx; color: #6b7280; }

.card { margin: 24rpx; background:#fff; border-radius: 20rpx; padding: 24rpx; box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.06); }
.card-title { font-size: 28rpx; font-weight: 600; }
.card-desc { margin: 8rpx 0 16rpx; color:#6b7280; }
.btn { border-radius: 999rpx; padding: 14rpx 22rpx; }

.result { margin-top: 16rpx; }
.error { color: #ef4444; }
.json { font-size: 22rpx; word-break: break-all; background:#f9fafb; border-radius: 12rpx; padding: 16rpx; }
.muted { color:#6b7280; }
.bottom-gap { height: 40rpx; }
</style>
