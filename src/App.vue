<script setup>
</script>

<template>
  <nav>
    <router-link to="/home">Accueil</router-link>
    <router-link to="/game">Jeu</router-link>
    <router-link to="/stats">Stats</router-link>
  </nav>
  <main>
    <router-view></router-view>
  </main>
</template>

<style>
  :root {
  font-family: Inter, system-ui, Arial, sans-serif;
  background-color: #242424;
  color: #fff;
}

body {
  margin: 0;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

button {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

input {
  padding: 10px;
  border-radius: 4px;
}

nav a + a {
  margin-left: 1rem;
  position: relative;
  padding-left: 1rem;
}

nav a + a::before {
  content: "|";
  position: absolute;
  left: 0;
  color: #888;
}

</style>
