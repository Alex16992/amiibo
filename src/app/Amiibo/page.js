"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import styles from "./amiibo.module.css"

export default function Amiibo() {
  const searchParams = useSearchParams()
  const [data, setData] = useState(null)
  const game = searchParams.get("game")

  useEffect(() => {
    setData()
    const fetchData = async () => {
      let response
      if (game) {
        response = await fetch(
          `https://www.amiiboapi.com/api/amiibo/?gameseries=${encodeURIComponent(
            game
          )}`
        )
      } else {
        response = await fetch("https://www.amiiboapi.com/api/amiibo/")
      }

      const result = await response.json()
      setData(result)
    }

    fetchData()
  }, [game])

  if (!data || !data.amiibo) {
    return <p>Loading or no Amiibo data found...</p>
  }

  return (
    <div>
      {data.amiibo.map((item) => (
        <div
          key={item.head}
          className={styles.amiibo}
        >
          <img
            src={item.image}
            alt={item.name}
            className={styles.amiiboImage}
          />
          <p className={styles.amiiboName}>{item.name}</p>
          <Link href={`/About?id=${item.head + item.tail}`}>
            About this amiibo
          </Link>
        </div>
      ))}
    </div>
  )
}
