# vue-stick-to-bottom

> Designed with AI chat bots in mind, unofficial port of [use-stick-to-bottom](https://github.com/stackblitz-labs/use-stick-to-bottom).

[![npm version](https://img.shields.io/npm/v/vue-stick-to-bottom.svg?style=flat-square)](https://www.npmjs.com/package/vue-stick-to-bottom)
[![npm downloads](https://img.shields.io/npm/dm/vue-stick-to-bottom.svg?style=flat-square)](https://www.npmjs.com/package/vue-stick-to-bottom)

A lightweight Vue component and composable designed for AI chat applications to smoothly stick to the bottom of messages.

## Features

- 🪶 Zero runtime dependencies
- 📦 Tree-shakable, ESM build with type declarations
- 🪄 Smooth spring animation and instant mode
- 🚀 Works with ResizeObserver

## Install

```bash
pnpm add vue-stick-to-bottom
# or npm i / yarn add
```

## Usage

### `<StickToBottom>` component

```html
<template>
  <StickToBottom class="relative h-[50vh] w-full">
    <Message v-for="m in messages" :key="m.id" :message="m" />
    <ScrollToBottom />
  </StickToBottom>
</template>
```

`ScrollToBottom`:

```html
<script setup lang="ts">
import { useStickToBottomContext } from 'vue-stick-to-bottom'

const { isAtBottom, scrollToBottom } = useStickToBottomContext()
</script>

<template>
  <button v-if="!isAtBottom" @click="scrollToBottom()">↓</button>
</template>
```

### `useStickToBottom` composable

```html
<script setup lang="ts">
import { useStickToBottom } from 'vue-stick-to-bottom'

const { scrollRef, contentRef, isAtBottom, scrollToBottom } = useStickToBottom()
</script>

<template>
  <div ref="scrollRef" style="overflow: auto; height: 50vh;">
    <div ref="contentRef">
      <Message v-for="m in messages" :key="m.id" :message="m" />
    </div>
  </div>
  
  <button v-if="!isAtBottom" @click="scrollToBottom()">↓</button>
</template>
```

## API

- Component `StickToBottom`
  - Props
    - `initial?: boolean | 'instant' | { damping?: number; stiffness?: number; mass?: number }`
    - `resize?: 'instant' | { damping?: number; stiffness?: number; mass?: number }`
    - `targetScrollTop?: (target: number, ctx: { scrollElement: HTMLElement; contentElement: HTMLElement }) => number`
    - `damping?: number` (default 0.7)
    - `stiffness?: number` (default 0.05)
    - `mass?: number` (default 1.25)
    - `anchor?: 'auto' | 'none'` (maps to CSS overflow-anchor)

- Composable `useStickToBottom(options?)`
  - Returns
    - `scrollRef`, `contentRef`: attach to container and content nodes
    - `isAtBottom`, `isNearBottom`, `escapedFromLock`: reactive states
    - `scrollToBottom(options?)`, `stopScroll()`

## Behavior highlights

- Smooth spring animation to approach bottom; instant mode supported.
- Resize-safe: maintains visual stability when content grows or shrinks.
- User escape: scrolling up cancels stickiness; near-bottom scrolling resumes it.
- Optional `overflow-anchor: none` to avoid browser scroll anchoring conflicts.

## Demo

Run the built-in demo:

```bash
pnpm dev
```

This opens a playground showcasing smooth vs instant columns, a speed slider, a floating “scroll to bottom” control, and an external “Stop Scroll” button.
