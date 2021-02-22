import Head from "next/head"
import { useEffect, useState } from "react"
import PokemonItem from "../components/pokemon-list-item"
import styles from "../styles/Home.module.css"

import { useRouter } from "next/router"

export default function Home({ pokemons }) {
  let router = useRouter()

  let limit = 8

  let offSet = router.query.page ? router.query.page * limit : limit
  let initOffSet = offSet - limit

  let [search, setSearch] = useState("")
  let [searchFilter, setSearchFilter] = useState(
    pokemons.slice(initOffSet, offSet)
  )

  useEffect(() => {
    if (search.length > 0) {
      setSearchFilter(pokemons.filter((p) => p.name.includes(search)))
      return
    }
    setSearchFilter(pokemons.slice(initOffSet, offSet))
  }, [search, offSet])

  function handleSearch(e) {
    if (e.target.value.length < 3) {
      setSearch(pokemons)
      return
    }
    setSearch(e.target.value)
  }
  console.log("search filter", searchFilter)
  let list =
    searchFilter.length > 0 ? searchFilter : pokemons.slice(initOffSet, offSet)

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemons App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <input placeholder="search" onChange={(e) => handleSearch(e)} />
      </header>
      <main>
        <div className={styles.pokemonsList}>
          {list &&
            list.map((pokemon, i) => (
              <PokemonItem key={pokemon.name} pokemon={pokemon} />
            ))}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export async function getStaticProps(context) {
  // let page = context.query.page ? parseInt(context.query.page) : 1

  let url = `https://pokeapi.co/api/v2/pokemon/?limit=649`
  console.log(url)
  const res = await fetch(url)
  const data = await res.json()
  return {
    props: {
      pokemons: data.results.map((x, i) => ({ ...x, id: i + 1 })),
    },
  }
}
