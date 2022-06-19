import * as trpc from '@trpc/server'
import { PokemonClient } from 'pokenode-ts'
import { z } from 'zod'

export const appRouter = trpc.router().query('get-pokemon-by-id', {
  input: z.object({
    id: z.number(),
  }),
  async resolve({ input }) {
    const client = new PokemonClient()
    const pokemon = await client.getPokemonById(input.id)
    return { name: pokemon.name, sprites: pokemon.sprites }
  },
})

// export type definition of API
export type AppRouter = typeof appRouter
