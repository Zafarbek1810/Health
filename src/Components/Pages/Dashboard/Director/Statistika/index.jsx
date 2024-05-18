import React, { useEffect, useState } from "react";
import StatistikaWrapper from "./style";
import { Card, Col, DatePicker, Row, Statistic } from "antd";
const { RangePicker } = DatePicker;
import { DiffOutlined, DollarOutlined } from "@ant-design/icons";
import EyeSvg from "../../../../Common/Svgs/EyeSvg";
import PieStatistic from "./PieStatistic";
import LineCHarts from "./LineCharts";
import OrderProvider from "../../../../../Data/OrderProvider";
import PatientProvider from "../../../../../Data/PatientProvider";
import CountUp from "react-countup";

const Statistika = () => {
  const [currency, setCurrency] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    OrderProvider.getLaborantStatistika()
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    PatientProvider.getPatientStatistic()
      .then((res) => {
        setCurrency(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <StatistikaWrapper>
      <div className="top">
        <h3>Umumiy statistika</h3>
        {/* <RangePicker
          size="large"
          onChange={(date, dateString) => {
            console.log(date, dateString);
          }}
        /> */}
      </div>

      <div className="bottom">
        <div
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
          {/* <div>
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
          </div> */}
        </div>
        <Row gutter={16} style={{ marginBottom: 30 }}>
          <Col span={6}>
            <Card bordered={true}>
              <div bordered={true} className="bottom">
                <p>Kunlik bemorlar soni</p>{" "}
                <span>
                  {currency.currentPatientCount ? (
                    <CountUp end={currency.currentPatientCount} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true}>
              <div bordered={true} className="bottom">
                <p>Haftalik bemorlar soni</p>{" "}
                <span>
                  {currency.currentWeekCount ? (
                    <CountUp end={currency.currentWeekCount} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true}>
              <div bordered={true} className="bottom">
                <p>Oylik bemorlar soni</p>{" "}
                <span>
                  {currency.currentMonthCount ? (
                    <CountUp end={currency.currentMonthCount} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true}>
              <div bordered={true} className="bottom">
                <p>Yillik bemorlar soni</p>{" "}
                <span>
                  {currency.currentYearCount ? (
                    <CountUp end={currency.currentYearCount} separator=" " />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
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
              <div class="card-title">Oxrgi 10 kunlikdagi tahlillar soni o`zgarish dinamikasi</div>
              <LineCHarts />
            </Card>
          </Col>
        </Row>
      </div>
    </StatistikaWrapper>
  );
};

export default Statistika;
