<script setup lang="ts">
import { useStickToBottomContext } from 'stick-to-bottom-vue'

const { stopScroll } = useStickToBottomContext()
</script>

<template>
  <div class="flex justify-center pt-4">
    <button class="rounded bg-slate-600 text-white px-4 py-2" @click="() => stopScroll()">
      Stop Scroll
    </button>
  </div>
</template>
