<script setup lang="ts">
import { ref } from 'vue'
import { StickToBottom } from 'vue-stick-to-bottom'
import ScrollToBottom from './components/ScrollToBottom.vue'
import StopScroll from './components/StopScroll.vue'
import { useFakeMessages } from './composables/useFakeMessages'

const speed = ref(0.2)
const messagesA = useFakeMessages(speed)
const messagesB = useFakeMessages(speed)
</script>

<template>
  <div class="prose" style="display:flex; flex-direction:column; gap:24px; padding:24px; max-width:1200px; margin:0 auto;">
    <input
      v-model.number="speed"
      style="width:100%;"
      type="range"
      min="0"
      max="1"
      step="0.01"
    >

    <div style="display:flex; gap:24px; align-items:flex-start;">
      <div style="flex:1;">
        <h3 style="text-align:center;">
          smooth
        </h3>
        <StickToBottom style="height:50vh;" :initial="{ mass: 10 }" anchor="none">
          <div class="flex flex-col gap-4 p-6 select-text">
            <div v-for="m in messagesA" :key="m.id" class="rounded-lg p-4 shadow-sm break-words" :class="[m.large ? 'bg-gray-100 text-4xl font-extrabold leading-tight' : 'bg-gray-100']">
              {{ m.text }}
            </div>
          </div>
          <template #overlay>
            <ScrollToBottom />
          </template>
          <template #after>
            <StopScroll />
          </template>
        </StickToBottom>
      </div>

      <div style="flex:1;">
        <h3 style="text-align:center;">
          instant
        </h3>
        <StickToBottom style="height:50vh;" resize="instant" initial="instant" anchor="none">
          <div class="flex flex-col gap-4 p-6 select-text">
            <div v-for="m in messagesB" :key="m.id" class="rounded-lg p-4 shadow-sm break-words" :class="[m.large ? 'bg-gray-100 text-4xl font-extrabold leading-tight' : 'bg-gray-100']">
              {{ m.text }}
            </div>
          </div>
          <template #overlay>
            <ScrollToBottom />
          </template>
          <template #after>
            <StopScroll />
          </template>
        </StickToBottom>
      </div>
    </div>
  </div>
</template>
