export default function Pokemon({ pokemon }) {
  let { abilities, name } = pokemon
  return (
    <div>
      <h2>{name}</h2>
      <img
        src={`/sprites/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
      />
      <h3>abilities</h3>
      <ul>
        {abilities.map(({ ability }) => (
          <li key={ability.name}>{ability.name}</li>
        ))}
      </ul>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`)
  const data = await res.json()

  return {
    props: { pokemon: data },
  }
}

// export async function getStaticProps({ params }) {
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`)
//   const data = await res.json()

//   return {
//     props: { pokemon: data },
//   }
// }

// export async function getStaticPaths() {
//   const res = await fetch("https://pokeapi.co/api/v2/pokemon/")
//   const pokemons = await res.json()
//   const paths = pokemons.results.map((pokemon) => ({
//     params: { pokemon: pokemon.name },
//   }))

//   return {
//     paths,
//     fallback: false,
//   }
// }
