import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import { useRouter } from 'next/router';
import UpdateOrder from '../../../src/Components/Pages/Dashboard/Operator/Orders/UpdateOrder';

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
                    <UpdateOrder id={id} />
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
