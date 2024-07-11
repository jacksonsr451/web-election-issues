<template>
  <v-app>
    <HeaderMenu />
    <v-main class="d-flex align-center justify-center">
      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <v-text-field
          density="compact"
          placeholder="Endereço de e-mail"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        />

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Senha

          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Precisa recuperar sua senha?</a>
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          density="compact"
          placeholder="Sua senha"
          prepend-inner-icon="mdi-lock-outline"
          :type="visible ? 'text' : 'password'"
          variant="outlined"
          @click:append-inner="visible = !visible"
        />

        <v-btn
          block
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
        >
          Login
        </v-btn>

        <v-card-text class="text-center">
          <RouterLink
            class="text-blue text-decoration-none"
            rel="noopener noreferrer"
            to="/auth/cadastrar"
          >
            Cadastrar uma conta <v-icon icon="mdi-chevron-right" />
          </RouterLink>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import HeaderMenu from '@/components/HeaderMenu.vue'
  import { ref } from 'vue'

  const visible: boolean = ref(false)
</script>
