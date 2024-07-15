<script setup lang="ts">
  import { getIssues } from '@/services/server'
  import { Ref, UnwrapRef } from 'vue'

  type Issue = {
    id: number
    type: string
    title: string
    location: string
    year: number
  }

  const issues: Ref<UnwrapRef<Issue[]>> = ref([])

  issues.value = await getIssues()
</script>

<template>
  <v-app>
    <DrawerMenu />
    <HeaderMenu />
    <v-main>
      <v-card>
        <v-card-title>Issues</v-card-title>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Tipo
              </th>
              <th class="text-left">
                Titulo
              </th>
              <th class="text-left">
                Localização
              </th>
              <th class="text-left">
                Ano
              </th>
              <th class="text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="issue in issues"
              :key="issue.id"
            >
              <td>{{ issue.type }}</td>
              <td>{{ issue.title }}</td>
              <td>{{ issue.location }}</td>
              <td>{{ issue.year }}</td>
              <td>
                <v-btn
                  color="primary"
                  icon
                  variant="text"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  color="error"
                  icon
                  variant="text"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-main>
    <FooterMenu />
  </v-app>
</template>

<style scoped lang="sass">

</style>
