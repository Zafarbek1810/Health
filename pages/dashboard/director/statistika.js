import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"

export default function Home() {
    return (
        <div>
            <Head>
                <title>Statistika</title>
                <meta name="description" content="Sog`liqni saqlash vazirligi" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WithAuthComponent>
                <DashboardLayout>
                    stat
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
