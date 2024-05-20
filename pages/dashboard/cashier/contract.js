import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import MainContract from '../../../src/Components/Pages/Dashboard/Cashier/Contract/MainContract'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Buyurtmalar</title>
                <meta name="description" content="Sog`liqni saqlash vazirligi" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WithAuthComponent>
                <DashboardLayout>
                    <MainContract />
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
