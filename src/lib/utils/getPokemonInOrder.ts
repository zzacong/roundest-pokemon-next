import type { inferAsyncReturnType } from '@trpc/server'
import { prisma } from '$lib/prisma'

export const getPokemon = () =>
  prisma.pokemon.findMany({
    include: {
      _count: {
        select: {
          voteFor: true,
          voteAgainst: true,
        },
      },
    },
  })

export type PokemonQueryResult = inferAsyncReturnType<typeof getPokemon>
