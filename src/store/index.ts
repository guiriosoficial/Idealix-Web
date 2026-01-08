import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false)
  const addChildDialogVisible = ref(false)
  const addPointDialogVisible = ref(false)

  function setLoading(visible: boolean) :void {
    isLoading.value = visible
  }
  function toggleAddChildDialog(visible: boolean): void {
    addChildDialogVisible.value = visible
  }
  function toggleAddPointDialog(visible: boolean) : void {
    addPointDialogVisible.value = visible
  }

  return {
    isLoading,
    addChildDialogVisible,
    addPointDialogVisible,
    setLoading,
    toggleAddChildDialog,
    toggleAddPointDialog
  }
})
