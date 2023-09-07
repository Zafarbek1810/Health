import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import LabaratoryMain from '../../../src/Components/Pages/Dashboard/Seo/Laboratoriya/LabaratoryMain'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Labaratoriya yaratish</title>
        <meta name="description" content="Sog`liqni saqlash vazirligi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <LabaratoryMain />
      </WithAuthComponent>
    </div>
  )
}
