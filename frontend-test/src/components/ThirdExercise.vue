<template>
  <div class="container-exercise-3">
    <div class="container-filter">
      <b-form @submit="searchByName">
        <b-form-group
        label="Buscar personaje"
        label-for="input-character"
        >
          <b-form-input v-model="search" id="input-character" type="text"></b-form-input>
        </b-form-group>
        <b-button type="submit">Buscar</b-button>
        <b-button variant="success" @click="createCharacter">crear</b-button>
      </b-form>
    </div>
    <div class="container-characters" @scroll="handleScroll" ref="scrollContainer">
      <b-card class="shadow bg-white rounded" v-show="charactersByName.length < 1" v-for="character in characters" :key="character.id">
        <b-card-title style="font-size: 1vw;">{{ character.name }}</b-card-title>
        <b-card-img :src="character.thumbnail.path + '.' + character.thumbnail.extension" alt="image character"
          style="height: 30vh;" class="border">
        </b-card-img>
        <label for="input-description"><b>Description</b></label>
        <b-card-text id="input-description">
          {{ shortDescription(character.description) || 'Without description' }}
        </b-card-text>
        <pre>{{ formatDate(character.modified) }}</pre>
        <b-button variant="success" @click="editCharacter(character)">Editar</b-button>
      </b-card>
      <b-card v-show="charactersByName.length > 0" v-for="character in charactersByName" :key="character.id">
        <b-card-title style="font-size: 1vw;">{{ character.name }}</b-card-title>
        <b-card-img :src="character.thumbnail.path + '.' + character.thumbnail.extension" alt="image character"
          style="height: 30vh;" class="border">
        </b-card-img>
        <b-card-text>
          {{ shortDescription(character.description) || 'Without description' }}
        </b-card-text>
        <pre>{{ formatDate(character.modified) }}</pre>
      </b-card>
    </div>
  </div>
</template>
<script>
import { findByName } from '@/utils/apiService'
export default {
  data() {
    return {
      charactersByName: [],
      search: ''
    }
  },
  props: {
    characters: {
      type: Array
    }
  },
  methods: {
    shortDescription(description) {
      const arrayDescription = description.split(' ')
      const shortDescription = arrayDescription.slice(0, 10)
      return arrayDescription.length < 10 ? description : shortDescription.join(' ') + '...'
    },
    handleScroll() {
      const scrollContainer = this.$refs.scrollContainer
      const bottomOfContainer = Math.ceil(scrollContainer.scrollTop + scrollContainer.clientHeight) >= scrollContainer.scrollHeight
      if (bottomOfContainer) {
        this.$emit('end-scroll')
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${day}-${month}-${year}`
    },
    async fetchCharactersByName() {
      try{
        const data = await findByName(this.search)
        this.charactersByName = data
      } catch(error) {
        console.error(error)
      }
    },
    searchByName(){
      event.preventDefault()
      this.fetchCharactersByName()
    },
    editCharacter(character){
      this.$emit('edit-character', character)
    },
    createCharacter(){
      this.$emit('create-character')
    }
  },
  watch:{
    search() {
      this.search === '' ? this.charactersByName = [] : null
    } 
  }
}
</script>
<style>
.container-exercise-3 {
  display: grid;
  grid-template-areas: 'filter results';
  gap: 0.8rem;
}

.container-characters {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.8rem;
  height: 80vh;
  overflow-y: auto;
  grid-area: 'results';
  margin: 1rem;
}

.container-filter{
  grid-area: 'filter';
}
</style>