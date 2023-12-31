import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import LaborantMain from '../../../src/Components/Pages/Dashboard/Director/Laborant/LaborantMain'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Laborant yaratish</title>
                <meta name="description" content="Sog`liqni saqlash vazirligi" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WithAuthComponent>
                <DashboardLayout>
                    <LaborantMain />
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
