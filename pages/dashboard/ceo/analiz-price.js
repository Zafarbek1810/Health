import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import AnalizPriceMain from '../../../src/Components/Pages/Dashboard/Seo/AnalizPrice/AnalizPriceMain'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Analiz narxlari</title>
        <meta name="description" content="Sog`liqni saqlash vazirligi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <DashboardLayout>
          <AnalizPriceMain />
        </DashboardLayout>
      </WithAuthComponent>
    </div>
  )
}
