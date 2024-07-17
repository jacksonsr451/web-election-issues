import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useUserAppStore } from '@/stores/user'
import { useAuthAppStore } from '@/stores/auth'

const baseURI = 'http://api.dataprevia.com.br:8000'

interface DecodedToken {
  sub: string
  exp: number
}

const getToken = () => {
  return localStorage.getItem('access_token')
}

const getUserIdFromToken = (token: string) => {
  const decoded: DecodedToken = jwtDecode(token)
  return decoded.sub
}

export const serverLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${baseURI}/api/v1/login`, {
      email,
      password,
    })
    return response.data
  } catch (error) {
    const userStore = useUserAppStore()
    const authStore = useAuthAppStore()

    authStore.logout()
    userStore.unsetUser()
    console.error('Login failed:', error)
    throw error
  }
}

export const serverLogout = async () => {
  const userStore = useUserAppStore()
  const authStore = useAuthAppStore()

  const token = getToken()
  authStore.logout()
  userStore.unsetUser()

  try {
    const response = await axios.get(`${baseURI}/api/v1/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    const userStore = useUserAppStore()
    const authStore = useAuthAppStore()

    authStore.logout()
    userStore.unsetUser()
    console.error('Error to user:', error)
    throw error
  }
}

export const getUser = async () => {
  try {
    const token = getToken()

    const userId = token ? getUserIdFromToken(token) : null

    const response = await axios.get(`${baseURI}/api/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    const userStore = useUserAppStore()
    const authStore = useAuthAppStore()

    authStore.logout()
    userStore.unsetUser()
    console.error('Error to user:', error)
    throw error
  }
}

export const getUsers = async () => {
  try {
    const token = getToken()

    const response = await axios.get(`${baseURI}/api/v1/users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    const userStore = useUserAppStore()
    const authStore = useAuthAppStore()

    authStore.logout()
    userStore.unsetUser()
    console.error('Error to user:', error)
    throw error
  }
}

export const createUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${baseURI}/api/v1/users/`, {
      email,
      password,
    })

    return response.data
  } catch (error) {
    const userStore = useUserAppStore()
    const authStore = useAuthAppStore()

    authStore.logout()
    userStore.unsetUser()
    console.error('Error to user:', error)
    throw error
  }
}

export const getIssues = async () => {
  try {
    const token = getToken()
    const response = await axios.get(`${baseURI}/api/v1/election-issues/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    const userStore = useUserAppStore()
    const authStore = useAuthAppStore()

    authStore.logout()
    userStore.unsetUser()
    console.error('Error to user:', error)
    throw error
  }
}

type Option = {
  text: string
}

type Question = {
  text: string
  options?: Option[]
}

type Issues = {
  id?: string
  type: string
  title: string
  location: string
  year: number
  questions?: Question[]
}

export const createIssue = async (data: Issues) => {
  try {
    const token = getToken()
    const jsonIssue = JSON.stringify(data)
    const response = await axios.post<Issues>(`${baseURI}/api/v1/election-issues/`,
      jsonIssue, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    const userStore = useUserAppStore()
    const authStore = useAuthAppStore()

    authStore.logout()
    userStore.unsetUser()
    console.error('Error to user:', error)
    throw error
  }
}

export const updateIssue = async (id: string, data: Issues) => {
  try {
    const token = getToken()
    const jsonIssue = JSON.stringify(data)
    const response = await axios.put<Issues>(`${baseURI}/api/v1/election-issues/${id}`,
      jsonIssue, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    const userStore = useUserAppStore()
    const authStore = useAuthAppStore()

    authStore.logout()
    userStore.unsetUser()
    console.error('Error to user:', error)
    throw error
  }
}

export const deleteIssue = async (id: string) => {
  try {
    const token = getToken()
    const response = await axios.delete(`${baseURI}/api/v1/election-issues/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    const userStore = useUserAppStore()
    const authStore = useAuthAppStore()

    authStore.logout()
    userStore.unsetUser()
    console.error('Error to user:', error)
    throw error
  }
}

export const updateUser = async (id: string, data: any) => {
  try {
    const token = getToken()
    const jsonIssue = JSON.stringify(data)
    const response = await axios.put(`${baseURI}/api/v1/users/${id}`,
      jsonIssue, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    const userStore = useUserAppStore()
    const authStore = useAuthAppStore()

    authStore.logout()
    userStore.unsetUser()
    console.error('Error to user:', error)
    throw error
  }
}

export const deleteUser = async (id: string) => {
  try {
    const token = getToken()
    const response = await axios.delete(`${baseURI}/api/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    const userStore = useUserAppStore()
    const authStore = useAuthAppStore()

    authStore.logout()
    userStore.unsetUser()
    console.error('Error to user:', error)
    throw error
  }
}

export const createAnswers = async (data: any) => {
  try {
    const token = getToken()
    const response = await axios.post(`${baseURI}/api/v1/answers/`,
      data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error to user:', error)
    throw error
  }
}
