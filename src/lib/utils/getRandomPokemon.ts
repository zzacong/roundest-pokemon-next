const randInt = (max: number) => Math.floor(Math.random() * max)

// const MAX_DEX_ID = 5
const MAX_DEX_ID = 493

export const getRandomPokemon = (notThisOne?: number): number => {
  const pokedexNumber = randInt(MAX_DEX_ID) + 1

  if (pokedexNumber !== notThisOne) return pokedexNumber
  return getRandomPokemon(notThisOne)
}

export const getOptionsForVote = () => {
  const firstId = getRandomPokemon()
  const secondId = getRandomPokemon(firstId)

  return [firstId, secondId]
}
