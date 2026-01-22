<template>
  <div class="stats">
    <h1>Statistiques de {{ pseudo }}</h1>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const pseudo = inject('pseudo')
</script>
