import React, { useEffect, useState } from "react";
import StatistikaWrapper from "./style";
import { Card, Col, DatePicker, Row, Statistic } from "antd";
const { RangePicker } = DatePicker;
import PieStatistic from "./PieStatistic";
import LineCHarts from "./LineCharts";
import PatientProvider from "../../../../../Data/PatientProvider";
import OrderProvider from "../../../../../Data/OrderProvider";
import CountUp from "react-countup";
import BarChart from "./BarChart";
import TotalSum from "../../../../Common/Svgs/TotalSum";
import ReturnCash from "../../../../Common/Svgs/ReturnCash";
import CardSvg from "../../../../Common/Svgs/CardSvg";
import CashSvg from "../../../../Common/Svgs/CashSvg";
import MicroscopeSvg from "../../../../Common/Svgs/MicroscopeSvg";
import UseHeart from "../../../../Common/Svgs/UseHeart";
import CashSvg2 from "../../../../Common/Svgs/CashSvg2";
import { useRouter } from "next/router";

const Statistika = () => {
  const router = useRouter();
  const [patient, setPatient] = useState({});
  const [currency, setCurrency] = useState({});
  const [generalData, setGeneralData] = useState({});
  const formatter = (value) => <CountUp end={value} separator=" " />;
  const [dateString, setDateString] = useState(["", ""]);
  const [data, setData] = useState({});

  useEffect(() => {
    OrderProvider.getCurrencyDashboard()
      .then((res) => {
        setCurrency(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          router.push("/login");
        } else {
          console.log(err);
        }
      });
  }, []);

  // useEffect(() => {
  //   OrderProvider.getLaborantStatistika()
  //     .then((res) => {
  //       setData(res.data.data);
  //       console.log(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  function numberFormat(sonlar) {
    const sonlarStr = sonlar.toString();

    if (sonlarStr.length <= 3) {
      return sonlarStr;
    } else {
      const qolganQism = sonlarStr.length % 3 || 3;
      let ajratilganSonlar = sonlarStr.slice(0, qolganQism);

      for (let i = qolganQism; i < sonlarStr.length; i += 3) {
        ajratilganSonlar += " " + sonlarStr.slice(i, i + 3);
      }

      return ajratilganSonlar;
    }
  }

  useEffect(() => {
    PatientProvider.getPatientStatistic()
      .then((res) => {
        setPatient(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    OrderProvider.getGeneralData(dateString[0], dateString[1])
      .then((res) => {
        console.log(res);
        setGeneralData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dateString]);

  return (
    <StatistikaWrapper>
      <div className="top">
        <h3>Umumiy statistika</h3>
        <RangePicker
          size="large"
          onChange={(date, dateString) => {
            setDateString(dateString);
            console.log(dateString);
          }}
        />
      </div>

      <div className="bottom">
        {/* <div
          className="roww"
          style={{ marginBottom: 16, justifyContent: "space-between" }}
        >
          <div>
            <Card bordered={true}>
              <div bordered={true} className="bottom">
                <p>Navbatda</p>{" "}
                <span>
                  {data.inLine ? (
                    <CountUp end={data.inLine} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
            </Card>
          </div>
          <div>
            <Card bordered={true}>
              <div bordered={true} className="bottom">
                <p>Kutilmoqda</p>{" "}
                <span>
                  {data.pending ? (
                    <CountUp end={data.pending} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
            </Card>
          </div>
          <div>
            <Card bordered={true}>
              <div bordered={true} className="bottom">
                <p>Rad etilgan</p>{" "}
                <span>
                  {data.reject ? (
                    <CountUp end={data.reject} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
            </Card>
          </div>
          <div>
            <Card bordered={true}>
              <div bordered={true} className="bottom">
                <p>Tayyor</p>{" "}
                <span>
                  {data.ready ? (
                    <CountUp end={data.ready} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
            </Card>
          </div>
          <div>
            <Card bordered={true}>
              <div bordered={true} className="bottom">
                <p>Bekor qilingan</p>{" "}
                <span>
                  {data.failed ? (
                    <CountUp end={data.failed} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
            </Card>
          </div>
        </div> */}
        <Row gutter={12} style={{ marginBottom: 30 }}>
          <Col span={6}>
            <Card bordered={true} className="topCards">
              <h3>Kunlik</h3>
              <div bordered={true} className="bottom">
                <p>Bemorlar soni:</p>{" "}
                <span>
                  {patient.currentPatientCount ? (
                    <CountUp end={patient.currentPatientCount} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
              <div bordered={true} className="bottom">
                <p>Kirim:</p>{" "}
                <span>
                  {currency.currentDayIncome ? (
                    <CountUp end={currency.currentDayIncome} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true} className="topCards">
              <h3>Haftalik</h3>
              <div className="bottom">
                <p>Bemorlar soni:</p>{" "}
                <span>
                  {patient.currentWeekCount ? (
                    <CountUp end={patient.currentWeekCount} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
              <div className="bottom">
                <p>Kirim:</p>{" "}
                <span>
                  {currency.currentWeekIncome ? (
                    <CountUp end={currency.currentWeekIncome} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true} className="topCards">
              <h3>Oylik</h3>
              <div className="bottom">
                <p>Bemorlar soni:</p>{" "}
                <span>
                  {patient.currentMonthCount ? (
                    <CountUp end={patient.currentMonthCount} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
              <div className="bottom">
                <p>Kirim:</p>{" "}
                <span>
                  {currency.currentMonthIncome ? (
                    <CountUp end={currency.currentMonthIncome} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true} className="topCards">
              <h3>Yillik</h3>
              <div className="bottom">
                <p>Bemorlar soni:</p>{" "}
                <span>
                  {patient.currentYearCount ? (
                    <CountUp end={patient.currentYearCount} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
              <div className="bottom">
                <p>Kirim:</p>{" "}
                <span>
                  {currency.currentYearIncome ? (
                    <CountUp end={currency.currentYearIncome} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
            </Card>
          </Col>
        </Row>
        <Row
          gutter={12}
          style={{
            marginBottom: 30,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Col span={6} style={{ marginBottom: 10 }}>
            <Card bordered={true} className="topCards1">
              <div className="svg">
                <CashSvg />
              </div>
              <Statistic
                title="Naqd to'langan miqdor"
                value={generalData?.totalCashSum}
                formatter={formatter}
                className="stat"
              />
            </Card>
          </Col>
          <Col span={6} style={{ marginBottom: 10 }}>
            <Card bordered={true} className="topCards1">
              <div className="svg">
                <CardSvg />
              </div>
              <Statistic
                title="Plastikdan to'langan miqdor"
                value={generalData?.totalPlasticSum}
                formatter={formatter}
                className="stat"
              />
            </Card>
          </Col>
          <Col span={6} style={{ marginBottom: 10 }}>
            <Card bordered={true} className="topCards1">
              <div className="svg">
                <ReturnCash />
              </div>
              <Statistic
                title="Qaytarilgan miqdor"
                value={generalData?.totalReturnedSum}
                formatter={formatter}
                className="stat"
              />
            </Card>
          </Col>
          <Col span={6} style={{ marginBottom: 10 }}>
            <Card bordered={true} className="topCards1">
              <div className="svg">
                <TotalSum />
              </div>
              <Statistic
                title="Jami miqdor"
                value={generalData?.totalSumma}
                formatter={formatter}
                className="stat"
              />
            </Card>
          </Col>
          <Col span={6} style={{ marginBottom: 10 }}>
            <Card bordered={true} className="topCards1">
              <div className="svg">
                <MicroscopeSvg />
              </div>
              <Statistic
                title="Analizlar soni"
                value={generalData?.analysisCount}
                formatter={formatter}
                className="stat"
              />
            </Card>
          </Col>
          <Col span={6} style={{ marginBottom: 10 }}>
            <Card bordered={true} className="topCards1">
              <div className="svg">
                <UseHeart />
              </div>
              <Statistic
                title="Bemorlar soni"
                value={generalData?.patientCount}
                formatter={formatter}
                className="stat"
              />
            </Card>
          </Col>
          <Col span={6} style={{ marginBottom: 10 }}>
            <Card bordered={true} className="topCards1">
              <div className="svg">
                <CardSvg />
              </div>
              <Statistic
                title="Plastik orqali to`lov"
                value={generalData?.plasticAmountCount}
                formatter={formatter}
                className="stat"
              />
            </Card>
          </Col>
          <Col span={6} style={{ marginBottom: 10 }}>
            <Card bordered={true} className="topCards1">
              <div className="svg">
                <CashSvg2 />
              </div>
              <Statistic
                title="Naqd orqali to`lov"
                value={generalData?.cashAmountCount}
                formatter={formatter}
                className="stat"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12} style={{ marginBottom: 16 }}>
            <Card bordered={true}>
              <div class="card-title">Laboratoriyalardagi kirim</div>
              <PieStatistic dateString={dateString} />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={true}>
              <div class="card-title">Haftalik kirim</div>
              <LineCHarts />
            </Card>
          </Col>
          <Col span={24}>
            <Card bordered={true}>
              <div class="card-title">
                So`nggi 10 kundagi naqd va plastikdagi tushumlar
              </div>
              <BarChart />
            </Card>
          </Col>
        </Row>
      </div>
    </StatistikaWrapper>
  );
};

export default Statistika;
