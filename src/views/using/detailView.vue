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
          </el-dropdown>
          <span>{{ username }}</span>
        </div>
      </el-header>
      <el-main>
        <el-button type="info" plain @click="back">返回</el-button>
        <el-card class="product-card">
          <el-row :gutter="20">
            <el-col :span="8">
              <img :src="product.image" class="product-image" alt="Product Image" />
            </el-col>
            <el-col :span="16">
              <div class="product-details">
                <h2 class="product-title">{{ product.description }}</h2>
                <p class="product-price">价格: ￥{{ product.price }}</p>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <div class="search-content">
          <div id="priceHistoryChart" style="width: 100%; height: 400px"></div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref, onMounted } from 'vue'
import { useUserStore, useDetailStore } from '@/stores/index'
import * as echarts from 'echarts'

const userStore = useUserStore()
const detailStore = useDetailStore()

const username = ref('')
const product = ref({
  description: '',
  image: '',
  price: ''
})
const priceHistory = ref([
  { name: 'good', date: '2024-7-1', price: '39.60' },
  { name: 'good', date: '2024-7-2', price: '29.80' },
  { name: 'good', date: '2024-7-3', price: '39.20' },
  { name: 'good', date: '2024-7-4', price: '49.90' },
  { name: 'good', date: '2024-7-5', price: '19.60' }
])

onMounted(() => {
  username.value = userStore.username
  console.log('url = ' + detailStore.detailGoodName)
  console.log('from ' + detailStore.detailGoodFrom)
  console.log('description = ' + detailStore.description)
  product.value.description = detailStore.description
  console.log('img = ' + detailStore.image)
  product.value.image = detailStore.image
  console.log('price = ' + detailStore.price)
  product.value.price = detailStore.price
  initChart()
})

const back = () => {
  detailStore.removeDetailGoodFrom()
  detailStore.removeDetailGoodName()
  detailStore.removeImage()
  detailStore.removeDescription()
  detailStore.removePrice()
  router.push('query')
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
    xAxis: {
      type: 'category',
      data: priceHistory.value.map((item) => item.date)
    },
    yAxis: {
      type: 'value',
      name: '价格'
    },
    series: [
      {
        name: '商品',
        type: 'line',
        data: priceHistory.value.map((item) => parseFloat(item.price)),
        label: {
          show: true,
          position: 'top',
          formatter: '{c}'
        }
      }
    ]
  }

  myChart.setOption(option)
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

.product-card {
  max-width: 800px;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.product-details {
  padding: 20px;
}

.product-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-price {
  font-size: 18px;
  color: #e67e22;
}

.search-content {
  margin-top: 20px;
}
</style>
