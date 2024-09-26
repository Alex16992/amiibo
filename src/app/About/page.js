import { redirect } from "next/navigation"

export default async function About({ searchParams }) {
  const id = searchParams.id
  if (!id) {
    redirect("/")
  }

  const res = await fetch("https://www.amiiboapi.com/api/amiibo/?id=" + id)
  const data = await res.json()
  if (!data || !data.amiibo || data.amiibo.length === 0) {
    redirect("/")
  }

  return (
    <div>
      <div key={data.amiibo.head}>
        <img
          src={data.amiibo.image}
          alt={data.amiibo.name}
        />
        <p>Name: {data.amiibo.name}</p>
        <p>Character: {data.amiibo.character}</p>
        <p>Series: {data.amiibo.gameSeries}</p>
        <p>Release in Japan: {data.amiibo.release.jp}</p>{" "}
        <p>Release in Europe: {data.amiibo.release.eu}</p>{" "}
        <p>Release in North America: {data.amiibo.release.na}</p>
        <p>Type: {data.amiibo.type}</p>
      </div>
    </div>
  )
}
