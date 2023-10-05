import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import OrdersMain from '../../../src/Components/Pages/Dashboard/Operator/Orders/OrdersMain'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Analiz natijalari</title>
                <meta name="description" content="Sog`liqni saqlash vazirligi" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WithAuthComponent>
                <DashboardLayout>
                    <OrdersMain />
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
