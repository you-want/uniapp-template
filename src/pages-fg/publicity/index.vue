<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@/locale'
import { HOME_PAGE } from '@/utils'

defineOptions({ name: 'Publicity' })
definePage({
  // 移除 type，按普通页面注册，避免类型不匹配
  style: {
    navigationBarTitleText: '%guide.title%',
    navigationStyle: 'custom',
  },
  excludeLoginPath: true,
})

const total = 4
const current = ref<number>(0)
const swiperList = [
  '/static/images/publicity/1.png',
  '/static/images/publicity/2.png',
  '/static/images/publicity/3.png',
  '/static/images/publicity/4.png',
]

function next() {
  if (current.value < total - 1) {
    current.value += 1
  }
  else {
    finish()
  }
}

function finish() {
  try {
    uni.setStorageSync('ONBOARDING_COMPLETED', true)
  }
  catch (e) {}
  // 进入主页面
  uni.switchTab({ url: HOME_PAGE })
}

function skip() {
  finish()
}

function handleChange(e: any) {
  const idx = typeof e === 'number' ? e : (e?.detail?.current ?? e?.current ?? current.value)
  current.value = Number(idx) || 0
}
</script>

<template>
  <view class="page">
    <!-- 顶部跳过 -->
    <view class="skip" @click="skip">
      {{ t('guide.skip') }}
    </view>

    <!-- 宣传插图轮播（Wot UI） -->
    <wd-swiper
      v-model:current="current"
      class="swiper"
      :list="swiperList"
      :autoplay="false"
      :loop="false"
      :indicator="false"
      @change="handleChange"
    />

    <!-- 底部操作区 -->
    <view class="bottom">
      <view class="indicator">
        {{ current + 1 }}/{{ total }}
      </view>
      <view class="dots">
        <view v-for="(n, i) in total" :key="i" class="dot" :class="{ active: i === current }" />
      </view>
      <button class="btn-continue" type="primary" @click="next">
        {{ t('guide.continue') }}
      </button>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #efd8b0; /* 贴近设计图背景色 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.skip {
  position: absolute;
  top: 24rpx;
  left: 24rpx;
  z-index: 2;
  color: #2aa26f;
  font-size: 28rpx;
}

.swiper {
  flex: 1;
  width: 100%;
  --wot-swiper-height: 70vh; /* 控制组件高度，确保视觉比例一致 */
}

/* 使用 wd-swiper 默认渲染图片，若需卡片样式可自定义 class 参照文档 */

.bottom {
  padding: 24rpx 32rpx 48rpx;
}

.indicator {
  text-align: center;
  color: #4b5b59;
  font-size: 26rpx;
}

.dots {
  margin: 16rpx 0 24rpx;
  display: flex;
  justify-content: center;
  gap: 12rpx;
}

.dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #bcdacb;
}
.dot.active {
  background: #2aa26f;
}

.btn-continue {
  height: 88rpx;
  border-radius: 999rpx;
  background: #20b27f;
  color: #fff;
  font-size: 30rpx;
}
</style>
