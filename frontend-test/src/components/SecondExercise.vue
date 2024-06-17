<template>
  <div>
    <section class="container-previews">
      <b-form-group class="shadow border"
      label="Primer objeto (Operadores)"
      label-for="couriers"
      >
        <b-form-textarea class="border first-data" plaintext id="couriers" v-model="couriers" rows="10" no-resize>
      </b-form-textarea>
      </b-form-group>
      <b-form-group class="shadow border"
      label="Segundo objeto (Coberturas)"
      label-for="places"
      >
        <b-form-textarea class="border second-data" plaintext id="textarea" v-model="places" rows="10" no-resize>
      </b-form-textarea>
      </b-form-group>
      <div class="accordion results" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.firstResult variant="primary">Los servicios para cada localidad con mayor limite</b-button>
          </b-card-header>
          <b-collapse visible id="firstResult" accordion="my-accordion" role="tabpanel">
          <b-form-textarea plaintext class="border" v-model="maxServiceByLocation" rows="10" no-resize>
          </b-form-textarea>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.firstResult-2 variant="primary">La localidad con mayor cantidad de servicios disponibles</b-button>
          </b-card-header>
          <b-collapse id="firstResult-2" accordion="my-accordion" role="tabpanel">
          <p v-if="Object.keys(locationWihtMoreServices).length > 0">La localidad con mayor cantidad de servicios
            disponbles es : {{
              locationWihtMoreServices.name }}, con {{ locationWihtMoreServices.qtyServices }} servicios disponibles</p>
          <b-form-textarea v-if="Object.keys(locationWihtMoreServices).length > 0" plaintext class="border"
            v-model="locationWihtMoreServices" rows="4" no-resize>
          </b-form-textarea>
        </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.firstResult-3 variant="primary">El servicio con mayor cobertura (Usado en más localidades)
        </b-button>
          </b-card-header>
          <b-collapse id="firstResult-3" accordion="my-accordion" role="tabpanel">
          <p v-if="Object.keys(serviceWithMoreUse).length > 0">El servicio con mayor cobertura es {{
            serviceWithMoreUse.serviceIdMoreUsed }} del
            operador {{ serviceWithMoreUse.carrierIdMoreUsed }}</p>
          <b-form-textarea plaintext class="border" v-model="serviceWithMoreUse" rows="6" no-resize>
          </b-form-textarea>
        </b-collapse>
        </b-card>
      </div>
    </section>
  </div>
</template>
<script>
import { getPlaces, getCouriers, getMaxLimitServicesByPlace, localWithMoreServices, serviceMostUsed } from '@/utils/sourceSecondExercise';

export default {
  data() {
    return {
      places: null,
      couriers: null,
      maxServiceByLocation: null,
      locationWihtMoreServices: {},
      serviceWithMoreUse: {}
    }
  },
  methods: {
    setInitialData() {
      this.places = getPlaces()
      this.couriers = getCouriers()
      this.maxServiceByLocation = getMaxLimitServicesByPlace()
      this.locationWihtMoreServices = localWithMoreServices()
      this.serviceWithMoreUse = serviceMostUsed()
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
  gap: 0.5rem;
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