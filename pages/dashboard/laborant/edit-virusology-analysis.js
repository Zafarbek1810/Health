import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import { useRouter } from 'next/router';
import EditVirusologyAnalysis from '../../../src/Components/Pages/Dashboard/Laborant/TahlilResult/EditVirusologyAnalysis';

export default function Home() {
    const router = useRouter();
    const { patientId } = router.query;
    const { orderId } = router.query;
    const {templateId}=router.query
    const {analysisId} = router.query


    return (
        <div>
            <Head>
                <title>Analiz natijalari</title>
                <meta name="description" content="Sog`liqni saqlash vazirligi" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WithAuthComponent>
                <DashboardLayout>
                    <EditVirusologyAnalysis patientId={patientId} orderId={orderId} templateId={templateId} analysisId={analysisId}/>
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
