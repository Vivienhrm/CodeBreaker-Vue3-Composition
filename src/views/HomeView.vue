<template>
  <div class="home-container">
    <div v-if="$route.query.error === 'pseudo_required'" class="error-banner">
      Veuillez renseigner votre pseudo pour accéder au jeu !
    </div>
    <header>
      <h1>Code Breaker</h1>
      <div class="code-animation">
        <span v-for="(digit, index) in code" :key="index" class="digit">
          {{ digit }}
        </span>
      </div>
    </header>

    <section class="rules">
      <h2>Règles du jeu</h2>
      <ul>
        <li>Un code secret à 4 chiffres uniques est généré.</li>
        <li>Vous avez 10 tentatives pour le deviner.</li>
        <li>Pour chaque essai, vous saurez :
          <ul>
            <li>Le nombre de chiffres <strong>justes et bien placés</strong>.</li>
            <li>Le nombre de chiffres <strong>justes mais mal placés</strong>.</li>
          </ul>
        </li>
      </ul>
    </section>

    <section class="pseudo-form">
      <h3>Prêt à jouer ?</h3>
      <form @submit.prevent="savePseudo">
        <input 
          v-model="localPseudo" 
          type="text" 
          placeholder="Entrez votre pseudo" 
          required 
        />
        <br />
        <button type="submit">Commencer la partie</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useGame } from '../services/game'

const { code, generateCode } = useGame()
const router = useRouter()
const pseudo = inject('pseudo')

const localPseudo = ref('')
const intervalId = ref(null)

const savePseudo = () => {
  if (localPseudo.value.trim()) {
    pseudo.value = localPseudo.value.trim()
    router.push('/game')
  }
}

onMounted(() => {
  generateCode()
  intervalId.value = setInterval(() => {
    generateCode()
  }, 2000)
})

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})
</script>

<style scoped>
.error-banner {
  background-color: #ff4d4d;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-weight: bold;
}

.home-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.code-animation {
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 2.5rem;
  font-weight: bold;
  height: 4rem;
  align-items: center;
}

.digit {
  padding: 10px;
  background: #333;
  border-radius: 8px;
  min-width: 50px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  animation: pulse 1s infinite alternate;
}

@keyframes pulse {
  from { transform: scale(1); opacity: 0.8; }
  to { transform: scale(1.1); opacity: 1; }
}

.rules {
  text-align: left;
  background: #2a2a2a;
  padding: 1.5rem;
  border-radius: 8px;
}

.rules ul {
  padding-left: 1.5rem;
}

.pseudo-form input {
  font-size: 1.2rem;
  width: 100%;
  max-width: 300px;
}
</style>
