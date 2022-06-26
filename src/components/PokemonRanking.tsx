import type { PokemonQueryResult } from '$lib/utils'
import Image from 'next/image'

interface PokemonListingProps {
  pokemon: PokemonQueryResult[number]
  rank: number
}

export default function PokemonListing({ pokemon, rank }: PokemonListingProps) {
  return (
    <div className="relative flex items-center justify-between border-b p-2">
      <div className="flex items-center pl-6">
        <Image
          src={pokemon.spriteUrl}
          alt={pokemon.name}
          width={72}
          height={72}
          className="animate-fade-in"
        />
        <p className="ml-4 font-semibold capitalize">{pokemon.name}</p>
      </div>
      <div className="pr-4">
        <p className="font-mono text-xl">
          {generateCountPercent(pokemon).toFixed(2)}%
        </p>
      </div>
      <div className="absolute top-0 left-0 z-10 grid place-items-center rounded-br-md bg-yellow-500 px-2 font-semibold text-white">
        {rank}
      </div>
    </div>
  )
}

export const generateCountPercent = (pokemon: PokemonQueryResult[number]) => {
  const { voteFor, voteAgainst } = pokemon._count
  const total = voteFor + voteAgainst
  if (total === 0) return 0
  return (voteFor / total) * 100
}
