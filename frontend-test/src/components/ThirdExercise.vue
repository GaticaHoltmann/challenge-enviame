<template>
  <div class="container-characters" @scroll="handleScroll" ref="scrollContainer">
    <b-card 
    v-for="character in characters" 
    :key="character.id"
    >
    <b-card-title style="font-size: 1vw;">{{ character.name }}</b-card-title>
    <b-card-img
    :src="character.thumbnail.path + '.' + character.thumbnail.extension"
    alt="image character"
    style="height: 30vh;"
    class="border"
    >
    </b-card-img>
    <b-card-text>
      {{ shortDescription(character.description) || 'Without description' }}
    </b-card-text>
  </b-card>

  </div>
</template>
<script>
import { getCharacters } from '@/utils/apiService';
export default{
  data() {
    return {
      characters: [],
      offset: 0
    }
  },
  methods:{
    setInitialData() {
    },
    async fetchCharacters() {
      try {
        const data = await getCharacters(this.offset) 
        const newCharacters = data
        this.characters.push(...newCharacters)
        this.offset = this.characters.length
      } catch(error) {
        console.error('Error en el request ', error)
      }
    },
    shortDescription(description){
      const arrayDescription = description.split(' ')
      const shortDescription = arrayDescription.slice(0, 10)
      return arrayDescription.length < 10 ? description : shortDescription.join(' ') + '...'
    },
    handleScroll(){
      const scrollContainer = this.$refs.scrollContainer
      const bottomOfContainer = Math.ceil(scrollContainer.scrollTop + scrollContainer.clientHeight) >= scrollContainer.scrollHeight
      if (bottomOfContainer) {
        this.fetchCharacters()
      }
    }
  },
  mounted() {
    this.fetchCharacters()
  }
}
</script>
<style>
.container-characters {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  height: 80vh;
  overflow-y: auto;
}
</style>