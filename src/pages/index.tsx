import { trpc } from '$lib/trpc'
import { getOptionsForVote } from '$lib/utils/getRandomPokemon'

export default function Home() {
  const [first, second] = getOptionsForVote()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-bold lg:text-4xl">
        Which Pokemon is Roundest?
      </h1>
      <div className="p-8"></div>
      <div className="flex max-w-2xl items-center justify-between space-x-10 rounded border p-8">
        <div className="grid h-16 w-16 place-items-center bg-red-200 text-black">
          {first}
        </div>
        <div className="font-mono">VS</div>
        <div className="grid h-16 w-16 place-items-center bg-red-200 text-black">
          {second}
        </div>
      </div>
    </div>
  )
}
