import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import DashboardLayout from "../../../src/Components/DashLayout"
import { useRouter } from 'next/router';
import AddResultHepatits from '../../../src/Components/Pages/Dashboard/Laborant/Result/AddResultHepatits';

export default function Home() {
    const router = useRouter();
    const { id } = router.query;
    const { patientId } = router.query;

    return (
        <div>
            <Head>
                <title>Analiz natijalari</title>
                <meta name="description" content="Sog`liqni saqlash vazirligi" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WithAuthComponent>
                <DashboardLayout>
                    <AddResultHepatits id={id} patientId={patientId} />
                </DashboardLayout>
            </WithAuthComponent>
        </div>
    )
}
