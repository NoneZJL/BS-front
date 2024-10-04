import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const emailCode = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const setEmailCode = (newEmailCode) => {
      emailCode.value = newEmailCode
    }
    const removeEmailCode = () => {
      emailCode.value = ''
    }

    return {
      token,
      setToken,
      removeToken,
      emailCode,
      setEmailCode,
      removeEmailCode
    }
  },
  {
    persist: true
  }
)
