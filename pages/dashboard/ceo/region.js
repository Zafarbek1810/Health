import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import ViloyatMain from '../../../src/Components/Pages/Dashboard/Seo/Viloyat/ViloyatMain'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Viloyat yaratish</title>
        <meta name="description" content="Sog`liqni saqlash vazirligi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <ViloyatMain />
      </WithAuthComponent>
    </div>
  )
}
