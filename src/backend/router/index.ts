import * as trpc from '@trpc/server'
import { inferProcedureOutput } from '@trpc/server'
import { PokemonClient } from 'pokenode-ts'
import { z } from 'zod'
import { prisma } from '$lib/prisma'

export const appRouter = trpc
  .router()
  .query('get-pokemon-by-id', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const client = new PokemonClient()
      const pokemon = await client.getPokemonById(input.id)
      return { name: pokemon.name, sprites: pokemon.sprites }
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
