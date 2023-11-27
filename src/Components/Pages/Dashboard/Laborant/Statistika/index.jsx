import React, { useEffect, useState } from "react";
import StatistikaWrapper from "./style";
import { Card, Col, DatePicker, Row, Statistic } from "antd";
const { RangePicker } = DatePicker;
import PieStatistic from "./PieStatistic";
import LineCHarts from "./LineCharts";
import PatientProvider from "../../../../../Data/PatientProvider";
import OrderProvider from "../../../../../Data/OrderProvider";

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
        <RangePicker
          size="large"
          onChange={(date, dateString) => {
            console.log(date, dateString);
          }}
        />
      </div>

      <div className="bottom">
        <Row gutter={16} style={{ marginBottom: 30 }}>
          <Col span={5}>
            <Card bordered={true}>
              <Statistic
                title="Navbatda"
                value={
                  data.inLine
                    ? data.inLine
                    : "Mavjud emas"
                }
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card bordered={true}>
              <Statistic
                title="Kutmoqda"
                value={
                  data.pending
                    ? data.pending
                    : "Mavjud emas"
                }
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card bordered={true}>
              <Statistic
                title="Rad etilgan"
                value={
                  data.reject
                    ? data.reject
                    : "Mavjud emas"
                }
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card bordered={true}>
              <Statistic
                title="Tayyor"
                value={
                  data.ready
                    ? data.ready
                    : "Mavjud emas"
                }
                // prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card bordered={true}>
              <Statistic
                title="Bekor qilingan"
                value={data.failed ? data.failed : "0"}
                // prefix={<DollarOutlined />}
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
