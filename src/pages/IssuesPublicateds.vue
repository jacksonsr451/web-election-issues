<script setup lang="ts">

  import { createAnswers, getIssues } from '@/services/server'
  import { Ref, UnwrapRef } from 'vue'
  import { useUserAppStore } from '@/stores/user'

  type Option = {
    id: string
    text: string
  }

  type Question = {
    id: string
    text: string
    options?: Option[]
  }

  type Issue = {
    id: string
    type: string
    title: string
    location: string
    year: number
    questions: Question[]
  }

  const issues: Ref<UnwrapRef<Issue[]>> = ref([])

  issues.value = await getIssues()

  const dialogIsOpen = ref(false)

  type QuestionsAnswers = {
    question_id: string
    option_id?: string
    response?: string
  }

  type Interviewed = {
    profession: string
    age: number
    marital_status: string
    gender: string
    education_level: string
    neighborhood: string
    household_income: string
    own_house: string
    religion: string
  }

  type Answers = {
    device_location: string,
    issue_id: string,
    user_id: string,
    interviewed: Interviewed,
    questions_answers: QuestionsAnswers[]
  }

  const answers: Ref<Answers> = ref({
    device_location: '',
    issue_id: '',
    user_id: '',
    interviewed: {
      profession: '',
      age: 0,
      marital_status: '',
      gender: '',
      education_level: '',
      neighborhood: '',
      household_income: '',
      own_house: '',
      religion: '',
    },
    questions_answers: [],
  })

  const userStore = useUserAppStore()
  const user = computed(() => userStore.loadUser())

  const questions: Ref<Question[]> = ref([])

  const MaritalStatusOption = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União estável']
  const GenderOption = ['Masculino', 'Feminino']
  const EducationLevelOption = ['Analfabeto', 'Fundamental 1', 'Fundamental 2', 'Médio', 'Superior']
  const HouseIncomeOption = ['Até 3 salários mínimos', 'Acima de 3 salários mínimos']
  const OwnHouseOption = ['Sim', 'Não']

  const openDialog = (issue: Issue) => {
    answers.value = {
      device_location: '',
      issue_id: issue.id,
      user_id: user.value.userId ?? '',
      interviewed: {
        profession: '',
        age: 0,
        marital_status: '',
        gender: '',
        education_level: '',
        neighborhood: '',
        household_income: '',
        own_house: '',
        religion: '',
      },
      questions_answers: [],
    }
    answers.value.issue_id = issue.id
    if (user.value.userId) {
      answers.value.user_id = user.value.userId
    }
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          answers.value.device_location = `Lat: ${latitude}, Lng: ${longitude}`
        },
        error => {
          console.error('Erro ao obter localização:', error)
          answers.value.device_location = 'Localização indisponível'
        }
      )
    }
    questions.value = issue.questions
    dialogIsOpen.value = true
  }

  const toggleCheckbox = (qIndex: number, optionId: string) => {
    answers.value.questions_answers = answers.value.questions_answers.filter(ans => ans.question_id !== questions.value[qIndex].id)

    answers.value.questions_answers.push({
      question_id: questions.value[qIndex].id,
      option_id: optionId,
    })
  }

  const addResponseTextField = (qIndex: number, response: string) => {
    if (answers.value.questions_answers[qIndex]) {
      answers.value.questions_answers[qIndex].response = response
    } else {
      answers.value.questions_answers[qIndex] = {
        question_id: questions.value[qIndex].id,
        response,
      }
    }
  }

  const handleSave = () => {
    const answerJson = JSON.stringify(answers.value)

    dialogIsOpen.value = false

    const userId = user.value.userId

    if (!userId) {
      console.error('ID do usuário não encontrado.')
      return
    }

    const userResponses = JSON.parse(localStorage.getItem(userId) || '[]')

    userResponses.push(answerJson)

    localStorage.setItem(userId, JSON.stringify(userResponses))

    console.log('Resposta salva para o usuário', userId, ':', JSON.parse(localStorage.getItem(userId) || '[]'))
  }

  const handleFinally = () => {
    const userId = user.value.userId

    if (!userId) {
      console.error('ID do usuário não encontrado.')
      return
    }

    const answersResponses = JSON.parse(localStorage.getItem(userId) || '[]')

    answersResponses.map((answer: any) => {
      createAnswers(answer)
      return answer
    })
  }

