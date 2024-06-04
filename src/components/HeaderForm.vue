<script setup>
import { reactive } from 'vue'
import { inject } from 'vue'
import { v4 as uuidv4 } from 'uuid'
const data = inject('allTask')

const inputData = reactive({
  task: '',
  deskripsi: '',
  type: 'Personal',
  date: ''
})

defineEmits(['update-data'])

// Save
const addTodo = async () => {
  try {
    const variables = {
      id: uuidv4(),
      task: inputData.task,
      start: new Date(),
      deadline: inputData.date,
      deskripsi: inputData.deskripsi,
      kategori: inputData.type,
      status: false
    }
    console.log('variables', variables)
    data.allTask.value.push(variables)

    localStorage.setItem('allTask', JSON.stringify(data.allTask.value))
  } catch (error) {
    console.log(error)
  } finally {
    resetInput()
  }
}

const resetInput = () => {
  inputData.task = ''
  inputData.deskripsi = ''
  inputData.type = 'Personal'
  inputData.date = ''
}
</script>
<template>
  <form
    v-on:submit.prevent="addTodo"
    class="bg-white shadowApp rounded-sm overflow-hidden header dark:bg-slate-600"
  >
    <div class="p-8">
      <h1 class="text-3xl font-bold text-center mb-6 dark:text-white">Get Your Jobs Done</h1>
      <div class="flex flex-col">
        <div>
          <label for="" class="text-md font-bold dark:text-white">Task</label>
          <input
            type="text"
            v-model="inputData.task"
            class="w-full border-2 rounded-md px-3 py-2 border-blue-300 dark:border-slate-300 mb-2"
          />
        </div>
        <div>
          <label for="" class="text-md font-bold dark:text-white">Deskripsi</label>
          <textarea
            type="text"
            v-model="inputData.deskripsi"
            class="w-full border-2 rounded-md px-3 py-2 border-blue-300 dark:border-slate-300 mb-2"
          />
        </div>
        <v-date-picker v-model="inputData.date">
          <template v-slot="{ inputValue, inputEvents }">
            <label class="text-md font-bold dark:text-white" for="">Deadline </label>
            <input
              class="w-full bg-white border-2 rounded-md px-3 py-2 border-blue-300 dark:border-slate-300 mb-2"
              placeholder="22 Desember 2022"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </v-date-picker>
        <div>
          <label class="text-md font-bold dark:text-white">Kategori</label>
          <div
            class="flex justify-between border-2 rounded-md self-center py-2 px-2 border-blue-300 dark:border-slate-300 dark:text-white"
          >
            <div>
              <input
                type="radio"
                name="type"
                id="Personal"
                v-model="inputData.type"
                value="Personal"
              />
              <label class="px-2 text-md" for="">Personal</label>
            </div>
            <div>
              <input
                type="radio"
                name="type"
                id="College"
                v-model="inputData.type"
                value="College"
              />
              <label class="px-2 text-md" for="">College</label>
            </div>
            <div>
              <input type="radio" name="type" id="Intern" v-model="inputData.type" value="Intern" />
              <label class="px-2 text-md" for="">Intern</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      type="submit"
      class="w-full bg-sky-900 py-3 text-xl font-bold text-white dark:bg-neutral-200 dark:text-black"
    >
      ADD TASK
    </button>
  </form>
</template>
<style scoped>
.header {
  border-radius: 4rem 0 0 0 !important;
}
</style>
