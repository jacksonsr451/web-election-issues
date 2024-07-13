import { defineStore } from 'pinia'

interface Permission {
  name: string
}

interface Role {
  name: string
  permissions: Permission[]
}

interface UserParams {
  id: string
  email: string
  roles: Role[]
}

export const useUserAppStore = defineStore('user', {
  state: () => ({
    userId: '',
    email: '',
    roles: [] as Role[],
  }),
  actions: {
    setUser (response: UserParams) {
      this.userId = response.id
      this.email = response.email
      this.roles = response.roles

      localStorage.setItem('user_id', this.userId)
      localStorage.setItem('email', this.email)
      localStorage.setItem('roles', JSON.stringify(this.roles))
    },
    unsetUser () {
      this.userId = ''
      this.email = ''
      this.roles = [] as Role[]
      localStorage.removeItem('user_id')
      localStorage.removeItem('email')
      localStorage.removeItem('roles')
    },
    loadUser () {
      const userId = localStorage.getItem('user_id')
      const email = localStorage.getItem('email')
      const roles = localStorage.getItem('roles')

      this.userId = userId || ''
      this.email = email || ''
      this.roles = roles ? JSON.parse(roles) : []
    },
  },
})