</script>

<template>
  <v-app>
    <DrawerMenu />
    <HeaderMenu />
    <v-main>
      <v-card class="border rounded mb-4 p-4 mt-4" flat>
        <div class="d-flex justify-space-between">
          <v-card-title>Pesquisas Publicadas</v-card-title>

          <v-card-title>
            <v-dialog v-model="dialogIsOpen">
              <v-card>
                <v-card-title>Realizar Pesquisa</v-card-title>
                <v-card-text>
                  <v-text-field v-model="answers.device_location" class="no-border" hide-details type="hidden" />
                  <v-text-field v-model="answers.issue_id" class="no-border" hide-details type="hidden" />
                  <v-text-field v-model="answers.user_id" class="no-border" hide-details type="hidden" />
                  <v-row>
                    <v-col>
                      <v-text-field v-model="answers.interviewed.profession" label="Profição" type="text" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="answers.interviewed.age" label="Idade" type="number" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-autocomplete
                        v-model="answers.interviewed.marital_status"
                        item-text="marital_status"
                        item-value="marital_status"
                        :items="MaritalStatusOption"
                        :label="'Estado civil'"
                        placeholder="Estado civil"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-autocomplete
                        v-model="answers.interviewed.gender"
                        item-text="gender"
                        item-value="gender"
                        :items="GenderOption"
                        :label="'Genero'"
                        placeholder="Genero"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-autocomplete
                        v-model="answers.interviewed.education_level"
                        item-text="education_level"
                        item-value="education_level"
                        :items="EducationLevelOption"
                        :label="'Grau de Formação'"
                        placeholder="Grau de Formação"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-autocomplete
                        v-model="answers.interviewed.household_income"
                        item-text="household_income"
                        item-value="household_income"
                        :items="HouseIncomeOption"
                        :label="'Renda Familiar'"
                        placeholder="Renda Familiar"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-autocomplete
                        v-model="answers.interviewed.own_house"
                        item-text="own_house"
                        item-value="own_house"
                        :items="OwnHouseOption"
                        :label="'Casa Própia'"
                        placeholder="Casa Própia"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="answers.interviewed.neighborhood" label="Bairro" type="text" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="answers.interviewed.religion" label="Religião" type="text" />
                    </v-col>
                  </v-row>

                  <v-radio-group v-for="(question, qIndex) in questions" :key="question.id" class="mb-3">
                    <v-col cols="12">
                      <v-label class="mb-4">{{ question.text }}</v-label>
                      <!-- Options loop -->
                      <v-radio-group>
                        <v-radio
                          v-for="(option) in question.options"
                          v-show="question.options"
                          :key="option.id"
                          v-model="toggleCheckbox"
                          :label="option.text"
                          :name="'radio-group'"
                          :value="option.id"
                          @change="toggleCheckbox(qIndex, option.id)"
                        />
                      </v-radio-group>

                      <v-text-field
                        v-show="question.options?.length === 0"
                        placeholder="Adicione aqui sua resposta"
                        @input="addResponseTextField(qIndex, $event.target.value)"
                      />
                    </v-col>

                  </v-radio-group></v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="handleFinally">Finalizar</v-btn>
                  <v-spacer />
                  <v-btn color="error" icon @click="dialogIsOpen = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-btn color="primary" icon @click="handleSave">
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
                  @click="openDialog(issue)"
                >
                  <v-icon>mdi-pencil</v-icon>
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
