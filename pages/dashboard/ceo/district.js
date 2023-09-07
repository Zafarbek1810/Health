import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DistrictMain from '../../../src/Components/Pages/Dashboard/Seo/Tuman/DistrictMain'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tuman yaratish</title>
        <meta name="description" content="Sog`liqni saqlash vazirligi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <DistrictMain />
      </WithAuthComponent>
    </div>
  )
}
