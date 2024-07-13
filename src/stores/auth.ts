// src/stores/auth.ts
import { defineStore } from 'pinia'

interface LoginParams {
  response: any;
}

export const useAuthAppStore = defineStore('auth', {
  state: () => ({
    access_token: '',
    token_type: '',
    expires_in: null,
  }),
  actions: {
    login ({ response }: LoginParams): void {
      this.access_token = response.access_token
      this.token_type = response.token_type
      this.expires_in = response.expires_in
      localStorage.setItem('access_token', this.access_token)
      localStorage.setItem('token_type', this.token_type)
      localStorage.setItem('expires_in', String(this.expires_in))
    },
    logout () {
      this.access_token = ''
      this.token_type = ''
      this.expires_in = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('token_type')
      localStorage.removeItem('expires_in')
    },
    getToken () : string {
      this.access_token = localStorage.getItem('access_token') ?? ''
      return this.access_token
    },
  },
})
