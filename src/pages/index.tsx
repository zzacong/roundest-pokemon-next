import { trpc } from '$lib/trpc'
import { PokemonVoting, LoadingSpinner } from '$components'

export default function Home() {
  const {
    data: pair,
    isLoading,
    refetch,
  } = trpc.useQuery(['get-pokemon-pair'], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  const voteMutation = trpc.useMutation(['cast-vote'])

  const voteForRoundest = (selected: number) => () => {
    if (!pair) return

    if (selected === pair.firstPokemon.id) {
      voteMutation.mutate({
        votedFor: pair.firstPokemon.id,
        votedAgainst: pair.secondPokemon.id,
      })
    } else {
      voteMutation.mutate({
        votedFor: pair.secondPokemon.id,
        votedAgainst: pair.firstPokemon.id,
      })
    }
    refetch()
  }

  return (
    <div className="flex grow flex-col items-center justify-center">
      <h1 className="mb-20 text-center text-2xl font-bold lg:text-4xl">
        Which Pokemon is Roundest?
      </h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : !pair ? (
        <LoadingSpinner message="no pokemon to show" />
      ) : (
        <div className="flex max-w-2xl items-center justify-between space-x-10 rounded border py-8 px-16">
          <PokemonVoting
            pokemon={pair.firstPokemon}
            vote={voteForRoundest(pair.firstPokemon.id)}
            disabled={voteMutation.isLoading || isLoading}
          />
          <div className="font-mono text-2xl">VS</div>
          <PokemonVoting
            pokemon={pair.secondPokemon}
            vote={voteForRoundest(pair.secondPokemon.id)}
            disabled={voteMutation.isLoading || isLoading}
          />
        </div>
      )}
    </div>
  )
}
