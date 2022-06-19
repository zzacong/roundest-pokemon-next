import Image from 'next/image'
import { useMemo } from 'react'
import { ClipLoader } from 'react-spinners'
import { trpc } from '$lib/trpc'
import { getOptionsForVote } from '$lib/utils/getRandomPokemon'

export default function Home() {
  const [first, second] = useMemo(() => getOptionsForVote(), [])

  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }])
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }])

  if (firstPokemon.isLoading || secondPokemon.isLoading)
    return (
      <div className="grid h-screen w-screen place-items-center">
        <ClipLoader color="white" size={120} speedMultiplier={0.75} />
      </div>
    )

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-bold lg:text-4xl">
        Which Pokemon is Roundest?
      </h1>
      <div className="p-8"></div>
      <div className="flex max-w-2xl items-center justify-between space-x-10 rounded border p-8">
        <div className="flex h-52 w-52 flex-col items-center rounded bg-white p-4">
          <Image
            src={firstPokemon.data?.sprites.front_default ?? ''}
            alt={firstPokemon.data?.name}
            width={160}
            height={160}
            className="aspect-square w-full"
          />
          <p className="-mt-3 text-center text-xl capitalize text-slate-700">
            {firstPokemon.data?.name}
          </p>
        </div>
        <div className="font-mono text-2xl">VS</div>
        <div className="flex h-52 w-52 flex-col items-center rounded bg-white p-4">
          <Image
            src={secondPokemon.data?.sprites.front_default ?? ''}
            alt={secondPokemon.data?.name}
            width={160}
            height={160}
            className="aspect-square w-full"
          />
          <p className="-mt-3 text-center text-xl capitalize text-slate-700">
            {secondPokemon.data?.name}
          </p>
        </div>
      </div>
    </div>
  )
}
