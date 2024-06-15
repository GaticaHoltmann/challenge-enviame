<template>
  <div>
    <section>

    </section>
    <section class="container-previews">
      <b-form-textarea class="border first-data" plaintext id="couriers" v-model="couriers" rows="10" no-resize>
      </b-form-textarea>
      <b-form-textarea class="border second-data" plaintext id="textarea" v-model="places" rows="10" no-resize>
      </b-form-textarea>
      <div class="results">
        <b-button v-b-toggle.firstResult>Los servicios para cada localidad con mayor limite</b-button>
        <b-button v-b-toggle.firstResult-2>La localidad con mayor cantidad de servicios disponibles</b-button>
        <b-button v-b-toggle.firstResult-3>El servicio con mayor cobertura (Usado en más localidades)
</b-button>
        <b-collapse visible id="firstResult">
          <b-form-textarea plaintext class="border" v-model="maxServiceByLocation" rows="10" no-resize>
          </b-form-textarea>
        </b-collapse>
        <b-collapse id="firstResult-2">
          <p v-if="locationWihtMoreServices !== null">La localidad con mayor cantidad de servicios disponbles es : {{ locationWihtMoreServices.name }}, con {{ locationWihtMoreServices.qtyServices }} servicios disponibles</p>
          <b-form-textarea v-if="locationWihtMoreServices !== null" plaintext class="border" v-model="locationWihtMoreServices" rows="4" no-resize>
          </b-form-textarea>
        </b-collapse>
        <b-collapse id="firstResult-3">
          <p v-if="serviceWithMoreUse">El servicio con mayor cobertura es {{ serviceWithMoreUse.serviceIdMoreUsed }} del operador {{ serviceWithMoreUse.carrierIdMoreUsed }}</p>
          <b-form-textarea plaintext class="border" v-model="serviceWithMoreUse" rows="6" no-resize>
          </b-form-textarea>
        </b-collapse>
      </div>
    </section>
  </div>
</template>
<script>
import { getPlaces, getCouriers, getMaxLimitServicesByPlace, localWithMoreServices, serviceMoreUsed } from '@/utils/sourceSeconExercise';

export default {
  data() {
    return {
      places: null,
      couriers: null,
      maxServiceByLocation: null,
      locationWihtMoreServices: null,
      serviceWithMoreUse: null
    }
  },
  methods: {
    setInitialData() {
      this.places = getPlaces()
      this.couriers = getCouriers()
      this.maxServiceByLocation = getMaxLimitServicesByPlace()
      this.locationWihtMoreServices = localWithMoreServices()
      this.serviceWithMoreUse = serviceMoreUsed()
    }
  },
  mounted() {
    this.setInitialData()
  }
}
</script>
<style>
.container-previews {
  display: grid;
  grid-template-areas: 'first second'
                       'results results';
}
.first-data {
  grid-area: first;
}
.second-data {
  grid-area: second;
}
.results {
  grid-area: results;
}
</style>