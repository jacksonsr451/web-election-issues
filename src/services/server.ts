import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useUserAppStore } from '@/stores/user'
import { useAuthAppStore } from '@/stores/auth'

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
    const response = await axios.post('http://localhost:8000/api/v1/login', {
      email,
      password,
    })
    return response.data
  } catch (error) {
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
    const response = await axios.get('http://localhost:8000/api/v1/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error to user:', error)
    throw error
  }
}

export const getUser = async () => {
  try {
    const token = getToken()

    const userId = token ? getUserIdFromToken(token) : null

    const response = await axios.get(`http://localhost:8000/api/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error to user:', error)
    throw error
  }
}

export const createUser = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/users/', {
      email,
      password,
    })

    return response.data
  } catch (error) {
    console.error('Error to user:', error)
    throw error
  }
}
