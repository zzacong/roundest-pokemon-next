import { trpc } from '$lib/trpc'

export default function Home() {
  const { data, isLoading } = trpc.useQuery(['hello', { text: 'Zac' }])

  if (isLoading) return <div>Loading...</div>
  if (data) return <div>{data.greeting}</div>

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-bold lg:text-4xl">
        Which Pokemon is Roundest?
      </h1>
      <div className="p-8"></div>
      <div className="flex max-w-2xl items-center justify-between space-x-10 rounded border p-8">
        <div className="h-16 w-16 bg-red-200"></div>
        <div className="font-mono">VS</div>
        <div className="h-16 w-16 bg-red-200"></div>
      </div>
    </div>
  )
}
