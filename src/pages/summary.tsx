import type { GetStaticProps } from 'next'
import type { AsyncReturnType } from '$lib/types'
import { getPokemonInOrder } from '$lib/utils'

interface SummaryPageProps {
  pokemon: AsyncReturnType<typeof getPokemonInOrder>
}

export default function SummaryPage({ pokemon }: SummaryPageProps) {
  return (
    <div>
      <h1>Summary</h1>
      <div>
        <pre className="whitespace-pre break-words">
          {JSON.stringify(pokemon)}
        </pre>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pokemonOrdered = await getPokemonInOrder()

  return {
    props: {
      pokemon: pokemonOrdered,
    },
    revalidate: 60,
  }
}
