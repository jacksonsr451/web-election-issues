<template>
  <v-app>
    <DrawerMenu />
    <HeaderMenu />
    <v-main />
    <FooterMenu />
  </v-app>
</template>

<script lang="ts" setup>
  import DrawerMenu from '@/components/DrawerMenu.vue'
  import HeaderMenu from '@/components/HeaderMenu.vue'
  import FooterMenu from '@/components/FooterMenu.vue'
</script>
