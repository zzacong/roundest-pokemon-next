import type { AsyncReturnType } from '$lib/types'
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

export type PokemonQueryResult = AsyncReturnType<typeof getPokemon>
