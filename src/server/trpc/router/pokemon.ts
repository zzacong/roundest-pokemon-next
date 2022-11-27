import { z } from 'zod'

import { router, publicProcedure } from '$server/trpc/trpc'
import { getOptionsForVote } from '$lib/utils'

export const pokemonRouter = router({
  getPokemonById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const pokemon = await ctx.prisma.pokemon.findFirst({
        where: { id: input.id },
      })
      if (!pokemon) throw new Error(`Pokemon with id (${input.id}) not found`)
      return pokemon
    }),

  getPokemonPair: publicProcedure.query(async ({ ctx }) => {
    const [first, second] = getOptionsForVote()
    const pokemonPair = await ctx.prisma.pokemon.findMany({
      where: { id: { in: [first, second] } },
    })
    if (pokemonPair.length !== 2) throw new Error('Failed to find two pokemon')
    return { firstPokemon: pokemonPair[0], secondPokemon: pokemonPair[1] }
  }),

  castVote: publicProcedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const voteInDb = await ctx.prisma.vote.create({
        data: {
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        },
      })
      return { success: true, vote: voteInDb }
    }),
})
