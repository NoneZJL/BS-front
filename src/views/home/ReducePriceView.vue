<template>
  <div>
    <el-container>
      <el-header class="header">
        <div class="logo-container">
          <img src="../../assets/logo.png" style="width: 50px" alt="logo" />
        </div>
        <div class="center-text">
          <span class="price-compare">Price Compare</span>
        </div>
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 10px; margin-top: 1px; color: white">
              <User />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="jumpHome">个人主页</el-dropdown-item>
                <el-dropdown-item @click="jumpHistory">历史记录</el-dropdown-item>
                <el-dropdown-item @click="confirmLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>{{ username }}</span>
        </div>
      </el-header>
      <el-main>
        <el-button type="info" plain @click="back">返回</el-button>
        <el-row type="flex" justify="center" class="remainder-goods">
          <el-col :span="12">
            <span class="remainder-title">降价提醒</span>
            <el-card v-for="good in remainderGoods" :key="good.id" class="good-item">
              <div class="good-content">
                <span>{{ good.name }}</span>
                <el-button type="danger" plain @click="confirmCancelReminder(good.id)"
                  >取消降价提醒</el-button
                >
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'
import { useUserStore, useQueryStore } from '@/stores/index'

const userStore = useUserStore()
const queryStore = useQueryStore()
const username = ref(userStore.username)

const remainderGoods = ref([
  { id: 1, name: 'good01' },
  { id: 2, name: 'good02' },
  { id: 3, name: 'good03' },
  { id: 4, name: 'good04' },
  { id: 5, name: 'good05' }
])

const confirmLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      userStore.removeToken()
      queryStore.removeQueringName()
      logout()
    })
    .catch(() => {})
}

const logout = () => {
  router.push('/login')
}

const jumpHistory = () => {
  router.push('/history')
}

const back = () => {
  router.push('query')
}

const jumpHome = () => {
  router.push('/home')
}

const confirmCancelReminder = (goodId) => {
  ElMessageBox.confirm('确定要取消降价提醒吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      cancelReminder(goodId)
    })
    .catch(() => {})
}

const cancelReminder = (goodId) => {
  // 在这里添加取消降价提醒的逻辑
  console.log(`取消降价提醒的商品ID: ${goodId}`)
  // 例如，你可以从 remainderGoods 中移除该商品
  remainderGoods.value = remainderGoods.value.filter((good) => good.id !== goodId)
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(37, 33, 33);
  color: white;
  font-size: 12px;
  padding: 0 20px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.center-text {
  flex-grow: 1;
  text-align: center;
}

.price-compare {
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(45deg, #f06, #f90, #ff0, #0f0, #0ff, #00f, #90f, #f06);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient 15s ease infinite;
  font-family: 'Pacifico', cursive;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.remainder-goods {
  margin-top: 20px;
  text-align: center;
}

.remainder-title {
  display: block;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #409eff;
}

.good-item {
  margin-bottom: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.12),
    0 0 6px rgba(0, 0, 0, 0.04);
}

.good-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>
