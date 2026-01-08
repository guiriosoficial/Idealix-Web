import { defineStore } from 'pinia'
import axiosDispatch from './axiosDispatch'
import { ref, computed } from 'vue'

const childsPath = '/child'

export const useChildsStore = defineStore('childs', () => {
  const list = ref([])

  const getChildsList = computed(() => [...list.value].sort((a, b) => a.name.localeCompare(b.name)))
  const getChildsLength = computed(() => list.value.length)

  async function fetchChildsList() {
    const data = await axiosDispatch({ url: childsPath })
    list.value = data
    return data
  }

  async function addNewChild(newChild) {
    const response = await axiosDispatch({
      url: childsPath,
      method: 'POST',
      data: newChild
    })
    list.value.push(response)
    return response
  }

  function clearChildsList() {
    list.value = []
  }

  return {
    getChildsList,
    getChildsLength,
    fetchChildsList,
    addNewChild,
    clearChildsList
  }
})
