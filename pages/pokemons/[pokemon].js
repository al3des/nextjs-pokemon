import Head from "next/head"
import { useRouter } from "next/router"

export default function Pokemon({ pokemon }) {
  let router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  let { id, abilities, name } = pokemon

  return (
    <div>
      <Head>
        <title>Pokemons | {pokemon.name}</title>
      </Head>
      <h2>{name}</h2>
      <img src={`/sprites/sprites/pokemon/other/dream-world/${id}.svg`} />
      <h3>abilities</h3>
      <ul>
        {abilities.map(({ ability }) => (
          <li key={ability.name}>{ability.name}</li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`)
  const data = await res.json()

  return {
    props: { pokemon: data },
  }
}

export async function getStaticPaths() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10")
  const pokemons = await res.json()

  const paths = pokemons.results.map((pokemon) => ({
    params: { pokemon: pokemon.name },
  }))

  return {
    paths,
    fallback: true,
  }
}
