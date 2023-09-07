import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import CompanyMain from '../../../src/Components/Pages/Dashboard/Seo/Company/CompanyMain'
import ParasiteMain from '../../../src/Components/Pages/Dashboard/Seo/Parasite/ParasiteMain'

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
          <ParasiteMain />
        </DashboardLayout>
      </WithAuthComponent>
    </div>
  )
}
