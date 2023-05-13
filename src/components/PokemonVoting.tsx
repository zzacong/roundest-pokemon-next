import type { RouterOutputs } from '$lib/api'

import Image from 'next/image'
import clsx from 'clsx'

type PokemonFromServer = RouterOutputs['pokemon']['getPokemonById']
interface PokemonVotingProps {
  pokemon: PokemonFromServer
  disabled?: boolean
  vote: () => void
}

export default function PokemonVoting({
  pokemon,
  vote,
  disabled,
}: PokemonVotingProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center transition-opacity',
        disabled && 'opacity-0'
      )}
    >
      <button
        onClick={vote}
        className="flex h-40 w-40 flex-col items-center rounded bg-white p-4 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 md:h-52 md:w-52"
      >
        <Image
          src={pokemon.spriteUrl}
          alt={pokemon.name}
          width={160}
          height={160}
          className="animate-fade-in"
        />
        <p className="-mt-3 text-center text-xl capitalize text-slate-700">
          {pokemon.name}
        </p>
      </button>
    </div>
  )
}
