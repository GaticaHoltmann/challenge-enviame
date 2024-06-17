<template>
  <b-modal :hide-footer="isCreate" :id="id" @ok="handleOk" @cancel="cancelEdit">
    <div>
      <b-img thumbnail fluid v-show="imageUrl !== null" :src="imageUrl"></b-img>
      <b-form-group label="Thumbnail" label-for="input-thumbnail">
        <b-form-input id="input-thumbnail" type="url" v-model="imageUrl"></b-form-input>
      </b-form-group>
      <b-form>
        <b-form-group label="Name" label-for="input-name">
          <b-form-input id="input-name" v-model="name"></b-form-input>
        </b-form-group>
        <b-form-group label="Description" label-for="input-description">
          <b-form-input id="input-description" v-model="description"></b-form-input>
        </b-form-group>
      </b-form>
      <b-button v-if="isCreate" variant="success" @click="createNewCharacter">Crear</b-button>
    </div>
  </b-modal>
</template>
<script>
export default {
  data() {
    return {
      infoCharacter: {},
      name: '',
      description: '',
      newThumbnail: null,
      newData: {},
      imageUrl: ''

    }
  },
  props: {
    character: {
      type: Object
    },
    id: {
      type: String
    },
    isCreate: {
      type: Boolean
    }
  },
  watch: {
    character() {
      this.infoCharacter = this.character
      this.imageUrl = this.infoCharacter.thumbnail?.path + '.' + this.infoCharacter.thumbnail?.extension
      this.name = this.character.name
      this.description = this.character.description
    }
  },
  methods: {
    handleOk() {
      this.newData = this.infoCharacter
      this.newData.thumbnail.path = this.imageUrl.split('.jpg')[0]
      this.newData.name = this.name
      this.newData.description = this.description
      console.log('handleok')
    },
    cancelEdit(){
      this.infoCharacter = this.character
      this.name = this.character.name
      this.description = this.character.description
    },
    createNewCharacter(){
      let newCharacter = {
        name: this.name,
        description: this.description,
        thumbnail: {
          path: this.imageUrl.split('.jpg'),
          extension: '.jpg'
        },
        modified: Date.now()
      }
      console.log('create', newCharacter)
      this.$emit('create-new-character', newCharacter)
      this.name = ''
      this.description = ''
      this.imageUrl = ''
    }
  }
}
</script>
<style></style>