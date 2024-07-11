<template>
  <v-app>
    <DrawerMenu :is-drawer-open="isDrawerOpen" @update:is-drawer-open="isDrawerOpen = $event" />
    <HeaderMenu :is-drawer-open="isDrawerOpen" @update:is-drawer-open="isDrawerOpen = $event" />
    <v-main />
    <FooterMenu />
  </v-app>
</template>

  <script lang="ts" setup>
  import { ref } from 'vue'
  import DrawerMenu from '@/components/DrawerMenu.vue'
  import HeaderMenu from '@/components/HeaderMenu.vue'
  import FooterMenu from '@/components/FooterMenu.vue'

  const isDrawerOpen = ref(false)
  </script>
