<template>
  <v-app-bar class="border-bottom" flat flex justify="space-between">
    <v-app-bar-nav-icon v-show="hasRole(['user', 'publisher', 'admin']) && token" @click="toggleDrawer" />
    <v-app-bar-title>
      <router-link class="text-decoration-none" to="/"> Dataprev </router-link>
    </v-app-bar-title>
    <div>
      <router-link v-if="token && token !== 'null'" to="#" @click="logout">
        <v-btn prepend-icon="mdi-logout">Logout</v-btn>
      </router-link>
      <router-link v-else to="/auth/login">
        <v-btn prepend-icon="mdi-login">Login</v-btn>
      </router-link>
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthAppStore } from '@/stores/auth'
  import { serverLogout } from '@/services/server'
  import { useDrawerStore } from '@/stores/drawer'
  import { useUserAppStore } from '@/stores/user'

  const authStore = useAuthAppStore()
  const drawerStore = useDrawerStore()
  const token = computed(() => authStore.getToken())
  const router = useRouter()

  const toggleDrawer = () => drawerStore.toggleVisible()

  const userStore = useUserAppStore()

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

  const logout = async () => {
    await serverLogout()

    await router.push('/auth/login')
  }
</script>
