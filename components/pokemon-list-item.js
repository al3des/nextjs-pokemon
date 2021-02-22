import styles from "./pokemonListItem.module.css"
import Link from "next/link"

export default function PokemonItem({ pokemon, i }) {
  return (
    <div className={styles.pokemon}>
      <h2>{pokemon.name}</h2>
      <Link href={`/pokemons/${pokemon.name}`}>
        <a>
          <img
            src={`/sprites/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
          />
        </a>
      </Link>
    </div>
  )
}
