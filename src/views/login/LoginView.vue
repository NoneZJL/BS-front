<template>
  <div v-if="showMessage" class="custom-message" :style="{ top: messageTop + 'px' }">
    {{ message }}
  </div>
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
        <el-button
          type="primary"
          plain
          style="margin-left: 5vw; font-size: large"
          @click="clickRegister"
          >注册</el-button
        >
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="loginVisible" class="login">
        <h1>登录</h1>
        <el-form :model="login" label-width="auto" style="max-width: 600px">
          <el-form-item label="用户名">
            <el-input
              v-model="login.name"
              placeholder="请输入用户名"
              style="width: 225px"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="login.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-button type="primary" round plain @click="clickReturn">返回</el-button>
          <el-button type="primary" round plain>登录</el-button>
          <br /><br />
          <span class="forgot-password" @click="handleForgotPassword">忘记密码？</span>
        </el-form>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="registerVisible" class="register">
        <h1>注册</h1>
        <el-form :model="register" label-width="auto" style="max-width: 600px">
          <el-form-item
            label="用户名"
            prop="name"
            :rules="[
              { required: true, message: '用户名不能为空', trigger: 'blur' },
              { min: 6, message: '用户名至少6个字符', trigger: 'blur' }
            ]"
          >
            <el-input v-model="register.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[
              { required: true, message: '密码不能为空', trigger: 'blur' },
              { min: 6, message: '密码至少6个字符', trigger: 'blur' }
            ]"
          >
            <el-input v-model="register.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="repassword"
            :rules="[
              { required: true, message: '请确认密码', trigger: 'blur' },
              { validator: validateRepassword, trigger: 'blur' }
            ]"
          >
            <el-input
              v-model="register.repassword"
              placeholder="请再次输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱绑定"
            prop="email"
            :rules="[
              { required: true, message: '邮箱不能为空', trigger: 'blur' },
              { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
            ]"
            inline
          >
            <el-input
              v-model="register.email"
              placeholder="请输入您绑定的邮箱"
              style="width: 60%"
            ></el-input>
            <el-button
              type="primary"
              @click="getVerificationCode"
              style="margin-left: 10px"
              :disabled="countdownActive"
            >
              {{ countdownActive ? `${verificationCountdown}秒后重试` : '获取验证码' }}
            </el-button>
          </el-form-item>
          <el-form-item
            label="验证码"
            prop="justifyCode"
            :rules="[
              { required: true, message: '验证码不能为空', triggerL: 'blur' },
              { min: 6, max: 6, message: '验证码格式错误', trigger: 'blur' }
            ]"
          >
            <el-input
              v-model="register.justifyCode"
              placeholder="请输入您邮箱收到的验证码"
            ></el-input>
          </el-form-item>
          <el-button type="primary" round plain @click="clickReturn">返回</el-button>
          <el-button type="primary" round plain @click="submitRegister">注册</el-button>
        </el-form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'

const login = ref({
  name: '',
  password: ''
})

const register = ref({
  name: '',
  password: '',
  repassword: '',
  email: '',
  justifyCode: ''
})

const loginVisible = ref(false)
const homeVisible = ref(true)
const moveUP = ref(false)
const registerVisible = ref(false)

const validateRepassword = (rule, value, callback) => {
  if (value === '' || value === register.value.password) {
    callback()
  } else {
    callback(new Error('确认密码与密码不一致'))
  }
}

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

const clickRegister = () => {
  // 开始向上移动
  moveUP.value = true // 先隐藏 login
  setTimeout(() => {
    homeVisible.value = false // 隐藏按钮
    setTimeout(() => {
      registerVisible.value = true // 按钮完全消失后显示 login
    }, 500) // 按钮消失的时间
  }, 100) // 向上移动的时间
}

const clickReturn = () => {
  moveUP.value = false
  loginVisible.value = false
  registerVisible.value = false
  setTimeout(() => {
    homeVisible.value = true
  }, 500) // 500毫秒后显示button
}

const verificationCountdown = ref(30)
const countdownActive = ref(false)
const showMessage = ref(false)
const message = ref('')
const messageTop = ref(20) // 自定义顶部位置

const getVerificationCode = () => {
  if (countdownActive.value) return // 如果已经在倒计时，直接返回

  countdownActive.value = true // 开始倒计时

  // 设置提示信息
  message.value = '验证码已发送！'
  showMessage.value = true

  // 设置 3 秒后自动隐藏提示
  setTimeout(() => {
    showMessage.value = false
  }, 3000)

  const countdownInterval = setInterval(() => {
    verificationCountdown.value--
    if (verificationCountdown.value <= 0) {
      clearInterval(countdownInterval)
      countdownActive.value = false // 重置状态
      verificationCountdown.value = 30 // 重置倒计时
    }
  }, 1000)
}

const handleForgotPassword = () => {
  // 处理忘记密码逻辑
  console.log('点击了忘记密码')
  router.push('/find')
  // 可以跳转到一个新的页面或弹出对话框
}

const submitRegister = () => {
  // 提交注册逻辑
  console.log('注册信息:', register.value)
}
</script>

<style scoped>
.custom-message {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f0f9eb; /* 背景色 */
  border: 1px solid #b7eb8f; /* 边框颜色 */
  color: #4caf50; /* 字体颜色 */
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 9999; /* 确保在其他内容上面 */
  transition: opacity 0.5s ease; /* 动画效果 */
}

.login-page {
  /* background-color: #e2e0e3; */
  background: linear-gradient(to right, #ffffff 0%, #e2e0e3 50%, #ffffff 100%);
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 17vh;
  align-items: center;
  transition: transform 1s;
}

.move-up {
  transform: translateY(-17vh); /* 将页面移动到顶部 */
}

.login-part {
  display: block;
  /* background-color: pink; */
}

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

.login,
.register {
  margin-top: 4vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  text-align: center;
}

.login h1,
.register h1 {
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

.forgot-password {
  margin-top: 10px; /* 上边距 */
  font-size: 0.9rem; /* 字体大小 */
  color: #007bff; /* 字体颜色 */
  cursor: pointer; /* 鼠标指针效果 */
  transition: color 0.3s; /* 过渡效果 */
}

.forgot-password:hover {
  color: #0056b3; /* 悬停时颜色 */
  text-decoration: underline; /* 下划线效果 */
}
</style>
