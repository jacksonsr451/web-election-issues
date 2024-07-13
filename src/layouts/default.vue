<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>

    <FooterMenu />
  </v-app>
</template>

<script lang="ts" setup>
  import FooterMenu from '@/components/FooterMenu.vue'
</script>
