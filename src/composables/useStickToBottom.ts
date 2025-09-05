import type { ScrollToBottom, ScrollToBottomOptions, StickToBottomOptions, StickToBottomPublicState, StopScroll } from '../core/engine'
import { onBeforeUnmount, onMounted, ref, shallowRef, watchEffect } from 'vue'
import createStickToBottomEngine from '../core/engine'

export interface UseStickToBottomReturn {
  scrollRef: ReturnType<typeof ref<HTMLElement | null>>
  contentRef: ReturnType<typeof ref<HTMLElement | null>>
  isAtBottom: ReturnType<typeof ref<boolean>>
  isNearBottom: ReturnType<typeof ref<boolean>>
  escapedFromLock: ReturnType<typeof ref<boolean>>
  scrollToBottom: ScrollToBottom
  stopScroll: StopScroll
  setOptions: (options: Partial<StickToBottomOptions>) => void
}

export function useStickToBottom(options: StickToBottomOptions = {}): UseStickToBottomReturn {
  const scrollRef = ref<HTMLElement | null>(null)
  const contentRef = ref<HTMLElement | null>(null)

  const isAtBottom = ref<boolean>(options.initial !== false)
  const isNearBottom = ref<boolean>(false)
  const escapedFromLock = ref<boolean>(false)

  const engine = shallowRef(createStickToBottomEngine(options))

  const unsubscribe = shallowRef<null | (() => void)>(null)

  function bind() {
    if (!scrollRef.value || !contentRef.value)
      return
    engine.value.attach(scrollRef.value, contentRef.value)
    unsubscribe.value = engine.value.onChange((s: StickToBottomPublicState) => {
      isAtBottom.value = s.isAtBottom
      isNearBottom.value = s.isNearBottom
      escapedFromLock.value = s.escapedFromLock
    })
  }

  function unbind() {
    unsubscribe.value?.()
    unsubscribe.value = null
    engine.value.detach()
  }

  onMounted(() => {
    bind()
  })

  onBeforeUnmount(() => {
    unbind()
    engine.value.destroy()
  })

  watchEffect((onCleanup) => {
    if (!scrollRef.value || !contentRef.value)
      return
    bind()
    onCleanup(() => unbind())
  })

  function setOptions(next: Partial<StickToBottomOptions>) {
    engine.value.setOptions(next)
  }

  const api: UseStickToBottomReturn = {
    scrollRef,
    contentRef,
    isAtBottom,
    isNearBottom,
    escapedFromLock,
    scrollToBottom: (opts?: ScrollToBottomOptions) => engine.value.scrollToBottom(opts),
    stopScroll: () => engine.value.stopScroll(),
    setOptions,
  }

  return api
}

export default useStickToBottom
