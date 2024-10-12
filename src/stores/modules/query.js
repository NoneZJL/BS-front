import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQueryStore = defineStore(
  'query',
  () => {
    const queryingName = ref('')

    const setQueryingName = (newName) => {
      queryingName.value = newName
    }

    const removeQueringName = () => {
      queryingName.value = ''
    }

    const isQueryingNameEmpty = () => {
      return queryingName.value.trim() === ''
    }

    return {
      queryingName,
      setQueryingName,
      removeQueringName,
      isQueryingNameEmpty
    }
  },
  {
    persist: true
  }
)
