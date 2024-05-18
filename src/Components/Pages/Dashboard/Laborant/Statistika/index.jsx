import React, { useEffect, useState } from "react";
import StatistikaWrapper from "./style";
import { Card, Col, DatePicker, Row, Statistic } from "antd";
const { RangePicker } = DatePicker;
import PieStatistic from "./PieStatistic";
import LineCHarts from "./LineCharts";
import PatientProvider from "../../../../../Data/PatientProvider";
import OrderProvider from "../../../../../Data/OrderProvider";
import CountUp from "react-countup";

const Statistika = () => {
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

  return (
    <StatistikaWrapper>
      <div className="top">
        <h3>Umumiy statistika</h3>
        
      </div>

      <div className="bottom">
        <div className="roww" style={{ marginBottom: 30, justifyContent:'space-between' }}>
          <div >
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
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={true} style={{ position: "relative" }}>
              <div class="card-title">Bemorlarning natija holatlari</div>
              <PieStatistic />
              <div
                className="color-wrap"
                style={{ position: "absolute", top: "10px", right: "5px" }}
              >
                <div
                  className="colors"
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span
                    style={{
                      padding: 5,
                      width: 20,
                      height: 20,
                      backgroundColor: "#f77f00",
                      borderRadius: "50%",
                    }}
                  ></span>{" "}
                  Navbatda
                </div>
                <div
                  className="colors"
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span
                    style={{
                      padding: 5,
                      width: 20,
                      height: 20,
                      backgroundColor: "#120a8f",
                      borderRadius: "50%",
                    }}
                  ></span>{" "}
                  Kutmoqda
                </div>
                <div
                  className="colors"
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span
                    style={{
                      padding: 5,
                      width: 20,
                      height: 20,
                      backgroundColor: "red",
                      borderRadius: "50%",
                    }}
                  ></span>{" "}
                  Rad etilgan
                </div>
                <div
                  className="colors"
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span
                    style={{
                      padding: 5,
                      width: 20,
                      height: 20,
                      backgroundColor: "#4cbb17",
                      borderRadius: "50%",
                    }}
                  ></span>{" "}
                  Tayyor
                </div>
                <div
                  className="colors"
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span
                    style={{
                      padding: 5,
                      width: 20,
                      height: 20,
                      backgroundColor: "#f103e5",
                      borderRadius: "50%",
                    }}
                  ></span>{" "}
                  Bekor qilingan
                </div>
              </div>
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
