<template>
  <div class="game-container">
    <header v-if="pseudo">
      <h2>Bonne chance {{ pseudo }}, montres de quoi tu es capable !</h2>
      <p v-if="state === 'playing'">Devinez le code secret à 4 chiffres.</p>
    </header>

    <section v-if="state === 'won'" class="result won">
      <h3>Bien joué {{ pseudo }} ! T'es un vrai champion ! 🏆</h3>
      <p>Le code était bien : <strong>{{ code.join(' ') }}</strong></p>
      <button @click="resetGame">Nouvelle partie</button>
    </section>

    <section v-else-if="state === 'lost'" class="result lost">
      <h3>Dommage {{ pseudo }}, tu as perdu !! 😢</h3>
      <p>Le code était : <strong>{{ code.join(' ') }}</strong></p>
      <button @click="resetGame">Réessayer</button>
    </section>

    <div v-if="state === 'playing'" class="game-play">
      <!-- Input component will go here in Exercice 4 -->
      <p class="info">Tentatives : {{ attempts.length }} / 10</p>
    </div>

    <section class="history" v-if="attempts.length > 0">
      <h3>Historique des tentatives</h3>
      <div v-for="(attempt, index) in reversedAttempts" :key="attempts.length - index" class="attempt-card">
          <div class="attempt-code">
            <span v-for="d in attempt.guess" class="digit">{{ d }}</span>
          </div>
          <div class="attempt-feedback">
            <span class="well-placed">✅ {{ attempt.wellPlaced }}</span>
            <span class="misplaced">⚠️ {{ attempt.misplaced }}</span>
          </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { inject, onMounted, computed } from 'vue'
import { useGame } from '../services/game'

const pseudo = inject('pseudo')
const { code, attempts, state, generateCode, validateAttempt } = useGame()

const reversedAttempts = computed(() => [...attempts.value].reverse())

const resetGame = () => {
  generateCode()
}

onMounted(() => {
  generateCode()
})
</script>

<style scoped>
.game-container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.result {
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid;
}

.won {
  background: rgba(66, 184, 131, 0.1);
  border-color: #42b883;
}

.lost {
  background: rgba(255, 77, 77, 0.1);
  border-color: #ff4d4d;
}

.history {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.attempt-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2a2a2a;
  padding: 10px 20px;
  border-radius: 8px;
  animation: slideIn 0.3s ease-out;
}

.attempt-code {
  display: flex;
  gap: 5px;
}

.attempt-code .digit {
  background: #444;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
}

.attempt-feedback {
  display: flex;
  gap: 15px;
  font-weight: bold;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
