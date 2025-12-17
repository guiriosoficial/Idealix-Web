import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
    addChildDialogVisible: false, // Corrigido erro de digitação 'Visibel'
    addPointDialogVisible: false
  }),

  actions: {
    setLoading(visible) {
      this.isLoading = visible
    },
    toggleAddChildDialog(visible) {
      this.addChildDialogVisible = visible
    },
    toggleAddPointDialog(visible) {
      this.addPointDialogVisible = visible
    }
  }
})
