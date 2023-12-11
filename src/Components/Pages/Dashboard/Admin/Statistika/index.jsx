import React, { useEffect, useState } from "react";
import StatistikaWrapper from "./style";
import { Card, Col, DatePicker, Row, Statistic } from "antd";
const { RangePicker } = DatePicker;
import PieStatistic from "./PieStatistic";
import LineCHarts from "./LineCharts";
import PatientProvider from "../../../../../Data/PatientProvider";
import OrderProvider from "../../../../../Data/OrderProvider";
import CountUp from "react-countup";
import CashSvg from "../../../../Common/Svgs/CashSvg";

const Statistika = () => {
  const [patient, setPatient] = useState({});
  const [currency, setCurrency] = useState({});
  const [generalData, setGeneralData] = useState({});
  const formatter = (value) => <CountUp end={value} separator="," />;
  const [dateString, setDateString] = useState(["", ""]);

  useEffect(() => {
    OrderProvider.getCurrencyDashboard()
      .then((res) => {
        setCurrency(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <Row gutter={12} style={{ marginBottom: 30 }}>
          <Col span={6}>
            <Card bordered={true} className="topCards">
              <h3>Kunlik</h3>
              <div bordered={true} className="bottom">
                <p>Bemorlar soni:</p>{" "}
                <span>
                  {patient.currentPatientCount
                    ? patient.currentPatientCount
                    : "Mavjud emas"}
                </span>
              </div>
              <div bordered={true} className="bottom">
                <p>Kirim:</p>{" "}
                <span>
                  {currency.currentDayIncome
                    ? currency.currentDayIncome
                    : "Mavjud emas"}
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
                  {patient.currentWeekCount
                    ? patient.currentWeekCount
                    : "Mavjud emas"}
                </span>
              </div>
              <div className="bottom">
                <p>Kirim:</p>{" "}
                <span>
                  {currency.currentWeekIncome
                    ? numberFormat(currency.currentWeekIncome)
                    : "Mavjud emas"}
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
                  {patient.currentMonthCount
                    ? numberFormat(patient.currentMonthCount)
                    : "Mavjud emas"}
                </span>
              </div>
              <div className="bottom">
                <p>Kirim:</p>{" "}
                <span>
                  {currency.currentMonthIncome
                    ? numberFormat(currency.currentMonthIncome)
                    : "Mavjud emas"}
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
                  {patient.currentYearCount
                    ? patient.currentYearCount
                    : "Mavjud emas"}
                </span>
              </div>
              <div className="bottom">
                <p>Kirim:</p>{" "}
                <span>
                  {currency.currentYearIncome
                    ? numberFormat(currency.currentYearIncome)
                    : "Mavjud emas"}
                </span>
              </div>
            </Card>
          </Col>

          {/* <Col span={5}>
            <Card bordered={true}>
              <Statistic
                title="Haftalik bemorlar soni"
                value={
                  currency.currentWeekCount
                    ? currency.currentWeekCount
                    : "Mavjud emas"
                }
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card bordered={true}>
              <Statistic
                title="Oylik bemorlar soni"
                value={
                  currency.currentMonthCount
                    ? currency.currentMonthCount
                    : "Mavjud emas"
                }
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card bordered={true}>
              <Statistic
                title="Yillik bemorlar soni"
                value={
                  currency.currentYearCount
                    ? currency.currentYearCount
                    : "Mavjud emas"
                }
                // prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card bordered={true}>
              <Statistic
                title="Jami bemorlar soni"
                value={currency.allCount ? currency.allCount : "Mavjud emas"}
                // prefix={<DollarOutlined />}
              />
            </Card>
          </Col> */}
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
                <img src="/images/cash.png" alt="" />
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
                <img src="/images/credit-card.png" alt="" />
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
                <img src="/images/cash-withdraw.png" alt="" />
              </div>
              <Statistic
                title="Qaytarilgan pul"
                value={generalData?.totalReturnedSum}
                formatter={formatter}
                className="stat"
              />
            </Card>
          </Col>
          <Col span={6} style={{ marginBottom: 10 }}>
            <Card bordered={true} className="topCards1">
              <div className="svg">
                <img src="/images/cash-wallet.png" alt="" />
              </div>
              <Statistic
                title="Jami summa"
                value={generalData?.totalSumma}
                formatter={formatter}
                className="stat"
              />
            </Card>
          </Col>
          <Col span={6} style={{ marginBottom: 10 }}>
            <Card bordered={true} className="topCards1">
              <div className="svg">
                <img src="/images/microscope.png" alt="" />
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
                <img src="/images/patient.png" alt="" />
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
                <img src="/images/bank-card.png" alt="" />
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
                <img src="/images/cash-payment.png" alt="" />
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
          <Col span={12}>
            <Card bordered={true}>
              <div class="card-title">Laboratoriyalardagi bemorlar soni</div>
              <PieStatistic />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={true}>
              <div class="card-title">Yangi bemorlar statistikasi</div>
              <LineCHarts />
            </Card>
          </Col>
        </Row>
      </div>
    </StatistikaWrapper>
  );
};

export default Statistika;
