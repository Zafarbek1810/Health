import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import PatientMain from '../../../src/Components/Pages/Dashboard/Cashier/Patient/PatientMain'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Bemorlarni yaratish</title>
                <meta name="description" content="Sog`liqni saqlash vazirligi" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WithAuthComponent>
                <DashboardLayout>
                    <PatientMain />
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
