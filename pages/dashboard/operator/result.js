import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import MainResult from '../../../src/Components/Pages/Dashboard/Operator/ResultList/MainResult'

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
                    <MainResult />
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
