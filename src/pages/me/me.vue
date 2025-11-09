<script lang="ts" setup>
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'

defineOptions({ name: 'Me' })
definePage({
  style: {
    navigationBarTitleText: '个人中心',
  },
})

const tokenStore = useTokenStore()
const userStore = useUserStore()

const editingNickname = ref('')
const isEditing = ref(false)

onShow(() => {
  // 展示时确保用户信息可用；如有需要可主动拉取
  if (tokenStore.hasLogin && userStore.userInfo.userId === -1) {
    userStore.fetchUserInfo?.()
  }
})

async function handleLogin() {
  try {
    await tokenStore.login({ username: 'demo', password: '123456' })
    await userStore.fetchUserInfo?.()
    uni.showToast({ title: '登录成功', icon: 'success' })
  }
  catch (err) {
    uni.showToast({ title: '登录失败', icon: 'none' })
    console.log(err)
  }
}

async function handleLogout() {
  await tokenStore.logout()
  uni.showToast({ title: '已退出登录', icon: 'success' })
}

function startEdit() {
  editingNickname.value = userStore.userInfo.nickname || ''
  isEditing.value = true
}
function saveEdit() {
  userStore.setUserInfo({
    ...userStore.userInfo,
    nickname: editingNickname.value,
  })
  isEditing.value = false
  uni.showToast({ title: '昵称已更新', icon: 'success' })
}

function changeAvatar() {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const filePath = (res.tempFiles && res.tempFiles[0]?.path) || res.tempFilePaths?.[0]
      if (!filePath) {
        uni.showToast({ title: '选择图片失败', icon: 'none' })
        return
      }
      userStore.setUserAvatar(filePath)
      uni.showToast({ title: '头像已更新', icon: 'success' })
    },
    fail: () => uni.showToast({ title: '选择图片失败', icon: 'none' }),
  })
}
</script>

<template>
  <view class="page">
    <!-- 顶部背景 -->
    <view class="header">
      <view class="header-content">
        <view class="title">个人中心</view>
        <view class="subtitle">管理个人资料与登录状态</view>
      </view>
    </view>

    <!-- Profile Card -->
    <view class="card profile-card">
      <view class="profile">
        <image
          :src="userStore.userInfo.avatar || '/static/images/default-avatar.png'"
          class="avatar"
          mode="aspectFill"
        />
        <view class="info">
          <view class="name">
            {{ userStore.userInfo.nickname || userStore.userInfo.username || '未设置昵称' }}
          </view>
          <view class="uid">ID: {{ userStore.userInfo.userId === -1 ? '未登录' : userStore.userInfo.userId }}</view>
        </view>
      </view>

      <view class="actions">
        <button class="btn" type="primary" @click="changeAvatar">更换头像</button>
        <button class="btn ml-2" type="default" @click="startEdit">编辑昵称</button>
        <button v-if="tokenStore.hasLogin" class="btn ml-2" type="warn" @click="handleLogout">退出登录</button>
        <button v-else class="btn ml-2" type="primary" @click="handleLogin">登录</button>
      </view>

      <view v-if="isEditing" class="edit-row">
        <input v-model="editingNickname" class="edit-input" placeholder="输入新昵称" />
        <button class="btn ml-2" type="primary" size="mini" @click="saveEdit">保存</button>
      </view>
    </view>

    <!-- 快捷入口 -->
    <view class="card">
      <view class="card-title">快捷入口</view>
      <view class="quick-grid">
        <view class="quick-item">
          <view class="qi-icon">📦</view>
          <view class="qi-title">我的订单</view>
        </view>
        <view class="quick-item">
          <view class="qi-icon">⭐</view>
          <view class="qi-title">我的收藏</view>
        </view>
        <view class="quick-item">
          <view class="qi-icon">⚙️</view>
          <view class="qi-title">设置</view>
        </view>
        <view class="quick-item">
          <view class="qi-icon">❓</view>
          <view class="qi-title">帮助中心</view>
        </view>
      </view>
    </view>

    <!-- 用户数据预览 -->
    <view class="card">
      <view class="card-title">用户数据</view>
      <view class="json">
        {{ JSON.stringify(userStore.userInfo, null, 2) }}
      </view>
    </view>

    <view class="bottom-gap" />
  </view>
</template>

<style scoped>
.page {
  background: linear-gradient(180deg, #f8fafc 0%, #fff 100%);
  min-height: 100vh;
}

/* Header */
.header {
  background: linear-gradient(120deg, #93c5fd 0%, #60a5fa 50%, #34d399 100%);
  border-bottom-left-radius: 24rpx;
  border-bottom-right-radius: 24rpx;
  padding: 40rpx 32rpx 56rpx;
  color: #fff;
}
.header-content {
  max-width: 1000rpx;
  margin: 0 auto;
  text-align: center;
}
.title {
  font-size: 40rpx;
  font-weight: 700;
}
.subtitle {
  margin-top: 14rpx;
  font-size: 26rpx;
  opacity: 0.9;
}

/* Card */
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
  margin-bottom: 16rpx;
}

/* Profile */
.profile {
  display: flex;
  align-items: center;
}
.avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 4rpx solid #f3f4f6;
  margin-right: 24rpx;
}
.info .name {
  font-size: 30rpx;
  font-weight: 600;
}
.info .uid {
  margin-top: 6rpx;
  font-size: 24rpx;
  color: #6b7280;
}

.actions {
  margin-top: 18rpx;
  display: flex;
}
.btn {
  padding: 12rpx 20rpx;
  border-radius: 999rpx;
}

/* Nickname edit */
.edit-row {
  margin-top: 16rpx;
  display: flex;
  align-items: center;
}
.edit-input {
  flex: 1;
  height: 72rpx;
  border: 2rpx solid #e5e7eb;
  border-radius: 12rpx;
  padding: 0 18rpx;
}

/* Quick grid */
.quick-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}
.quick-item {
  flex: 1 1 300rpx;
  min-width: 300rpx;
  background: #f9fafb;
  border-radius: 16rpx;
  padding: 18rpx;
  display: flex;
  align-items: center;
}
.qi-icon {
  font-size: 36rpx;
  margin-right: 12rpx;
}
.qi-title {
  font-size: 26rpx;
  color: #374151;
}

/* JSON preview */
.json {
  font-size: 22rpx;
  word-break: break-all;
  color: #374151;
  background: #f9fafb;
  border-radius: 12rpx;
  padding: 16rpx;
}

.bottom-gap {
  height: 40rpx;
}
</style>
