<template>
  <v-footer app height="40">
    <a
      v-for="item in items"
      :key="item.title"
      class="d-inline-block mx-2 social-link"
      :href="item.href"
      rel="noopener noreferrer"
      target="_blank"
      :title="item.title"
    >
      <v-icon :icon="item.icon" :size="item.icon === '$vuetify' ? 24 : 16" />
    </a>

    <div class="text-caption text-disabled" style="position: absolute; right: 16px;">
      &copy; 2023-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">JacksonCodeCraft</span>
      —
      <a
        class="text-decoration-none on-surface"
        href="https://www.gnu.org/licenses/gpl-3.0.en.html#license-text"
        rel="noopener noreferrer"
        target="_blank"
      >
        GNU License
      </a>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
  const items = [
    {
      title: 'E-Mail Suporte',
      icon: 'mdi-email-open-outline',
      href: 'mailto:suport@jacksoncodecraft.com.br',
    },
    {
      title: 'GitHub Jackson S Rocha',
      icon: `mdi-github`,
      href: 'https://github.com/jacksonsr451',
    },
    {
      title: 'WhatsApp Jackson S Rocha',
      icon: `mdi-whatsapp`,
      href: 'https://api.whatsapp.com/send?phone=43991963238',
    },
  ]
</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
