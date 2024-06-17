const GET_CHARACTERS = 'http://localhost:3000/characters'

export const getCharacters = async (offset) => {
  const ofs = offset || 0
  try {
    const response = await fetch(`${GET_CHARACTERS}?offset=${ofs}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Hubo un error en el request')
    }

    const data = await response.json()
    return data

  } catch (error) {
    console.error(error)
    throw error
  } 
}