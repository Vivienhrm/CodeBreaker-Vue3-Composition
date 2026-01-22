import { ref } from 'vue'

export const pseudo = ref('')

export const profilePlugin = {
  install(app) {
    app.provide('pseudo', pseudo)
  }
}
