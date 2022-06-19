import { MAX_DEX_ID } from '$lib/constants'

const randInt = (max: number) => Math.floor(Math.random() * max)

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
