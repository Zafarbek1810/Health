import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Login from '../src/Components/Pages/Login'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Sog`liqni saqlash vazirligi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </div>
  )
}
