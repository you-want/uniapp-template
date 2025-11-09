<script lang="ts" setup>
definePage({
  style: {
    navigationBarTitleText: '注册',
  },
})

const form = reactive({ username: '', password: '', confirm: '' })
const showPwd = ref(false)

function submit() {
  if (!form.username || !form.password || !form.confirm) {
    uni.showToast({ title: '请完整填写信息', icon: 'none' })
    return
  }
  if (form.password !== form.confirm) {
    uni.showToast({ title: '两次输入的密码不一致', icon: 'none' })
    return
  }
  uni.showToast({ title: '注册成功（示例）', icon: 'success' })
  setTimeout(() => uni.navigateBack(), 800)
}
</script>

<template>
  <view class="page">
    <view class="card">
      <view class="title">
        创建账号
      </view>
      <view class="sub">
        请填写注册信息
      </view>

      <view class="form-row">
        <input v-model="form.username" class="input" placeholder="账号 / 邮箱 / 手机号">
      </view>
      <view class="form-row">
        <input v-model="form.password" :password="!showPwd" class="input" placeholder="密码">
      </view>
      <view class="form-row">
        <input v-model="form.confirm" :password="!showPwd" class="input" placeholder="再次输入密码">
        <view class="toggle" @click="showPwd = !showPwd">
          {{ showPwd ? '隐藏' : '显示' }}
        </view>
      </view>

      <button type="primary" class="btn" @click="submit">
        注册
      </button>

      <view class="help">
        <navigator url="/pages-fg/login/login" open-type="navigate">
          已有账号？去登录
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
  text-align: center;
}
</style>
