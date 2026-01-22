import { ref } from 'vue'

export const profilePlugin = {
  install(app) {
    const pseudo = ref('')
    app.provide('pseudo', pseudo)
  }
}
