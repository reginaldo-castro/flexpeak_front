<template>
  
  <HeaderNavBar title="PERFUMES"/>
  
  <Producao/>
  <Estoque/>
</template>

<script>
import HeaderNavBar from './components/HeaderNavBar.vue'
import Estoque from './components/Estoque.vue'
import Producao from './components/Producao.vue'
//import router from './routes/index'
export default {
  name: 'App',
  components: {
    HeaderNavBar, 
    Estoque,
    Producao
    
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
