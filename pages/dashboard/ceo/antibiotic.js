import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import AntibioticMain from '../../../src/Components/Pages/Dashboard/Seo/Antibiotic/AntibioticMain'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Foydalanuvchi yaratish</title>
        <meta name="description" content="Sog`liqni saqlash vazirligi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <DashboardLayout>
          <AntibioticMain />
        </DashboardLayout>
      </WithAuthComponent>
    </div>
  )
}
