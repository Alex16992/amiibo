"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import "./amiibo.css"
import Script from "next/script"

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

  useEffect(() => {
    if (data && data.amiibo) {
      // Весь код из amiiboAnimation.js можно вставить здесь напрямую
      function mapNumberRange(n, a, b, c, d) {
        return ((n - a) * (d - c)) / (b - a) + c
      }

      function initCard(card) {
        const cardContent = card.querySelector(".card__content")
        const gloss = card.querySelector(".card__gloss")

        requestAnimationFrame(() => {
          gloss.classList.add("card__gloss--animatable")
        })

        card.addEventListener("mousemove", (e) => {
          const pointerX = e.clientX
          const pointerY = e.clientY

          const cardRect = card.getBoundingClientRect()

          const halfWidth = cardRect.width / 2
          const halfHeight = cardRect.height / 2

          const cardCenterX = cardRect.left + halfWidth
          const cardCenterY = cardRect.top + halfHeight

          const deltaX = pointerX - cardCenterX
          const deltaY = pointerY - cardCenterY

          const distanceToCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

          const maxDistance = Math.max(halfWidth, halfHeight)

          const degree = mapNumberRange(distanceToCenter, 0, maxDistance, 0, 10)

          const rx = mapNumberRange(deltaY, 0, halfWidth, 0, 1)
          const ry = mapNumberRange(deltaX, 0, halfHeight, 0, 1)

          cardContent.style.transform = `perspective(400px) rotate3d(${-rx}, ${ry}, 0, ${degree}deg)`

          gloss.style.transform = `translate(${-ry * 100}%, ${
            -rx * 100
          }%) scale(2.4)`

          gloss.style.opacity = `${mapNumberRange(
            distanceToCenter,
            0,
            maxDistance,
            0,
            0.6
          )}`
        })

        card.addEventListener("mouseleave", () => {
          cardContent.style = null
          gloss.style.opacity = 0
        })
      }

      // Инициализируем каждую карточку
      Array.from(document.querySelectorAll(".card")).forEach((cardEl) =>
        initCard(cardEl)
      )
    }
  }, [data])

  if (!data || !data.amiibo) {
    return <p>Loading or no Amiibo data found...</p>
  }

  return (
    <>
      {data.amiibo.map((item) => (
        <div
          className='card'
          key={item.head + item.tail}
        >
          <div className='card__content'>
            <Link href={`/About?id=${item.head + item.tail}`}>
              <div className='card__gloss'></div>
              <img
                className='card__image'
                src={item.image}
                alt={item.name}
              />
              <h2 className='card__title'>{item.name}</h2>
              <p className='card__description'>{item.gameSeries}</p>
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}
