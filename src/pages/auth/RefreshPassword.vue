<template>
  <v-app>
    <HeaderMenu />
    <v-main class="d-flex align-center justify-center">
      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <v-text-field
          placeholder="Endereço de e-mail"
          prepend-inner-icon="mdi-email-outline"
          :style="{ 'min-width': '200px' }"
          variant="outlined"
        />

        <v-btn
          block
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
        >
          Enviar
        </v-btn>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import HeaderMenu from '@/components/HeaderMenu.vue'
</script>
