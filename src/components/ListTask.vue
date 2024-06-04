<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useFormatDate } from '../composables/useFormatDate'
defineProps({
  listTaskPerPaginate: {
    type: Array,
    default: [
      {
        task: 'dummy',
        kategori: 'dummy',
        deskripsi: 'dummy',
        start: 'dummy',
        deadline: 'dummy',
        status: false
      }
    ]
  }
})

const { formatDateTime } = useFormatDate()

const today = new Date()

console.log(formatDateTime(today))
function calculateDaysRemaining(endDate) {
  const end = new Date(endDate)
  const timeDiff = end - today
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
  return daysRemaining
}
defineEmits(['deleteData', 'updateStatus'])
</script>
<template>
  <div class="flex justify-between dark:text-white">
    <h2 class="text-2xl font-bold">Work Todo</h2>
    <select name="" id="" class="px-3 py-1 border-2 rounded-md border-black text-black">
      <option value="">Sort by Date Newer First</option>
      <option value="">Sort by Date Deadline</option>
    </select>
  </div>
  <div v-for="(todo, index) in listTaskPerPaginate" :key="index" class="task pb-3">
    <div class="flex flex-col">
      <div class="flex flex-row justify-between">
        <div>
          <h4 class="font-bold text-xl place-self-center dark:text-white">
            {{ todo.task }}
          </h4>
        </div>
        <div class="self-center">
          <span
            v-if="todo.kategori"
            class="bg-sky-900 p-2 rounded text-white font-bold dark:bg-slate-500 dark:text-white"
            >{{ todo.kategori }}</span
          >
          <span
            v-else
            class="bg-sky-900 p-2 rounded text-white font-bold dark:bg-slate-500 dark:text-white"
            >Uncategories</span
          >
        </div>
      </div>

      <p v-if="todo.deskripsi" class="min-h-24 line-clamp-3 dark:text-white">
        {{ todo.deskripsi }}
      </p>
      <p v-else>Tidak ada Deskripsi</p>
      <footer class="flex flex-row justify-between dark:text-white">
        <div class="mt-auto">
          <p>
            <span>Start : </span><span class="italic">{{ formatDateTime(todo.start) }}</span>
          </p>
          <p>
            <span>Deadline : </span>
            <span v-if="todo.deadline" class="italic font-bold">{{
              formatDateTime(todo.deadline)
            }}</span>
            <span v-else class="text-small italic font-bold">Tanggal Belum Diatur</span>
          </p>
        </div>
        <div class="flex flex-col">
          <div class="my-2">
            <span
              @click="$emit('updateStatus', todo.id)"
              :class="[
                todo.status == true
                  ? 'border-slate-200 bg-slate-200 cursor-not-allowed'
                  : ' border-blue-200'
              ]"
              class="border-2 shadow-sm rounded px-2 py-1 mr-2"
            >
              <font-awesome-icon icon="fa-solid fa-check" class="text-blue-400" />
            </span>
            <span
              @click="$emit('deleteData', todo.id)"
              class="border-2 shadow-sm border-red-200 rounded px-2 py-1"
            >
              <font-awesome-icon icon="fa-solid fa-trash" class="text-red-400" />
            </span>
          </div>
          <div
            v-if="todo.status == true"
            class="text-center font-bold text-green-600 my-2 border-2 shadow-sm bg-green-200 border-green-200 rounded px-2 py-1 w-full"
          >
            Done
          </div>
          <div
            v-else
            class="text-center font-bold text-red-600 my-2 border-2 shadow-sm bg-red-200 border-red-200 rounded px-2 py-1 w-full"
          >
            {{ calculateDaysRemaining(todo.deadline) }} Days
          </div>
        </div>
      </footer>
    </div>
  </div>
  <div v-if="listTaskPerPaginate.length == 0">
    <p class="text-center text-xl my-20 dark:text-white">Menunggu Ada Tugas Baru</p>
  </div>
</template>

<style scoped>
.task:not(:last-child) {
  border-bottom: 2px solid black;
}
</style>
