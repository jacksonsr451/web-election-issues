<template>
  <v-app>
    <HeaderMenu />
    <v-main class="d-flex align-center justify-center">
      <v-row justify="center">
        <v-col cols="12" lg="6" md="8" sm="10">
          <v-card ref="form">
            <v-card-text>
              <v-text-field
                v-model="email"
                counter="25"
                label="Email"
                placeholder="Entre com seu email"
                required
                :rules="[
                  () => !!email || 'Este campo é obrigatório',
                  () =>
                    (!!email && email.length <= 25) ||
                    'Este campo deve ter no máximo 25 caracteres',
                  () => /.+@.+\..+/.test(email) || 'Email inválido',
                ]"
              />
              <v-text-field
                v-model="password"
                :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
                label="Senha"
                placeholder="Entre com sua senha"
                required
                :rules="[() => !!password || 'Este campo é obrigatório']"
                :type="visiblePassword ? 'text' : 'password'"
                @click:append-inner="visiblePassword = !visiblePassword"
              />
              <v-text-field
                v-model="replayPassword"
                :append-inner-icon="visibleReplayPassword ? 'mdi-eye-off' : 'mdi-eye'"
                label="Repetir Senha"
                placeholder="Repetir sua senha"
                required
                :rules="[
                  () => !!replayPassword || 'Este campo é obrigatório',
                  () => replayPassword === password || 'As senhas devem coincidir',
                ]"
                :type="visibleReplayPassword ? 'text' : 'password'"
                @click:append-inner="visibleReplayPassword = !visibleReplayPassword"
              />
            </v-card-text>
            <v-divider class="mt-12" />
            <v-card-actions>
              <RouterLink to="/auth/login">
                <v-btn variant="text">Cancelar</v-btn>
              </RouterLink>
              <v-spacer />
              <v-slide-x-reverse-transition>
                <v-tooltip v-if="formHasErrors" location="left">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      class="my-0"
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click="resetForm"
                    >
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </template>
                  <span>Atualizar formulário</span>
                </v-tooltip>
              </v-slide-x-reverse-transition>
              <v-btn color="primary" variant="text" @click="submit">Criar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import HeaderMenu from '@/components/HeaderMenu.vue'

  import { ref } from 'vue'

  const email = ref('')
  const password = ref('')
  const replayPassword = ref('')
  const formHasErrors = ref(false)
  const visiblePassword = ref(false)
  const visibleReplayPassword = ref(false)
  const resetForm = () => {
    email.value = ''
    password.value = ''
    replayPassword.value = ''
    formHasErrors.value = false
  }

  const submit = () => {
    formHasErrors.value =
      !email.value ||
      !password.value ||
      !replayPassword.value ||
      replayPassword.value !== password.value
    if (!formHasErrors.value) {
      console.log('Formulário enviado com sucesso!')
    }
  }
</script>
