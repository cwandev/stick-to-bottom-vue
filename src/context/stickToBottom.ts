import type { InjectionKey, Ref } from 'vue'
import type { ScrollToBottom, StopScroll } from '../core/engine'
import { inject } from 'vue'

export interface StickToBottomContext {
  scrollRef: Ref<HTMLElement | null | undefined>
  contentRef: Ref<HTMLElement | null | undefined>
  isAtBottom: Ref<boolean | undefined>
  isNearBottom: Ref<boolean | undefined>
  escapedFromLock: Ref<boolean | undefined>
  scrollToBottom: ScrollToBottom
  stopScroll: StopScroll
}

export const StickToBottomKey: InjectionKey<StickToBottomContext> = Symbol('StickToBottom')

export function useStickToBottomContext(): StickToBottomContext {
  const ctx = inject(StickToBottomKey, null)
  if (!ctx) {
    throw new Error('useStickToBottomContext must be used within <StickToBottom>')
  }
  return ctx
}
