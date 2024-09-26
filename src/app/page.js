import Amiibo from "./Amiibo/page"
import Sort from "./componens/sort"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Sort />
      </header>
      <main className={styles.main}>
        <Amiibo />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  )
}
