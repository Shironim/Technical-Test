<script async setup>
import HeaderForm from './components/HeaderForm.vue'
import TodoListTask from './components/TodoListTask.vue'
import { watchEffect } from 'vue'
import { ref } from 'vue'
import { provide } from 'vue'

let allTask = ref([])
const postsPerPage = ref(3) // size
provide('allTask', {
  allTask
})
provide('postsPerPage', {
  postsPerPage,
  changePostPerpage: (event) => {
    postsPerPage.value = event.target.value
  }
})

watchEffect(() => {
  if (localStorage.getItem('allTask')) {
    let local = localStorage.getItem('allTask')
    allTask.value = JSON.parse(local)
  } else {
    localStorage.setItem('allTask', [])
  }
})

import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()

const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="todo bg-sky-500 min-h-screen">
    <div class="flex justify-center">
      <button
        @click="toggleDark()"
        class="px-4 py-2 border-2 bg-white rounded-md mb-8 font-bold dark:bg-slate-600 dark:text-white dark:border-slate-600"
      >
        Dark Mode Is {{ isDark ? 'On' : 'Off' }}
      </button>
    </div>
    <HeaderForm />
    <Suspense>
      <div>
        <TodoListTask />
      </div>
      <template #fallback>
        <div>Loading</div>
      </template>
    </Suspense>
  </div>
</template>

<style>
.shadowApp {
  box-shadow: 0px 1px 8px 3px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 1px 8px 3px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 1px 8px 3px rgba(0, 0, 0, 0.1);
}

#app {
  /* width: 1280px; */
  /* margin: 0 auto; */
  padding: 4rem 0;
  background-color: rgb(14 165 233);
}

.todo {
  width: 500px;
  /* margin: 4rem auto; */
  margin: 0 auto;
}
</style>
