import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import Tahlillar from '../../../src/Components/Pages/Dashboard/Admin/Tahlillar/Main';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Tahlillar</title>
                <meta name="description" content="Sog`liqni saqlash vazirligi" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WithAuthComponent>
                <DashboardLayout>
                    <Tahlillar />
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
