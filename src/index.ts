import type { App } from 'vue'
import StickToBottom from './components/StickToBottom.vue'

export { default as StickToBottom } from './components/StickToBottom.vue'

export default {
  install(app: App) {
    app.component('StickToBottom', StickToBottom)
  },
}
