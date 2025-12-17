import { defineStore } from 'pinia'
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

export const useHistoricStore = defineStore('historic', {
  state: () => JSON.parse(JSON.stringify(initialState)),

  actions: {
    async getCurrentChild(childId) {
      if (childId === 'home') return
      const data = await axiosDispatch({
        url: `${historicPath}/${childId}`
      })
      this.currentChild = data
      return data
    },

    async addNewPoint(newPoint) {
      const response = await axiosDispatch({
        url: historicPath,
        method: 'POST',
        data: newPoint
      })

      if (this.currentChild.id === response.id_child) {
        this.currentChild.historic.push(response)
        this.currentChild.measurementDate = response.measurement_date
        this.currentChild.status = response.status
        this.currentChild.height = response.height
        this.currentChild.weight = response.weight
        this.currentChild.imc = response.imc
      }
      return response
    },

    async fetchClassification() {
      const data = await axiosDispatch({ url: '/classification' })
      this.classification.m = data.filter(c => c.gender === 'm')
      this.classification.f = data.filter(c => c.gender === 'f')
      return data
    },

    clearCurrentChild() {
      this.currentChild = JSON.parse(JSON.stringify(initialState.currentChild))
    }
  }
})