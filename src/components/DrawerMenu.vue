<template>
  <v-navigation-drawer v-show="hasRole(['user', 'publisher', 'admin'])" v-model="isVisible" @click.outside="closeDrawer">
    <v-list>
      <v-list-subheader>Navigation</v-list-subheader>
      <v-list-item v-show="hasRole(['user', 'publisher', 'admin'])" prepend-icon="mdi-home" @click="navigateTo('/')">Home</v-list-item>
      <v-list-item v-show="hasRole(['user', 'publisher', 'admin'])" prepend-icon="mdi-account" @click="navigateTo('/pesquisas')">Pesquisas publicadas</v-list-item>
      <v-list-subheader v-show="hasRole(['publisher', 'admin'])">Gerenciamento</v-list-subheader>
      <v-list-item v-show="hasRole(['publisher', 'admin'])" prepend-icon="mdi-account" @click="navigateTo('/dashboard/pesquisas')">Pesquisas</v-list-item>
      <v-list-item v-show="hasRole(['publisher', 'admin'])" prepend-icon="mdi-account" @click="navigateTo('/dashboard/usuarios')">Usuários</v-list-item>
      <v-list-subheader v-show="hasRole(['admin'])">Settings</v-list-subheader>
      <v-list-item v-show="hasRole(['admin'])" prepend-icon="mdi-cog" @click="navigateTo('/dashboard/configuracoes')">Configurações</v-list-item>
      <v-spacer />
      <v-list-item prepend-icon="mdi-power" @click="logout">Logout</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useDrawerStore } from '@/stores/drawer'
  import { useRouter } from 'vue-router'
  import { serverLogout } from '@/services/server'
  import { useUserAppStore } from '@/stores/user'

  const drawerState = useDrawerStore()
  const router = useRouter()
  const isVisible = computed(() => drawerState.getIsVisible())
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

  const closeDrawer = () => {
    drawerState.setIsVisible(false)
  }

  const navigateTo = (path: string) => {
    router.push(path)
    closeDrawer()
  }

  const logout = async () => {
    await serverLogout()

    await router.push('/auth/login')
  }

</script>
