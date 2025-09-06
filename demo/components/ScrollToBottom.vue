<script setup lang="ts">
import { useStickToBottomContext } from 'vue-stick-to-bottom'

const { isAtBottom, scrollToBottom } = useStickToBottomContext()
</script>

<template>
  <button
    v-if="!isAtBottom"
    class="absolute i-ph-arrow-circle-down-fill text-4xl rounded-lg"
    style="left:50%; transform:translateX(-50%); bottom:8px;"
    @click="() => scrollToBottom()"
  />
</template>
