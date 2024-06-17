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
        <ThirdExercise @edit-character="showModal" @create-character="showModalNewCharacter" :characters="characters" @end-scroll="loadInfiniteScroll"></ThirdExercise>
      </b-tab>
    </b-tabs>
    <ModalCharacter :id="modalId" :character="characterInfo"></ModalCharacter>
    <ModalCharacter :id="modalCreateCharacterId" :isCreate=true @create-new-character="addChr"></ModalCharacter>
  </div>
</template>

<script>
import FirstExercise from './components/FirstExercise.vue'
import SecondExercise from './components/SecondExercise.vue'
import ThirdExercise from './components/ThirdExercise.vue'
import ModalCharacter from './components/modalCharacter.vue';
import { getCharacters } from '@/utils/apiService'


export default {
  name: 'App',
  components: {
    FirstExercise,
    SecondExercise,
    ThirdExercise,
    ModalCharacter
  },
  data(){
    return {
      modalId: 'modal-character',
      modalCreateCharacterId:'modal-create-character',
      characterInfo: {},
      characters: [],
      offset: 0,

    }
  },
  methods: {
    async fetchCharacters() {
      try {
        const data = await getCharacters(this.offset, '')
        const newCharacters = data
        this.characters.push(...newCharacters)
        this.offset = this.characters.length
      } catch (error) {
        console.error('Error en el request ', error)
      }
    },
    showModal(character) {
      this.characterInfo = character
      this.$bvModal.show(this.modalId)
    },
    loadInfiniteScroll(){
      this.fetchCharacters()
    },
    showModalNewCharacter(){
      this.$bvModal.show(this.modalCreateCharacterId)
    },
    addChr(newCharacter){
      this.characters.unshift(newCharacter)
      this.$bvModal.hide(this.modalCreateCharacterId)
    }
  },
  mounted() {
    this.fetchCharacters()
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
