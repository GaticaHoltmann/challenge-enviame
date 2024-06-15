<template>
  <div>
    <h1>Obtener número primos</h1>
    <p>
      Crear un script (javascript/nodejs) que reciba un rango entre A y B y a partir de este rango se muestren en
      pantalla los números primos.
    </p>
    <b-card>
      <h2>Solución</h2>
      <b-form @submit="getPrimes">
        <b-form-group label="Ingresa primer número" label-for="first_number">
          <b-form-input id="first_number" type="number" v-model="firstNumber" required></b-form-input>
        </b-form-group>
        <b-form-group label="Ingrese segundo número" label-for="second_number">
          <b-form-input id="second_number" type="number" v-model="secondNumber"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" :disabled=!enableButton>Mostrar primos</b-button>
        <p v-show="primeNumbers.length > 1">Los números primos del rango indicados son : {{ primeNumbers }}</p>
      </b-form>
    </b-card>
  </div>
</template>
<script>
import { calculatePrimes } from '../utils/utils'
export default {
  data() {
    return {
      firstNumber: 0,
      secondNumber: 0,
      primeNumbers: []
    }
  },
  computed: {
    enableButton() {
      return this.firstNumber !== null && this.secondNumber !== 0 && parseInt(this.firstNumber) < parseInt(this.secondNumber)
    }
  },
  watch: {
    firstNumber() {
      this.primeNumbers = []
    },
    secondNumber() {
      this.primeNumbers = []
    }
  },
  methods: {
    getPrimes() {
      event.preventDefault()
      this.primeNumbers = calculatePrimes(this.firstNumber, this.secondNumber)
    }
  }
}
</script>
<style></style>