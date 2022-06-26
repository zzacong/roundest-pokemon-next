import { useState } from 'react'

import { trpc } from '$lib/trpc'
import { getOptionsForVote } from '$lib/utils/getRandomPokemon'
import { PokemonVoting, LoadingSpinner } from '$components'

export default function Home() {
  const [pair, setIds] = useState(() => getOptionsForVote())
  const [first, second] = pair
  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }])
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }])

  const voteMutation = trpc.useMutation(['cast-vote'])

  const voteForRoundest = (selected: number) => () => {
    if (selected === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second })
    } else {
      voteMutation.mutate({ votedFor: second, votedAgainst: first })
    }
    // todo: fire mutation
    setIds(getOptionsForVote())
  }

  return (
    <div className="flex grow flex-col items-center justify-center">
      <h1 className="mb-20 text-center text-2xl font-bold lg:text-4xl">
        Which Pokemon is Roundest?
      </h1>

      {firstPokemon.isLoading || secondPokemon.isLoading ? (
        <LoadingSpinner />
      ) : !firstPokemon.data || !secondPokemon.data ? (
        <LoadingSpinner message="no data to show" />
      ) : (
        <div className="flex max-w-2xl items-center justify-between space-x-10 rounded border py-8 px-16">
          <PokemonVoting
            pokemon={firstPokemon.data}
            vote={voteForRoundest(first)}
          />
          <div className="font-mono text-2xl">VS</div>
          <PokemonVoting
            pokemon={secondPokemon.data}
            vote={voteForRoundest(second)}
          />
        </div>
      )}
    </div>
  )
}
