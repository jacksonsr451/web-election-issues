<template>
  <v-navigation-drawer v-model="localDrawerOpen">
    <v-list>
      <v-list-subheader>Navigation</v-list-subheader>
      <v-list-item prepend-icon="mdi-home" to="/">Home</v-list-item>
      <v-list-subheader>Gerenciamento</v-list-subheader>
      <v-list-item prepend-icon="mdi-account" to="/admin/aplicadores">Aplicadores</v-list-item>
      <v-list-item prepend-icon="mdi-pencil" to="/admin/editores">Editores</v-list-item>
      <v-list-item prepend-icon="mdi-format-list-bulleted" to="/admin/pesquisas">Pesquisas</v-list-item>
      <v-list-subheader>Settings</v-list-subheader>
      <v-list-item prepend-icon="mdi-cog" to="/admin/configuracoes">Configurações</v-list-item>
      <v-list-item prepend-icon="mdi-power" to="/admin/logout">Logout</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      isDrawerOpen: {
        type: Boolean,
        required: true,
      },
    },
    emits: ['update:is-drawer-open'],
    computed: {
      localDrawerOpen: {
        get () {
          return this.isDrawerOpen
        },
        set (value: any) {
          this.$emit('update:is-drawer-open', value)
        },
      },
    },
  })
</script>
