<template>
  <v-app-bar class="border-bottom" flat flex justify="space-between">
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-app-bar-title>
      <RouterLink class="text-decoration-none" to="/"> Dataprev </RouterLink>
    </v-app-bar-title>
    <div>
      <RouterLink to="/auth/login">
        <v-btn prepend-icon="mdi-login">Login</v-btn>
      </RouterLink>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({

    props: {
      isDrawerOpen: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['update:is-drawer-open'],
    methods: {
      toggleDrawer () {
        this.$emit('update:is-drawer-open', !this.isDrawerOpen)
      },
    },
  })
</script>
