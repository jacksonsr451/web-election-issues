// src/stores/drawer.ts
import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    isVisible: false,
  }),
  actions: {
    setIsVisible (value) {
      this.isVisible = value
    },
    toggleVisible () {
      this.isVisible = !this.isVisible
    },
    getIsVisible () {
      return this.isVisible
    },
  },
})
