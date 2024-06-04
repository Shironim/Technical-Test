<script setup>
import { ref, computed } from 'vue'
import FilterComponent from './FilterComponent.vue'
import ListTask from './ListTask.vue'
import Pagination from './Pagination.vue'
// All Data
import { inject } from 'vue'
const data = inject('allTask')
const { postsPerPage } = inject('postsPerPage')

// Paginasi

const props = defineProps({
  datas: {
    type: Array,
    default: [
      {
        task: 'dummy',
        kategori: 'dummy',
        deskripsi: 'dummy',
        start: 'dummy',
        end: 'dummy'
      }
    ]
  }
})

const currentPage = ref(1)

// Filter & Kategori
const activeFilter = ref('All')
const allKategori = ref(['Personal', 'College', 'Intern'])
const filter = (type) => {
  activeFilter.value = type
  currentPage.value = 1
}

// Get Data
const getTodo = computed(() => {
  if (activeFilter.value === 'All') {
    return data.allTask.value
  }
  if (activeFilter.value === 'Done') {
    return data.allTask.value.filter((item) => {
      return item.status == true
    })
  }
  return data.allTask.value.filter((item) => {
    return item.kategori == activeFilter.value
  })
})
const gantiHalaman = (page) => {
  currentPage.value = page
}
const getPerPaginate = computed(() => {
  const indexOfLastPost = currentPage.value * postsPerPage.value
  const indexOfFirstPost = indexOfLastPost - postsPerPage.value
  return getTodo?.value?.slice(indexOfFirstPost, indexOfLastPost)
})

const paginate = computed(() => {
  let pageNumbers = []
  for (let i = 1; i <= Math.ceil(getTodo?.value?.length / postsPerPage.value); i++) {
    pageNumbers.push(i)
  }
  return pageNumbers
})

// Delete data
defineEmits(['update-data'])

const deleteData = (idTask) => {
  const taskToRemove = data.allTask.value.filter((task) => {
    return task.id != idTask
  })
  data.allTask.value = taskToRemove
  localStorage.setItem('allTask', JSON.stringify(taskToRemove))
}

const updateStatus = (idTask) => {
  let oldTask = data.allTask.value.find((task) => task.id === idTask)
  const index = data.allTask.value.findIndex((task) => task.id === idTask)
  if (index !== -1) {
    let newTask = {
      task: oldTask.task,
      kategori: oldTask.kategori,
      deskripsi: oldTask.deskripsi,
      start: oldTask.start,
      deadline: oldTask.deadline,
      status: true
    }
    data.allTask.value[index] = newTask
    localStorage.setItem('allTask', JSON.stringify(data.allTask.value))
  }
}
</script>
<template>
  <main class="mt-6">
    <section class="bg-white mb-6 shadowApp rounded grid gap-y-4 p-4 dark:bg-slate-600">
      <h2 class="text-2xl pb-4 font-bold dark:text-white">Kategori</h2>
      <FilterComponent
        :kategoris="allKategori"
        :activeFilter="activeFilter"
        @filterKategori="filter"
      />
    </section>
    <section class="shadowApp mb-2 bg-white p-4 grid gap-y-4 rounded dark:bg-slate-600">
      <ListTask
        :listTaskPerPaginate="getPerPaginate"
        @deleteData="deleteData"
        @updateStatus="updateStatus"
      />
    </section>
    <section class="shadowApp bg-white p-4 grid gap-y-4 rounded dark:bg-slate-600">
      <Pagination :paginate="paginate" :currentPage="currentPage" @changePage="gantiHalaman" />
    </section>
  </main>
</template>
