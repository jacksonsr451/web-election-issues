<template>
  <v-app>
    <HeaderMenu />
    <v-main class="d-flex align-center justify-center">
      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <v-text-field
          v-model="email"
          density="compact"
          placeholder="Endereço de e-mail"
          prepend-inner-icon="mdi-email-outline"
          :rules="[
            () => !!email || 'Este campo é obrigatório',
            () =>
              (!!email && email.length <= 50) ||
              'Este campo deve ter no máximo 50 caracteres',
            () => /.+@.+\..+/.test(email) || 'Email inválido',
          ]"
          variant="outlined"
        />

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Senha

          <RouterLink
            class="text-caption text-decoration-none text-blue"
            rel="noopener noreferrer"
            to="/auth/recuperar-senha"
          >
            Precisa recuperar sua senha?</RouterLink>
        </div>

        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          density="compact"
          placeholder="Sua senha"
          prepend-inner-icon="mdi-lock-outline"
          :rules="[() => !!password || 'Este campo é obrigatório']"
          :type="visible ? 'text' : 'password'"
          variant="outlined"
          @click:append-inner="visible = !visible"
        />

        <v-spacer>
          <v-btn
            block
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
            @click="submit"
          >
            Login
          </v-btn>
        </v-spacer>

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
  import { useAuthAppStore } from '@/stores/auth'
  import { getUser, serverLogin } from '@/services/server'
  import { useUserAppStore } from '@/stores/user'
  import { useRouter } from 'vue-router'

  const email = ref('')
  const password = ref('')

  const formHasErrors = ref(false)
  const visible = ref(false)

  const authStore = useAuthAppStore()
  const userStore = useUserAppStore()

  const router = useRouter()

  const submit = async () => {
    formHasErrors.value =
      !email.value ||
      !password.value
    if (!formHasErrors.value) {
      const response = await serverLogin(email.value, password.value)
      authStore.login({ response })
      const responseUser = await getUser()
      userStore.setUser(responseUser)

      await router.push('/dashboard')
    }
  }
</script>
