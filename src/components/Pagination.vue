<script setup>
const props = defineProps({
  paginate: {
    type: Array,
    default: () => []
  },
  currentPage: {
    type: Number
  }
})
import { inject, watchEffect } from 'vue'

const { postsPerPage, changePostPerpage } = inject('postsPerPage')
watchEffect(() => {
  console.log(postsPerPage.value)
})
const viewCount = [3, 5, 10]
const emit = defineEmits(['changePage'])
</script>
<template>
  <div class="flex justify-between">
    <div class="grid grid-flow-col place-self-center">
      <p class="self-center mr-4 font-bold dark:text-white">Page</p>
      <span
        v-for="page in paginate"
        @click="$emit('changePage', page)"
        :class="[
          currentPage == page ? 'font-bold text-white bg-sky-900' : 'bg-white dark:bg-slate-400'
        ]"
        class="px-2 mr-2 py-1 border rounded border-sky-400 text-md min-w-8 text-center"
      >
        {{ page }}
      </span>
    </div>
    <div class="flex border-2 rounded-md px-3 py-2 border-blue-300">
      <p class="self-center pr-2 dark:text-white">Show</p>
      <select @change="changePostPerpage($event)" class="self-center rounded-sm px-2">
        <option v-for="count in viewCount" :value="count">{{ count }}</option>
      </select>
    </div>
  </div>
</template>
