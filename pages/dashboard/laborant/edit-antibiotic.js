import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import { useRouter } from 'next/router';
import EditAntibioticResult from '../../../src/Components/Pages/Dashboard/Laborant/TahlilResult/EditAntibioticResult';

export default function Home() {
    const router = useRouter();
    const { patientId } = router.query;
    const { orderId } = router.query;

    return (
        <div>
            <Head>
                <title>Analiz natijalari</title>
                <meta name="description" content="Sog`liqni saqlash vazirligi" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WithAuthComponent>
                <DashboardLayout>
                    <EditAntibioticResult patientId={patientId} orderId={orderId}/>
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
