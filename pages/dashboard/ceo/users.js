import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import UserMain from '../../../src/Components/Pages/Dashboard/Seo/User/UserMain'
import DashboardLayout from "../../../src/Components/DashLayout"

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
          <UserMain />
        </DashboardLayout>
      </WithAuthComponent>
    </div>
  )
}
