<template>
  <div id="app">
    <b-tabs>
      <b-tab title="Primer ejercicio">
        <FirstExercise></FirstExercise>
      </b-tab>
      <b-tab title="Segundo ejercicio">
        <SecondExercise></SecondExercise>
      </b-tab>
      <b-tab title="Tercer ejercicio">
        <ThirdExercise></ThirdExercise>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import FirstExercise from './components/FirstExercise.vue'
import SecondExercise from './components/SecondExercise.vue'
import ThirdExercise from './components/ThirdExercise.vue'


export default {
  name: 'App',
  components: {
    FirstExercise,
    SecondExercise,
    ThirdExercise
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
  margin-top: 60px;
}
</style>
