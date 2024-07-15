<script setup lang="ts">
  import { getUsers } from '@/services/server'
  import { UnwrapRef } from 'vue'

  type User = {
    id: string
    email: string
    roles: string
  }

  const users: Ref<UnwrapRef<User[]>> = ref([])

  users.value = await getUsers()

  const getRoleNames = (roles): string[] => {
    return roles.map(role => role.name)
  }

</script>

<template>
  <v-app>
    <DrawerMenu />
    <HeaderMenu />
    <v-main>
      <v-card>
        <v-card-title>Users</v-card-title>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Email
              </th>
              <th class="text-left">
                Roles
              </th>
              <th class="text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
            >
              <td>{{ user.email }}</td>
              <td>{{ getRoleNames(user.roles).join(', ') }}</td>
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
