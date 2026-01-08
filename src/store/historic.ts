import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axiosDispatch from './axiosDispatch'

const historicPath = '/historic'

const initialState = {
  currentChild: {
    id: '', name: '', gender: '', age: null, status: '',
    height: null, weight: null, measurementDate: null, imc: null,
    historic: []
  },
  classification: { m: [], f: [] }
}

export const useHistoricStore = defineStore('historic', () => {
  const currentChild = reactive(initialState.currentChild)
  const classification = reactive(initialState.classification)

  async function getCurrentChild(childId) {
    if (childId === 'home') return
    const data = await axiosDispatch({
      url: `${historicPath}/${childId}`
    })
    Object.assign(currentChild, data)
    return data
  }

  async function addNewPoint(newPoint) {
    const response = await axiosDispatch({
      url: historicPath,
      method: 'POST',
      data: newPoint
    })

    if (this.currentChild.id === response.id_child) {
      currentChild.historic.push(response)
      currentChild.measurementDate = response.measurement_date
      currentChild.status = response.status
      currentChild.height = response.height
      currentChild.weight = response.weight
      currentChild.imc = response.imc
    }
    return response
  }

  async function fetchClassification() {
    const data = await axiosDispatch({ url: '/classification' })
    classification.m = data.filter(c => c.gender === 'm')
    classification.f = data.filter(c => c.gender === 'f')
    return data
  }

  function clearCurrentChild() {
    Object.assign(currentChild, { ...initialState.currentChild })
  }

  return {
    currentChild,
    classification,
    getCurrentChild,
    addNewPoint,
    fetchClassification,
    clearCurrentChild
  }
})