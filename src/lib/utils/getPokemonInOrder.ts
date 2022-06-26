import { prisma } from '$lib/prisma'

export const getPokemonInOrder = () =>
  prisma.pokemon.findMany({
    include: {
      _count: {
        select: {
          voteFor: true,
          voteAgainst: true,
        },
      },
    },
    orderBy: {
      voteFor: { _count: 'desc' },
    },
  })
