
export const generateRange = (min, max) => Array.from({ length: max - min + 1}, () => min++);

export const calculatePrimes = (start, end) => {
  const range = generateRange(start, end)
  const primesArray = range.map((number) => {
    return number === 2 ? number : isPrimo(number) ? number : null
  })
  const primesFilters = primesArray.filter(Boolean) 
  return primesFilters
}



export const isPrimo = (number) => {
  for (let i = 2; i <= number; i++) {
    if (number % i === 0) {
      return false
    }
    return number !== 1
  }
}