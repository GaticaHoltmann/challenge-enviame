
const couriers = {
  1: {
    carrier: 'CCH',
    service: 'DEX',
  },
  2: {
    carrier: 'CCH',
    service: 'express',
  },
  3: {
    carrier: 'CCH',
    service: 'priority',
  },
  15: {
    carrier: 'CHP',
    service: 'nextday',
  },
  16: {
    carrier: 'CHP',
    service: 'sameday',
  },
  17: {
    carrier: 'CHP',
    service: 'express',
  },
}

const places = {
  data: {
    BUIN: [
      {
        limit: 1,
        over_carrier_service_id: 17,
        under_carrier_service_id: 17,
      },
      {
        limit: 2,
        over_carrier_service_id: 15,
        under_carrier_service_id: 15,
      },
    ],
    LAJA: [
      {
        limit: 2,
        over_carrier_service_id: 1,
        under_carrier_service_id: 1,
      },
      {
        limit: 5,
        over_carrier_service_id: 2,
        under_carrier_service_id: 2,
      },
      {
        limit: 1,
        over_carrier_service_id: 17,
        under_carrier_service_id: 17,
      },
    ],
    LEBU: [
      {
        limit: 2,
        over_carrier_service_id: 1,
        under_carrier_service_id: 1,
      },
      {
        limit: 6,
        over_carrier_service_id: 3,
        under_carrier_service_id: 3,
      },
      {
        limit: 5,
        over_carrier_service_id: 2,
        under_carrier_service_id: 2,
      },
      {
        limit: 4,
        over_carrier_service_id: 16,
        under_carrier_service_id: 16,
      },
    ],
    LOTA: [
      {
        limit: 2,
        over_carrier_service_id: 15,
        under_carrier_service_id: 15,
      },
      {
        limit: 4,
        over_carrier_service_id: 16,
        under_carrier_service_id: 16,
      },
      {
        limit: 1,
        over_carrier_service_id: 17,
        under_carrier_service_id: 17,
      },
    ],
  },
}

export const getCouriers = () => {
  return JSON.stringify(couriers, undefined, 4)
}

export const getPlaces = () => {
  return JSON.stringify(places, undefined, 4)
}

export const getMaxLimitServicesByPlace = () => {
  let placesKeys = Object.keys(places.data)

  const maxLimit = placesKeys.map(place => {
    let result = {}
    let aux = places.data[place].reduce((current, max) => {
        return current.limit > max.limit ? current : max
      })
    result[place] = {
        limit: aux.limit,
        over: {
            carrier: couriers[aux.over_carrier_service_id].carrier,
            service: couriers[aux.over_carrier_service_id].service
        },
        under: {
            carrier: couriers[aux.under_carrier_service_id].carrier,
            service: couriers[aux.under_carrier_service_id].service
        }
    }
    return result
  })
  const finalResult = maxLimit.reduce((acc, current) => {
    const key = Object.keys(current)[0];
    acc[key] = current[key];
    return acc;
  }, {})

  return JSON.stringify(finalResult, undefined, 4)
}

export const localWithMoreServices = () => {
    let placesArrays = Object.keys(places.data)
    placesArrays = placesArrays.map((place) => {
        return {
            name: place,
            qtyServices: places.data[place].length
        }
    })

    let placeWithMoreServices =  placesArrays.reduce((current, next) => {
        return current.qtyServices > next.qtyServices ? current : next
    })

    return JSON.stringify(placeWithMoreServices, undefined, 4)
}

export const serviceMoreUsed = () => {
    let servicesUsed = Object.values(places.data).flat().reduce((current, next) => {
        current.push(next['over_carrier_service_id'])
        return current
    }, [])

    let servicesQtyUsed = servicesUsed.reduce((current, next) =>{
        current[next] = (current[next] || 0) + 1
        return current
    },{})

    let serviceIdMoreUsed = null
    let carrierIdMoreUsed = null
    let countOfUse = 0
    for(const id in servicesQtyUsed) {
        if (servicesQtyUsed[id] > countOfUse) {
            serviceIdMoreUsed = couriers[id].service
            carrierIdMoreUsed = couriers[id].carrier
            countOfUse = servicesQtyUsed[id]
        }
    }

    return {carrierIdMoreUsed,serviceIdMoreUsed, countOfUse}
}