<script setup lang="ts">
  import { deleteUser, getIssues, getUsers, updateUser } from '@/services/server'
  import { Ref, UnwrapRef } from 'vue'

  type Role = {
    name: string
    permissions?: [
      {
        name: string
      }
    ]
  }

  type User = {
    id: string
    email: string
    roles: Role[]
  }

  const users: Ref<UnwrapRef<User[]>> = ref([])

  users.value = await getUsers()

  const handleUpdateUsers = async () => {
    users.value = await getIssues()
  }

  const getRoleNames = (roles: Role[]): string[] => {
    return roles.map(role => role.name)
  }

  const dialogIsOpen = ref(false)
  const isEditMode = ref(false)
  const selectedUsers: Ref<UnwrapRef<User>> = ref({
    id: '',
    email: '',
    roles: [],
  })

  const openDialog = (author: any = null) => {
    if (author) {
      selectedUsers.value = { ...author }
      isEditMode.value = true
    } else {
      selectedUsers.value = {
        id: '',
        email: '',
        roles: [],
      }
      isEditMode.value = false
    }
    dialogIsOpen.value = true
  }

  const addRole = () => {
    selectedUsers.value.roles?.push({
      name: '',
    })
  }

  const handleSaveIssue = async (id?: string) => {
    if (isEditMode.value) {
      if (!id) {
        return
      }
      await updateUser(id, selectedUsers.value)
    }
    await handleUpdateUsers()
    dialogIsOpen.value = false
  }

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id)
    await handleUpdateUsers()
    dialogIsOpen.value = false
  }

</script>

<template>
  <v-app>
    <DrawerMenu />
    <HeaderMenu />
    <v-main>
      <v-card class="border rounded mb-4 p-4 mt-4" flat>
        <div class="d-flex justify-space-between">

          <v-card-title>Usuários</v-card-title>

          <v-card-title>
            <v-dialog v-model="dialogIsOpen">
              <v-card>
                <v-card-title>{{ isEditMode ? 'Editar Pesquisa' : 'Add Pesquisa' }}</v-card-title>
                <v-card-text>
                  <v-row v-if="isEditMode">
                    <v-text-field v-model="selectedUsers.id" label="ID" type="hidden" />
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="selectedUsers.email" label="Tipo" type="text" />
                    </v-col>
                  </v-row>
                  <v-row v-for="(role, qIndex) in selectedUsers.roles" :key="qIndex" class="mb-3">
                    <v-col cols="12">
                      <v-text-field
                        v-model="role.name"
                        :label="'Question ' + (qIndex + 1)"
                        placeholder="Adcione uma questão"
                      />
                    </v-col>
                  </v-row>
                  <v-row class="d-flex justify-end">
                    <v-btn color="primary" prepend-icon="mdi-plus" @click="addRole">Role</v-btn>
                  </v-row>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="error" icon @click="dialogIsOpen = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-btn color="primary" icon @click="handleSaveIssue(selectedUsers.id)">
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </v-card-actions>

              </v-card>
            </v-dialog>
          </v-card-title>
        </div>

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
                  @click="openDialog(user)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  color="error"
                  icon
                  variant="text"
                  @click="handleDeleteUser(user.id)"
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
