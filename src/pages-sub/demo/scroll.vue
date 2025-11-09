<script lang="ts" setup>
definePage({
  style: {
    navigationBarTitleText: '上拉刷新和下拉加载更多',
    enablePullDownRefresh: true,
  },
})

const list = ref<string[]>([])
const page = ref(1)
const pageSize = 20
const loading = ref(false)
const hasMore = ref(true)

function genData(p: number) {
  return Array.from({ length: pageSize }).map((_, i) => `示例项 #${(p - 1) * pageSize + i + 1}`)
}

async function fetchList(reset = false) {
  if (loading.value) return
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  if (reset) {
    page.value = 1
    list.value = genData(page.value)
    hasMore.value = true
  }
  else {
    page.value += 1
    list.value.push(...genData(page.value))
    if (page.value >= 5) hasMore.value = false
  }
  loading.value = false
}

onLoad(() => {
  fetchList(true)
})

onPullDownRefresh(async () => {
  await fetchList(true)
  uni.stopPullDownRefresh()
})

onReachBottom(async () => {
  if (hasMore.value) {
    await fetchList(false)
  }
  else {
    uni.showToast({ title: '没有更多了', icon: 'none' })
  }
})
</script>

<template>
  <view class="page">
    <view class="header">分包滚动示例</view>
    <view class="list">
      <view v-for="item in list" :key="item" class="cell">
        {{ item }}
      </view>
      <view class="loading" v-if="loading">加载中...</view>
      <view class="nomore" v-else-if="!hasMore">— 没有更多了 —</view>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background:#fff; }
.header { padding: 24rpx; font-size: 30rpx; font-weight: 600; background: #f9fafb; }
.list { padding: 12rpx 12rpx 24rpx; }
.cell {
  padding: 16rpx 20rpx; background:#fff; border-radius: 12rpx;
  box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.04); margin: 8rpx 0;
}
.loading, .nomore { text-align:center; color:#6b7280; padding: 16rpx 0; }
</style>
