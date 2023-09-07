import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import CreateOrder from '../../../src/Components/Pages/Dashboard/Cashier/Orders/CreateOrder'
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    const { id } = router.query;


    return (
        <div>
            <Head>
                <title>Buyurtmalar yaratish</title>
                <meta name="description" content="Sog`liqni saqlash vazirligi" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WithAuthComponent>
                <DashboardLayout>
                    <CreateOrder id={id} />
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
