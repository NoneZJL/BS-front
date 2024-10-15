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
                <el-dropdown-item @click="jumpHistory">历史记录</el-dropdown-item>
                <el-dropdown-item @click="jumpRemainder">降价提醒</el-dropdown-item>
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
        <div class="now-searching-container">
          <span v-if="nowSearching">当前查询的内容为：{{ nowSearching }}</span>
          <span v-else>当前暂未进行查询</span>
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
            <el-tab-pane name="priceHistory">
              <template #label>
                <el-icon><Calendar /></el-icon>
                <span style="margin-left: 5px">价格历史</span>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="search-content" v-if="activeWebsite !== 'priceHistory'">
          <el-row :gutter="20">
            <el-col
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
              :xl="4"
              v-for="(item, index) in currentProducts"
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
        <div class="search-content" v-if="activeWebsite === 'priceHistory'">
          <div id="priceHistoryChart" style="width: 100%; height: 400px"></div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import router from '@/router/index'
import { useUserStore, useQueryStore } from '@/stores/index'
import * as echarts from 'echarts'
import { queryGoodService } from '@/api/query'

const username = ref('username')
const search = ref('')
const nowSearching = ref('')
const userStore = useUserStore()
const queryStore = useQueryStore()
const activeWebsite = ref('jd')

onMounted(() => {
  username.value = userStore.username
  if (!queryStore.isQueryingNameEmpty()) {
    nowSearching.value = queryStore.queryingName
  }
})

const jdProducts = ref([
  { name: '京东1', price: 100, image: 'https://via.placeholder.com/150', content: '这是物品见解' },
  { name: '京东2', price: 200, image: 'https://via.placeholder.com/150', content: '这是物品见解' },
  { name: '京东3', price: 300, image: 'https://via.placeholder.com/150', content: '这是物品见解' },
  { name: '京东4', price: 400, image: 'https://via.placeholder.com/150', content: '这是物品见解' },
  { name: '京东5', price: 500, image: 'https://via.placeholder.com/150', content: '这是物品见解' },
  { name: '京东6', price: 600, image: 'https://via.placeholder.com/150', content: '这是物品见解' },
  { name: '京东7', price: 700, image: 'https://via.placeholder.com/150', content: '这是物品见解' },
  { name: '京东8', price: 800, image: 'https://via.placeholder.com/150', content: '这是物品见解' }
])

const tbProducts = ref([
  { name: '淘宝1', price: 100, image: 'https://via.placeholder.com/150', content: '这是物品见解' },
  { name: '淘宝2', price: 200, image: 'https://via.placeholder.com/150', content: '这是物品见解' },
  { name: '淘宝3', price: 300, image: 'https://via.placeholder.com/150', content: '这是物品见解' },
  { name: '淘宝4', price: 400, image: 'https://via.placeholder.com/150', content: '这是物品见解' },
  { name: '淘宝5', price: 500, image: 'https://via.placeholder.com/150', content: '这是物品见解' },
  { name: '淘宝6', price: 600, image: 'https://via.placeholder.com/150', content: '这是物品见解' },
  { name: '淘宝7', price: 700, image: 'https://via.placeholder.com/150', content: '这是物品见解' },
  { name: '淘宝8', price: 800, image: 'https://via.placeholder.com/150', content: '这是物品见解' }
])

const pddProducts = ref([
  {
    name: '拼多多1',
    price: 100,
    image: 'https://via.placeholder.com/150',
    content: '这是物品见解'
  },
  {
    name: '拼多多2',
    price: 200,
    image: 'https://via.placeholder.com/150',
    content: '这是物品见解'
  },
  {
    name: '拼多多3',
    price: 300,
    image: 'https://via.placeholder.com/150',
    content: '这是物品见解'
  },
  {
    name: '拼多多4',
    price: 400,
    image: 'https://via.placeholder.com/150',
    content: '这是物品见解'
  },
  {
    name: '拼多多5',
    price: 500,
    image: 'https://via.placeholder.com/150',
    content: '这是物品见解'
  },
  {
    name: '拼多多6',
    price: 600,
    image: 'https://via.placeholder.com/150',
    content: '这是物品见解'
  },
  {
    name: '拼多多7',
    price: 700,
    image: 'https://via.placeholder.com/150',
    content: '这是物品见解'
  },
  { name: '拼多多8', price: 800, image: 'https://via.placeholder.com/150', content: '这是物品见解' }
])

