import Head from "next/head";
import WithAuthComponent from "../../../src/Hocs/PrivateRoute";
import DashboardLayout from "../../../src/Components/DashLayout";
import HepatitsMain from "../../../src/Components/Pages/Dashboard/Seo/Hepatits/HepatitsMain";

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
          <HepatitsMain />
        </DashboardLayout>
      </WithAuthComponent>
    </div>
  );
}
