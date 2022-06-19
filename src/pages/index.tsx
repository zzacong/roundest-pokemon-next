import { useState } from 'react'
import { ClipLoader } from 'react-spinners'

import { trpc } from '$lib/trpc'
import { getOptionsForVote } from '$lib/utils/getRandomPokemon'
import PokemonListing from '$components/PokemonListing'

export default function Home() {
  const [[first, second], setIds] = useState(() => getOptionsForVote())

  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }])
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }])

  const voteForRoundest = (selected: number) => () => {
    setIds(getOptionsForVote())
  }

  if (firstPokemon.isLoading || secondPokemon.isLoading)
    return (
      <div className="grid h-screen w-screen place-items-center">
        <ClipLoader color="white" size={120} speedMultiplier={0.75} />
      </div>
    )

  if (!firstPokemon.data || !secondPokemon.data)
    return (
      <div className="grid h-screen w-screen place-items-center">
        <div className="space-y-10 text-center">
          <ClipLoader color="white" size={120} speedMultiplier={0.75} />
          <p className="font-mono text-3xl">no data to show</p>
        </div>
      </div>
    )

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-20 text-center text-2xl font-bold lg:text-4xl">
        Which Pokemon is Roundest?
      </h1>

      <div className="flex max-w-2xl items-center justify-between space-x-10 rounded border py-8 px-16">
        <PokemonListing
          pokemon={firstPokemon.data}
          vote={voteForRoundest(first)}
        />
        <div className="font-mono text-2xl">VS</div>
        <PokemonListing
          pokemon={secondPokemon.data}
          vote={voteForRoundest(second)}
        />
      </div>
    </div>
  )
}
