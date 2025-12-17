import { defineStore } from 'pinia'
import axiosDispatch from './axiosDispatch'

const childsPath = '/child'

export const useChildsStore = defineStore('childs', {
  state: () => ([]),

  getters: {
    // Pinia permite usar 'this' para acessar outras getters
    getChildsList: (state) => [...state].sort((a, b) => a.name.localeCompare(b.name)),
    getChildsLength: (state) => state.length
  },

  actions: {
    async fetchChildsList() {
      const data = await axiosDispatch({ url: childsPath })
      this.length = 0 // limpa a lista
      this.push(...data)
      return data
    },

    async addNewChild(newChild) {
      const response = await axiosDispatch({
        url: childsPath,
        method: 'POST',
        data: newChild
      })
      this.push(response)
      return response
    },

    clearChildsList() {
      this.$state = []
    }
  }
})
