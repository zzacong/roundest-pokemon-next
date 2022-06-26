import * as trpc from '@trpc/server'
import { inferProcedureOutput } from '@trpc/server'
import { z } from 'zod'
import { prisma } from '$lib/prisma'
import { getOptionsForVote } from '$lib/utils'

export const appRouter = trpc
  .router()
  .query('get-pokemon-by-id', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const pokemon = await prisma.pokemon.findFirst({
        where: { id: input.id },
      })
      if (!pokemon) throw new Error(`Pokemon with id (${input.id}) not found`)
      return pokemon
    },
  })
  .query('get-pokemon-pair', {
    async resolve() {
      const [first, second] = getOptionsForVote()

      const pokemonPair = await prisma.pokemon.findMany({
        where: { id: { in: [first, second] } },
      })

      if (pokemonPair.length !== 2)
        throw new Error('Failed to find two pokemon')

      return { firstPokemon: pokemonPair[0], secondPokemon: pokemonPair[1] }
    },
  })
  .mutation('cast-vote', {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }),
    async resolve({ input }) {
      const voteInDb = await prisma.vote.create({
        data: {
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        },
      })
      return { success: true, vote: voteInDb }
    },
  })

// export type definition of API
export type AppRouter = typeof appRouter

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>
