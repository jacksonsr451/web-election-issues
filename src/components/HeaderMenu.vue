<template>
  <v-app-bar class="border-bottom" flat flex justify="space-between">
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-app-bar-title>
      <router-link class="text-decoration-none" to="/"> Dataprev </router-link>
    </v-app-bar-title>
    <div>
      <router-link v-if="token" to="#" @click="logout">
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

  const authStore = useAuthAppStore()
  const drawerStore = useDrawerStore()
  const token = computed(() => authStore.getToken())
  const router = useRouter()

  const toggleDrawer = () => drawerStore.toggleVisible()

  const logout = async () => {
    await serverLogout()

    await router.push('/auth/login')
  }
</script>