const priceHistoryOfJD = ref([
  { name: 'good', date: '2024-7-1', price: '55.60' },
  { name: 'good', date: '2024-7-2', price: '55.80' },
  { name: 'good', date: '2024-7-3', price: '57.20' },
  { name: 'good', date: '2024-7-4', price: '58.90' },
  { name: 'good', date: '2024-7-5', price: '54.60' },
  { name: 'good', date: '2024-7-6', price: '57.60' },
  { name: 'good', date: '2024-7-7', price: '57.60' },
  { name: 'good', date: '2024-7-8', price: '57.60' },
  { name: 'good', date: '2024-7-9', price: '59.20' },
  { name: 'good', date: '2024-7-10', price: '53.20' }
])
const priceHistoryOfTB = ref([
  { name: 'good', date: '2024-7-1', price: '45.60' },
  { name: 'good', date: '2024-7-2', price: '45.80' },
  { name: 'good', date: '2024-7-3', price: '44.20' },
  { name: 'good', date: '2024-7-4', price: '48.90' },
  { name: 'good', date: '2024-7-5', price: '47.80' },
  { name: 'good', date: '2024-7-6', price: '47.60' },
  { name: 'good', date: '2024-7-7', price: '45.30' },
  { name: 'good', date: '2024-7-8', price: '47.60' },
  { name: 'good', date: '2024-7-9', price: '49.20' },
  { name: 'good', date: '2024-7-10', price: '43.20' }
])
const priceHistoryOfPDD = ref([
  { name: 'good', date: '2024-7-1', price: '39.60' },
  { name: 'good', date: '2024-7-2', price: '39.80' },
  { name: 'good', date: '2024-7-3', price: '39.20' },
  { name: 'good', date: '2024-7-4', price: '39.90' },
  { name: 'good', date: '2024-7-5', price: '39.60' },
  { name: 'good', date: '2024-7-6', price: '39.60' },
  { name: 'good', date: '2024-7-7', price: '39.60' },
  { name: 'good', date: '2024-7-8', price: '39.60' },
  { name: 'good', date: '2024-7-9', price: '39.20' },
  { name: 'good', date: '2024-7-10', price: '40.20' }
])

const currentProducts = computed(() => {
  switch (activeWebsite.value) {
    case 'jd':
      return jdProducts.value
    case 'tb':
      return tbProducts.value
    case 'pdd':
      return pddProducts.value
    default:
      return []
  }
})

const jumpHome = () => {
  router.push('/home')
}

const jumpHistory = () => {
  router.push('/history')
}

const jumpRemainder = () => {
  router.push('/remainder')
}

const confirmLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      userStore.removeToken()
      userStore.removeUsername()
      queryStore.removeQueringName()
      logout()
    })
    .catch(() => {})
}

const logout = () => {
  router.push('/login')
}

const handleSearch = async () => {
  // 去除输入内容两侧的空格
  const trimmedSearch = search.value.trim()
  // 判断输入内容是否为空
  if (!trimmedSearch) {
    ElMessage.error('搜索内容不能为空')
    return
  }
  queryStore.setQueryingName(trimmedSearch)
  const res = await queryGoodService(trimmedSearch)
  if (res.data.code === 2) {
    router.push('/login')
    return
  }
  if (res.data.code === 1) {
    ElMessage.error(res.data.err)
    return
  }
  ElMessage.success('搜索成功')
  // 在这里添加你的搜索逻辑
}

const handleClick = (tab) => {
  console.log('切换后的 activeWebsite 值:', tab.props.name)
  if (tab.props.name === 'priceHistory') {
    nextTick(() => {
      setTimeout(() => {
        initChart()
      }, 100)
    })
  }
}

const initChart = () => {
  const chartDom = document.getElementById('priceHistoryChart')
  if (!chartDom) return

  const myChart = echarts.init(chartDom)

  const option = {
    title: {
      text: '价格历史'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['京东', '淘宝', '拼多多']
    },
    xAxis: {
      type: 'category',
      data: priceHistoryOfJD.value.map((item) => item.date)
    },
    yAxis: {
      type: 'value',
      name: '价格'
    },
    series: [
      {
        name: '京东',
        type: 'line',
        data: priceHistoryOfJD.value.map((item) => parseFloat(item.price))
      },
      {
        name: '淘宝',
        type: 'line',
        data: priceHistoryOfTB.value.map((item) => parseFloat(item.price))
      },
      {
        name: '拼多多',
        type: 'line',
        data: priceHistoryOfPDD.value.map((item) => parseFloat(item.price))
      }
    ]
  }

  myChart.setOption(option)
}
</script>

<style scoped>
.now-searching-container {
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
}

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

.content {
  margin-top: 10px;
  font-size: 14px;
  color: #606266;
}
</style>
