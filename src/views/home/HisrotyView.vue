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
                <el-dropdown-item @click="confirmLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>{{ username }}</span>
        </div>
      </el-header>
      <el-main>
        <el-button type="info" plain @click="back">返回</el-button>
        <div class="history-container">
          <el-card class="history-card">
            <div class="history-title">历史记录</div>
            <el-scrollbar height="400px">
              <ul class="history-list">
                <li
                  v-for="(item, index) in history"
                  :key="index"
                  @click="handleHistoryClick(item)"
                  class="history-item"
                >
                  {{ item }}
                </li>
              </ul>
            </el-scrollbar>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/index'

const username = ref('Tom')
const history = ref([
  'history1',
  'history2',
  'history3',
  'history4',
  'history5',
  'history6',
  'history7',
  'history8',
  'history9'
])
const userStore = useUserStore()

onMounted(() => {
  username.value = userStore.username
})

const jumpHome = () => {
  router.push('/home')
}

const logout = () => {
  router.push('/login')
}

const back = () => {
  router.push('query')
}

const confirmLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      userStore.removeToken()
      logout()
    })
    .catch(() => {})
}

const handleHistoryClick = (item) => {
  console.log('点击了历史记录:', item)
  // 在这里添加你的点击历史记录后的逻辑
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

.history-container {
  margin-top: 20px;
}

.history-card {
  width: 50%;
  margin: 0 auto;
}

.history-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
}

.history-list {
  list-style-type: none;
  padding: 0;
}

.history-item {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.history-item:hover {
  background-color: #f5f5f5;
}
</style>
