import type { Ref } from 'vue'
import { LoremIpsum } from 'lorem-ipsum'
import { onBeforeUnmount, onMounted, ref } from 'vue'

export interface DemoMessage {
  id: number
  text: string
  large?: boolean
}

export function useFakeMessages(speed: Ref<number> | number) {
  const messages = ref<DemoMessage[]>([])
  let timer: any
  const lorem = new LoremIpsum({
    sentencesPerParagraph: { max: 2, min: 1 },
    wordsPerSentence: { max: 12, min: 3 },
  })

  const getSpeed = () => (typeof speed === 'number' ? speed : speed.value)

  let nextId = 1

  function pushOne() {
    const makeLarge = Math.random() < 0.22
    messages.value.push({
      id: nextId++,
      text: makeLarge ? lorem.generateWords(10) : lorem.generateSentences(Math.random() < 0.5 ? 1 : 2),
      large: makeLarge,
    })
  }

  function schedule() {
    clearInterval(timer)
    const s = Math.max(0, Math.min(1, getSpeed()))
    const interval = 80 + (1 - s) * 500
    timer = setInterval(() => {
      pushOne()
      if (Math.random() < 0.8)
        pushOne()
      if (Math.random() < 0.5)
        pushOne()
    }, interval)
  }

  onMounted(() => {
    for (let i = 0; i < 20; i++) pushOne()
    schedule()
  })

  onBeforeUnmount(() => {
    clearInterval(timer)
  })

  if (typeof speed !== 'number') {
    let last = speed.value
    const id = setInterval(() => {
      if (speed.value !== last) {
        last = speed.value
        schedule()
      }
    }, 100)
    onBeforeUnmount(() => clearInterval(id))
  }

  return messages
}
