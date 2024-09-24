<template>
  <div :class="['login-page', { 'move-up': moveUP }]">
    <div style="display: block">
      <img style="width: 30vh" src="../../assets/logo.png" alt="LOGO" />
    </div>
    <div class="login-part">
      <h2 class="header">欢迎来到 Price Compare !</h2>
    </div>
    <Transition name="fade">
      <div v-if="homeVisible" class="button">
        <el-button type="primary" plain style="font-size: large" @click="clickLogin"
          >登录</el-button
        >
        <el-button type="primary" plain style="margin-left: 5vw; font-size: large">注册</el-button>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="loginVisible" class="login">
        <h1>登录</h1>
        <el-form :model="login" label-width="auto" style="max-width: 600px">
          <el-form-item label="用户名">
            <el-input v-model="login.name" placeholder="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="login.password" placeholder="password"></el-input>
          </el-form-item>
          <el-button type="primary" round plain @click="clickReturn">返回</el-button>
          <el-button type="primary" round plain>登录</el-button>
        </el-form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const login = ref({
  name: '',
  password: ''
})

const loginVisible = ref(false)
const homeVisible = ref(true)
const moveUP = ref(false)

// const clickLogin = () => {
//   homeVisible.value = false
//   setTimeout(() => {
//     loginVisible.value = true
//   }, 500); // 500毫秒后显示login
// }
const clickLogin = () => {
  // 开始向上移动
  moveUP.value = true // 先隐藏 login
  setTimeout(() => {
    homeVisible.value = false // 隐藏按钮
    setTimeout(() => {
      loginVisible.value = true // 按钮完全消失后显示 login
    }, 500) // 按钮消失的时间
  }, 100) // 向上移动的时间
}

const clickReturn = () => {
  moveUP.value = false
  loginVisible.value = false
  setTimeout(() => {
    homeVisible.value = true
  }, 500) // 500毫秒后显示button
}
</script>

<style scoped>
.login-page {
  /* background-color: #e2e0e3; */
  background: linear-gradient(to right, #ffffff 0%, #e2e0e3 50%, #ffffff 100%);
  height: 100vh; /* 使 div 填满整个视口高度 */
  display: flex;
  flex-direction: column; /* 使内容垂直排列 */
  padding-top: 17vh;
  align-items: center; /* 水平居中 */
  transition: transform 1s;
}

.move-up {
  transform: translateY(-17vh); /* 将页面移动到顶部 */
}

.login-part {
  display: block;
  /* background-color: pink; */
}

/* .header {
  margin-top: 1vh;
  margin-bottom: 0;
  font-size: 5vw;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
  font-weight: 700;
  color: #f3a048;
} */

.header {
  margin-top: 1vh;
  margin-bottom: 0;
  font-size: 5vw;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
  font-weight: 700;
  background: linear-gradient(
    270deg,
    #f3a048,
    #ff4081,
    #ffd700,
    #1e90ff,
    #f3a048,
    #ff4081,
    #ffd700
  ); /* 渐变色 */
  background-size: 300%; /* 增加背景尺寸以便于动画 */
  -webkit-background-clip: text; /* 将背景应用到文本 */
  background-clip: text;
  -webkit-text-fill-color: transparent; /* 使文本颜色透明 */
  animation: gradient-animation 8s linear infinite; /* 修改为线性动画 */
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.button {
  margin-top: 6vh;
}

.login {
  margin-top: 4vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  text-align: center;
}

.login h1 {
  font-size: 1.5rem; /* 增加字体大小 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  margin-bottom: 3vh; /* 添加下边距 */
  font-family: 'KaiTi', '楷体', serif; /* 设置楷体 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在 <2.1.8 版本中使用 */ {
  opacity: 0;
}
</style>
