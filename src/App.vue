<script setup>
import { inject } from 'vue'
const pseudo = inject('pseudo')
</script>

<template>
  <nav>
    <router-link to="/home">Accueil</router-link>
    <router-link to="/game">Jeu</router-link>
    <router-link to="/stats">Stats</router-link>
    <span v-if="pseudo" class="user-pseudo">👤 {{ pseudo }}</span>
  </nav>
  <main>
    <router-view></router-view>
  </main>
</template>

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  color-scheme: light dark;
  background-color: #242424;
  color: #ffffff;
}

body {
  margin: 0;
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

#app {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

nav {
  margin-bottom: 2rem;
  padding: 1rem;
  border-bottom: 1px solid #444;
}

nav a {
  margin: 0 15px;
  color: #888;
  text-decoration: none;
  font-weight: 500;
}

nav a.router-link-active {
  color: #42b883;
  border-bottom: 2px solid #42b883;
}

.user-pseudo {
  margin-left: auto;
  font-weight: bold;
  color: #42b883;
  padding: 0 15px;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #3aa876;
}

input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #444;
  background: #333;
  color: white;
  margin: 10px 0;
}

</style>
