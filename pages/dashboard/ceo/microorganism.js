import Head from "next/head";
import WithAuthComponent from "../../../src/Hocs/PrivateRoute";
import MicroorganismMain from "../../../src/Components/Pages/Dashboard/Seo/Microorganism/MicroorganismMain";
import DashboardLayout from "../../../src/Components/DashLayout";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Labaratoriya yaratish</title>
        <meta name="description" content="Sog`liqni saqlash vazirligi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <DashboardLayout>
          <MicroorganismMain />
        </DashboardLayout>
      </WithAuthComponent>
    </div>
  );
}
