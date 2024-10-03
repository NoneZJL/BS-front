<template>
  <div class="common-layout">
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
        <div class="search-container">
          <div class="search">
            <el-input v-model="search" placeholder="请输入您想要搜索的商品">
              <template #suffix>
                <el-icon class="el-input__icon" @click="handleSearch">
                  <Search />
                </el-icon>
              </template>
            </el-input>
          </div>
        </div>
        <div class="search-website">
          <el-tabs v-model="activeWebsite" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane name="jd">
              <template #label>
                <el-icon><Shop /></el-icon>
                <span style="margin-left: 5px">京东</span>
              </template>
            </el-tab-pane>
            <el-tab-pane name="tb">
              <template #label>
                <el-icon><Shop /></el-icon>
                <span style="margin-left: 5px">淘宝</span>
              </template>
            </el-tab-pane>
            <el-tab-pane name="pdd">
              <template #label>
                <el-icon><Shop /></el-icon>
                <span style="margin-left: 5px">拼多多</span>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="search-content">
          <el-row :gutter="20">
            <el-col
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
              :xl="4"
              v-for="(item, index) in products"
              :key="index"
            >
              <el-card :body-style="{ padding: '0px' }" class="product-card">
                <img :src="item.image" class="image" />
                <div style="padding: 14px">
                  <span>{{ item.name }}</span>
                  <div class="bottom">
                    <span class="price">¥{{ item.price }}</span>
                    <el-button type="text" class="button">查看详情</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router/index'

const username = ref('username')
const search = ref('')

const activeWebsite = ref('jd')

const products = ref([
  { name: '商品1', price: 100, image: 'https://via.placeholder.com/150' },
  { name: '商品2', price: 200, image: 'https://via.placeholder.com/150' },
  { name: '商品3', price: 300, image: 'https://via.placeholder.com/150' },
  { name: '商品4', price: 400, image: 'https://via.placeholder.com/150' },
  { name: '商品5', price: 500, image: 'https://via.placeholder.com/150' },
  { name: '商品6', price: 600, image: 'https://via.placeholder.com/150' },
  { name: '商品7', price: 700, image: 'https://via.placeholder.com/150' },
  { name: '商品8', price: 800, image: 'https://via.placeholder.com/150' }
])

const jumpHome = () => {
  router.push('/home')
}

const confirmLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      logout()
    })
    .catch(() => {})
}

const logout = () => {
  router.push('/login')
}

const handleSearch = () => {
  console.log('搜索内容:', search.value)
  // 在这里添加你的搜索逻辑
}

const handleClick = (tab) => {
  console.log('切换后的 activeWebsite 值:', tab.props.name)
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

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.search {
  width: 50vw;
}

.el-input__icon {
  cursor: pointer;
}

.search-website {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.demo-tabs {
  width: 50%;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.search-content {
  margin-top: 20px;
}

.product-card {
  width: 100%;
  margin-bottom: 20px;
}

.image {
  width: 100%;
  display: block;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 18px;
  color: #f56c6c;
}

.button {
  padding: 0;
  min-height: auto;
}
</style>
