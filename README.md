## stick-to-bottom-vue

A lightweight Vue utility intended mainly for AI chat applications, for smoothly sticking to the bottom of messages. It preserves visual stability on resize, allows user escape by scrolling up, and exposes handy methods and refs.

### Features

- Zero runtime dependencies
- Tree-shakable (`sideEffects: false`), ESM build with type declarations
- Smooth spring animation and instant mode
- Works with ResizeObserver; optional `overflow-anchor: none`

### Install

```bash
pnpm add stick-to-bottom-vue
# or npm i / yarn add
```

### Quick start (component)

```vue
<script setup lang="ts">
import { StickToBottom } from 'stick-to-bottom-vue'

const messages = Array.from({ length: 20 }, (_, i) => `Message ${i}`)
</script>

<template>
  <StickToBottom style="height: 320px;">
    <ul>
      <li v-for="m in messages" :key="m">
        {{ m }}
      </li>
    </ul>
  </StickToBottom>
</template>
```

### Quick start (composable)

```ts
import { useStickToBottom } from 'stick-to-bottom-vue'
import { onMounted } from 'vue'

const { scrollRef, contentRef, isAtBottom, scrollToBottom, stopScroll } = useStickToBottom({
  initial: { mass: 10 },
  resize: 'instant',
})

onMounted(() => {
  if (!isAtBottom.value)
    scrollToBottom()
})
```

```vue
<template>
  <div ref="scrollRef" style="height: 320px; overflow: auto;">
    <div ref="contentRef">
      <slot />
    </div>
  </div>
</template>
```

### API

- Component `StickToBottom`
  - Props
    - `initial?: boolean | 'instant' | { damping?: number; stiffness?: number; mass?: number }`
    - `resize?: 'instant' | { damping?: number; stiffness?: number; mass?: number }`
    - `targetScrollTop?: (target: number, ctx: { scrollElement: HTMLElement; contentElement: HTMLElement }) => number`
    - `damping?: number` (default 0.7)
    - `stiffness?: number` (default 0.05)
    - `mass?: number` (default 1.25)
    - `anchor?: 'auto' | 'none'` (maps to CSS overflow-anchor)
  - Slots
    - default: your scrollable content
    - `overlay`: floating elements over the scroll area (e.g., a “scroll to bottom” button)
    - `after`: out-of-scroll controls below the container (e.g., “Stop Scroll”)

- Composable `useStickToBottom(options?)`
  - Returns
    - `scrollRef`, `contentRef`: attach to container and content nodes
    - `isAtBottom`, `isNearBottom`, `escapedFromLock`: reactive states
    - `scrollToBottom(options?)`, `stopScroll()`

### Behavior highlights

- Smooth spring animation to approach bottom; instant mode supported.
- Resize-safe: maintains visual stability when content grows or shrinks.
- User escape: scrolling up cancels stickiness; near-bottom scrolling resumes it.
- Optional `overflow-anchor: none` to avoid browser scroll anchoring conflicts.

### Demo

Run the built-in demo:

```bash
pnpm dev
```

This opens a playground showcasing smooth vs instant columns, a speed slider, a floating “scroll to bottom” control, and an external “Stop Scroll” button.
