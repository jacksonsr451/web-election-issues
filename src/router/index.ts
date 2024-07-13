import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { useUserAppStore } from '@/stores/user'
import { computed } from 'vue'

const appRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/pages/auth/index.vue'),
  },
  {
    path: '/auth/cadastrar',
    name: 'Cadastro de Usuário',
    component: () => import('@/pages/auth/CreateAccount.vue'),
  },
  {
    path: '/auth/recuperar-senha',
    name: 'Recuperar Senha',
    component: () => import('@/pages/auth/RefreshPassword.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/dashboard/index.vue'),
    meta: { requiresAuth: true, requiresRole: ['user', 'publisher', 'admin'] },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(appRoutes),
})

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

router.beforeEach((to, from, next) => {
  const userStore = useUserAppStore()
  const isAuthenticated = !!userStore.userId

  const user = computed(() => {
    const loadedUser = userStore.loadUser()
    return {
      userId: loadedUser.userId || '',
      email: loadedUser.email || '',
      roles: loadedUser.roles ? JSON.parse(loadedUser.roles) : [],
    }
  })

  const hasRole = (roleNames: string[]) => {
    return roleNames.some(roleName => user.value.roles.some((role: any) => role.name === roleName))
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ path: '/auth/login', query: { redirect: to.fullPath } })
  } else if (to.matched.some(record => record.meta.requiresRole)) {
    const requiredRoles = to.meta.requiresRole as string[]
    if (!hasRole(requiredRoles)) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
