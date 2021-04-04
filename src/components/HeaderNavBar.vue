<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <span class="navbar-brand mb-0 h1">{{title}}</span>
      <navigation-link>Estoque</navigation-link>
      </div>
      
    </nav>
    
</template>

<script setup>
//import Estoque from './components/Estoque.vue'
import { defineProps } from 'vue'

defineProps({
  title: String
})
</script>

<style scoped>
a {
  color: #42b983;
}

</style>