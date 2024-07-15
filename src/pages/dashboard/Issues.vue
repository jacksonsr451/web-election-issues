<script setup lang="ts">
  import { createIssue, deleteIssue, getIssues, updateIssue } from '@/services/server'
  import { Ref, UnwrapRef } from 'vue'

  type Issue = {
    id: string
    type: string
    title: string
    location: string
    year: number
  }

  const issues: Ref<UnwrapRef<Issue[]>> = ref([])

  issues.value = await getIssues()

  const handleUpdateIssues = async () => {
    issues.value = await getIssues()
  }

  type Option = {
    text: string
  }

  type Question = {
    text: string
    options?: Option[]
  }

  type Issues = {
    id?: string
    type: string
    title: string
    location: string
    year: number
    questions?: Question[]
  }

  const dialogIsOpen = ref(false)
  const isEditMode = ref(false)
  const selectedIssue: Ref<UnwrapRef<Issues>> = ref({
    id: '',
    type: '',
    title: '',
    location: '',
    year: 0,
    questions: [],
  })

  const openDialog = (author: any = null) => {
    if (author) {
      selectedIssue.value = { ...author }
      isEditMode.value = true
    } else {
      selectedIssue.value = {
        id: '',
        type: '',
        title: '',
        location: '',
        year: 0,
        questions: [],
      }
      isEditMode.value = false
    }
    dialogIsOpen.value = true
  }

  const addQuestion = () => {
    selectedIssue.value.questions?.push({
      text: '',
    })
  }

  const addOption = (question: Question) => {
    if (!question.options) {
      question.options = []
    }
    question.options.push({
      text: '',
    })
  }

  const handleSaveIssue = async (id?: string) => {
    if (isEditMode.value) {
      if (!id) {
        return
      }
      await updateIssue(id, selectedIssue.value)
    } else {
      const { id, ...issueWithoutId } = selectedIssue.value
      await createIssue(issueWithoutId)
    }
    await handleUpdateIssues()
    dialogIsOpen.value = false
  }

  const handleDeleteIssue = async (id: string) => {
    await deleteIssue(id)
    await handleUpdateIssues()
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
          <v-card-title>Pesquisas</v-card-title>

          <v-card-title>
            <v-btn prepend-icon="mdi-plus" size="small" variant="tonal" @click="openDialog()">Pesquisa</v-btn>

            <v-dialog v-model="dialogIsOpen">
              <v-card>
                <v-card-title>{{ isEditMode ? 'Editar Pesquisa' : 'Add Pesquisa' }}</v-card-title>
                <v-card-text>
                  <v-row v-if="isEditMode">
                    <v-text-field v-model="selectedIssue.id" label="ID" type="hidden" />
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="selectedIssue.type" label="Tipo" type="text" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="selectedIssue.title" label="Titulo" type="text" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="selectedIssue.location" label="Localização" type="text" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="selectedIssue.year" label="Ano" type="year" />
                    </v-col>
                  </v-row>
                  <v-row v-for="(question, qIndex) in selectedIssue.questions" :key="qIndex" class="mb-3">
                    <v-col cols="12">
                      <v-text-field
                        v-model="question.text"
                        :label="'Question ' + (qIndex + 1)"
                        placeholder="Adcione uma questão"
                      />
                    </v-col>
                    <v-col class="d-flex justify-end" cols="12">
                      <v-btn color="primary" prepend-icon="mdi-plus" @click="addOption(question)">Opção</v-btn>
                    </v-col>
                    <v-col
                      v-for="(option, oIndex) in question.options"
                      :key="oIndex"
                      class="ml-4"
                      cols="12"
                    >
                      <v-text-field
                        v-model="option.text"
                        :label="'Option' + (oIndex + 1)"
                        placeholder="Adcione uma opção"
                      />
                    </v-col>
                  </v-row>
                  <v-row class="d-flex justify-end">
                    <v-btn color="primary" prepend-icon="mdi-plus" @click="addQuestion">Questão</v-btn>
                  </v-row>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="error" icon @click="dialogIsOpen = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-btn color="primary" icon @click="handleSaveIssue(selectedIssue.id)">
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
                  @click="openDialog(issue)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  color="error"
                  icon
                  variant="text"
                  @click="handleDeleteIssue(issue.id)"
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
