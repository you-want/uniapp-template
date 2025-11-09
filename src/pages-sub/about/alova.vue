<script lang="ts" setup>
import { API_DOMAINS, http } from '@/http/alova'

definePage({
  style: {
    navigationBarTitleText: 'Alova 演示',
  },
})

interface Foo { id: number, name: string }
const loading = ref(false)
const error = ref<string | null>(null)
const data = ref<Foo | null>(null)

async function run() {
  loading.value = true
  error.value = null
  data.value = null
  try {
    const res = await http.Get<Foo>('/foo', {
      params: { name: 'demo', page: 1, pageSize: 10 },
      meta: { domain: API_DOMAINS.SECONDARY },
    })
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
    <view class="card">
      <view class="title">
        Alova 请求示例
      </view>
      <view class="desc">
        演示通过 Alova 的 http.Get 发送请求，并展示响应。
      </view>
      <button type="primary" class="btn" @click="run">
        发送请求
      </button>

      <view class="result">
        <view v-if="loading">
          loading...
        </view>
        <view v-else-if="error" class="error">
          错误：{{ error }}
        </view>
        <view v-else-if="data" class="json">
          {{ JSON.stringify(data, null, 2) }}
        </view>
        <view v-else class="muted">
          暂无数据
        </view>
      </view>
    </view>
    <view class="bottom-gap" />
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f8fafc;
  padding: 24rpx;
}
.card {
  background: #fff;
  border-radius: 20rpx;
  padding: 24rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.06);
}
.title {
  font-size: 32rpx;
  font-weight: 600;
}
.desc {
  margin: 8rpx 0 18rpx;
  color: #6b7280;
}
.btn {
  margin-top: 6rpx;
  border-radius: 999rpx;
  padding: 14rpx 22rpx;
}
.result {
  margin-top: 20rpx;
}
.error {
  color: #ef4444;
}
.json {
  font-size: 22rpx;
  word-break: break-all;
  background: #f9fafb;
  border-radius: 12rpx;
  padding: 16rpx;
}
.muted {
  color: #6b7280;
}
.bottom-gap {
  height: 40rpx;
}
</style>
