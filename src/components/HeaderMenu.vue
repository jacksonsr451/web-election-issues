<template>
  <v-app-bar class="border-bottom" flat flex justify="space-between">
    <v-app-bar-nav-icon v-show="null!==isDrawerOpen" @click="toggleDrawer" />
    <v-app-bar-title>
      <router-link class="text-decoration-none" to="/"> Dataprev </router-link>
    </v-app-bar-title>
    <div>
      <router-link to="/auth/login">
        <v-btn prepend-icon="mdi-login">Login</v-btn>
      </router-link>
    </div>
  </v-app-bar>
  <v-navigation-drawer v-if="null!==isDrawerOpen" v-model="drawerOpen" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { RouterLink } from 'vue-router'

  export default defineComponent({
    components: {
      RouterLink,
    },
    props: {
      isDrawerOpen: {
        type: Boolean,
        default: null,
      },
    },
    emits: ['update:is-drawer-open'],
    computed: {
      drawerOpen: {
        get () {
          return this.isDrawerOpen
        },
        set (value) {
          if (this.isDrawerOpen !== null) {
            this.$emit('update:is-drawer-open', value)
          }
        },
      },
    },
    methods: {
      toggleDrawer () {
        if (this.isDrawerOpen !== null) {
          this.drawerOpen = !this.drawerOpen
        }
      },
    },
  })
</script>
