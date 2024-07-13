<template>
  <v-navigation-drawer v-model="isVisible" @click.outside="closeDrawer">
    <v-list>
      <v-list-subheader>Navigation</v-list-subheader>
      <v-list-item prepend-icon="mdi-home" @click="navigateTo('/')">Home</v-list-item>
      <v-list-subheader>Gerenciamento</v-list-subheader>
      <v-list-item prepend-icon="mdi-account" @click="navigateTo('/admin/aplicadores')">Aplicadores</v-list-item>
      <v-list-item prepend-icon="mdi-pencil" @click="navigateTo('/admin/editores')">Editores</v-list-item>
      <v-list-item prepend-icon="mdi-format-list-bulleted" @click="navigateTo('/admin/pesquisas')">Pesquisas</v-list-item>
      <v-list-subheader>Settings</v-list-subheader>
      <v-list-item prepend-icon="mdi-cog" @click="navigateTo('/admin/configuracoes')">Configurações</v-list-item>
      <v-list-item prepend-icon="mdi-power" @click="logout">Logout</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useDrawerStore } from '@/stores/drawer'
  import { useRouter } from 'vue-router'
  import { serverLogout } from '@/services/server'

  const drawerState = useDrawerStore()
  const router = useRouter()
  const isVisible = computed(() => drawerState.getIsVisible())

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
