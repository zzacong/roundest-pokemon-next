import type { GetStaticProps } from 'next'
import { getPokemon, type PokemonQueryResult } from '$lib/utils'
import { PokemonRanking } from '$components'
import { generateCountPercent } from '$components/PokemonRanking'
import Head from 'next/head'

interface SummaryPageProps {
  pokemon: PokemonQueryResult
}

const pageTitle = 'Summary | Roundest Pokémon'

export default function SummaryPage({ pokemon }: SummaryPageProps) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <div className="mb-8 flex flex-col pt-16">
        <h1 className="mb-8 text-center text-2xl font-bold lg:text-4xl">
          Summary
        </h1>

        <h3 className="mb-16 text-center text-xl">
          Total pokemon:
          <span className="font-mono font-bold"> {pokemon.length}</span>
        </h3>

        <div className="mx-auto grid w-full max-w-2xl border">
          {pokemon.map((p, i) => (
            <PokemonRanking key={p.id} pokemon={p} rank={i} />
          ))}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pokemonOrdered = await getPokemon()
  pokemonOrdered.sort((a, b) => {
    const difference = generateCountPercent(b) - generateCountPercent(a)
    if (difference === 0) return b._count.voteFor - a._count.voteFor
    return difference
  })

  return {
    props: {
      pokemon: pokemonOrdered,
    },
    revalidate: 60,
  }
}
