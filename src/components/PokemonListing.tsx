import type { PokemonQueryResult } from '$lib/utils'
import Image from 'next/image'

interface PokemonListingProps {
  pokemon: PokemonQueryResult[number]
}

export default function PokemonListing({ pokemon }: PokemonListingProps) {
  return (
    <div className="flex items-center justify-between border-b p-2">
      <div className="flex items-center">
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
    </div>
  )
}

export const generateCountPercent = (pokemon: PokemonQueryResult[number]) => {
  const { voteFor, voteAgainst } = pokemon._count
  const total = voteFor + voteAgainst
  if (total === 0) return 0
  return (voteFor / total) * 100
}
