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
    <div className="flex grow flex-col items-center justify-center px-6 pt-16">
      <h1 className="mb-12 text-center text-lg font-bold md:text-2xl lg:mb-20 lg:text-4xl">
        Which Pokemon is Roundest?
      </h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : !pair ? (
        <LoadingSpinner message="no pokemon to show" />
      ) : (
        <div className="flex max-w-2xl flex-col items-center justify-between gap-6 rounded border py-8 px-8 md:flex-row lg:gap-10 lg:px-16">
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
