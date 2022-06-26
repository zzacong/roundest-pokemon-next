import type { GetStaticProps } from 'next'
import { getPokemonInOrder, type PokemonQueryResult } from '$lib/utils'
import { PokemonListing } from '$components'

interface SummaryPageProps {
  pokemon: PokemonQueryResult
}

export default function SummaryPage({ pokemon }: SummaryPageProps) {
  return (
    <div className="mb-8 flex flex-col pt-16">
      <h1 className="mb-8 text-center text-2xl font-bold lg:text-4xl">
        Summary
      </h1>

      <h3 className="mb-16 text-center text-xl">
        Total pokemon:
        <span className="font-mono font-bold"> {pokemon.length}</span>
      </h3>

      <div className="mx-auto grid w-full max-w-2xl border">
        {pokemon.map(p => (
          <PokemonListing key={p.id} pokemon={p} />
        ))}
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