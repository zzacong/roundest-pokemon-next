import type { inferQueryResponse } from '$backend/router'
import Image from 'next/image'
import clsx from 'clsx'

type PokemonFromServer = inferQueryResponse<'get-pokemon-by-id'>
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
      <div className="mb-4 flex h-52 w-52 flex-col items-center rounded bg-white p-4">
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
      </div>
      <button
        onClick={vote}
        className="inline-flex items-center rounded bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Rounder
      </button>
    </div>
  )
}
