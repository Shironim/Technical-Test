<script setup>
defineProps({
  kategoris: {
    type: Array,
    default: []
  },
  activeFilter: {
    type: String,
    default: 'All'
  }
})
defineEmits(['filterKategori'])
</script>
<template>
  <div class="flex gap-x-4">
    <button
      v-on:click="$emit('filterKategori', 'All')"
      type="button"
      class="shadow-sm rounded px-2 py-1 w-full"
      :class="[
        activeFilter === 'All'
          ? 'bg-sky-300 dark:bg-slate-300 font-bold text-white dark:text-black'
          : 'bg-sky-100'
      ]"
    >
      All
    </button>
    <div v-for="(kategori, i) in kategoris" :key="i">
      <!-- Emit with parameter -->
      <button
        type="button"
        v-on:click="$emit('filterKategori', kategori)"
        :class="[
          activeFilter === kategori
            ? 'bg-sky-300 dark:bg-slate-300 font-bold text-white dark:text-black'
            : 'bg-sky-100'
        ]"
        class="shadow-sm rounded px-2 py-1 w-full"
      >
        {{ kategori }}
      </button>
    </div>
    <button
      v-on:click="$emit('filterKategori', 'Done')"
      type="button"
      class="shadow-sm rounded px-2 py-1 w-full"
      :class="[
        activeFilter === 'Done'
          ? 'bg-sky-300 dark:bg-slate-300 font-bold text-white dark:text-black'
          : 'bg-sky-100'
      ]"
    >
      Done
    </button>
  </div>
</template>
