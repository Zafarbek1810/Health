import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import Statistika from '../../../src/Components/Pages/Dashboard/Operator/Statistika'

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
          <Statistika />
        </DashboardLayout>
      </WithAuthComponent>
    </div>
  )
}
