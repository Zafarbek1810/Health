import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import AnalizMain from '../../../src/Components/Pages/Dashboard/Seo/Analiz/AnalizMain'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Analiz yaratish</title>
        <meta name="description" content="Sog`liqni saqlash vazirligi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <DashboardLayout>
          <AnalizMain />
        </DashboardLayout>
      </WithAuthComponent>
    </div>
  )
}
