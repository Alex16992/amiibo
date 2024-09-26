"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Sort() {
  const router = useRouter()
  const [selectedGame, setSelectedGame] = useState("")

  const handleSelectChange = (e) => {
    const game = e.target.value
    setSelectedGame(game)

    router.push(`?game=${encodeURIComponent(game)}`)
  }

  const fetchGames = async () => {
    const res = await fetch("https://www.amiiboapi.com/api/gameseries/")
    const data = await res.json()
    return [...new Set(data.amiibo.map((item) => item.name))].sort()
  }

  const [uniqueNames, setUniqueNames] = useState([])

  useState(() => {
    fetchGames().then((names) => setUniqueNames(names))
  }, [])

  return (
    <>
      <select
        onChange={handleSelectChange}
        value={selectedGame}
      >
        <option
          value=''
          disabled
        >
          Select game
        </option>
        {uniqueNames.map((name, index) => (
          <option
            key={index}
            value={name}
          >
            {name}
          </option>
        ))}
      </select>
    </>
  )
}
