import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import OrdersMain from '../../../src/Components/Pages/Dashboard/Cashier/Orders/OrdersMain'

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
                    <OrdersMain />
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
