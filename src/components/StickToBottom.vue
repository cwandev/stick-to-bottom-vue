<script setup lang="ts">
import { computed, provide, watch } from 'vue'
import useStickToBottom from '../composables/useStickToBottom'
import { StickToBottomKey } from '../context/stickToBottom'

defineOptions({ name: 'StickToBottom' })

const props = defineProps<StickToBottomProps>()

export interface StickToBottomProps {
  resize?: 'instant' | { damping?: number, stiffness?: number, mass?: number }
  initial?: boolean | 'instant' | { damping?: number, stiffness?: number, mass?: number }
  targetScrollTop?: (target: number, ctx: { scrollElement: HTMLElement, contentElement: HTMLElement }) => number
  damping?: number
  stiffness?: number
  mass?: number
  anchor?: 'auto' | 'none'
}

const { scrollRef, contentRef, isAtBottom, isNearBottom, escapedFromLock, scrollToBottom, stopScroll, setOptions } = useStickToBottom({
  resize: props.resize as any,
  initial: props.initial as any,
  targetScrollTop: props.targetScrollTop,
  damping: props.damping,
  stiffness: props.stiffness,
  mass: props.mass,
})

const context = {
  scrollRef,
  contentRef,
  isAtBottom,
  isNearBottom,
  escapedFromLock,
  scrollToBottom,
  stopScroll,
}

provide(StickToBottomKey, context)

defineExpose(context)

// Respond to prop changes, sync engine parameters in real time
watch(
  () => [
    props.resize,
    props.initial,
    props.damping,
    props.stiffness,
    props.mass,
    props.targetScrollTop,
  ],
  () => {
    setOptions({
      resize: props.resize as any,
      initial: props.initial as any,
      targetScrollTop: props.targetScrollTop,
      damping: props.damping,
      stiffness: props.stiffness,
      mass: props.mass,
    })
  },
  { flush: 'post' },
)

const overflowAnchor = computed(() => props.anchor ?? 'auto')
</script>

<template>
  <!-- Single root: forward external style/class to the root so height:50vh works -->
  <div style="height: 100%; width: 100%;">
    <div style="position: relative; height: 100%; width: 100%;">
      <div ref="scrollRef" :style="{ 'overflow-anchor': overflowAnchor, 'overflow': 'auto', 'height': '100%', 'width': '100%' }">
        <div ref="contentRef">
          <slot />
        </div>
      </div>

      <!-- Overlay layer: floats above scrolling content (e.g. action buttons) -->
      <slot name="overlay" />
    </div>

    <!-- Out-of-scroll area (e.g. external controls) -->
    <slot name="after" />
  </div>
</template>
