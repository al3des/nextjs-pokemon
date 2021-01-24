import styles from "./pokemons.module.css"
import Link from "next/link"

export default function Pokemons({ pokemons }) {
  return (
    <div className={styles.pokemonsList}>
      {pokemons &&
        pokemons.map((pokemon, i) => (
          <div className={styles.pokemon} key={i}>
            <h2>{pokemon.name}</h2>
            <Link href={`/pokemons/${pokemon.name}`}>
              <a>
                <img
                  src={`/sprites/sprites/pokemon/other/dream-world/${
                    i + 1
                  }.svg`}
                />
              </a>
            </Link>
          </div>
        ))}
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/")
  const data = await res.json()

  return {
    props: {
      pokemons: data.results,
    },
  }
}
