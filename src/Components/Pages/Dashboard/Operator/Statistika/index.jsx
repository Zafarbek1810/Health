import React, { useEffect, useState } from "react";
import StatistikaWrapper from "./style";
import { Card, Col, DatePicker, Row, Statistic } from "antd";
const { RangePicker } = DatePicker;
import LineCHarts from "./LineCharts";
import OrderProvider from "../../../../../Data/OrderProvider";
import PatientProvider from "../../../../../Data/PatientProvider";

const Statistika = () => {
  const [currency, setCurrency] = useState({});

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
      </div>

      <div className="bottom">
        <Row gutter={16} style={{ marginBottom: 30 }}>
          <Col span={6}>
            <Card bordered={true}>
              <Statistic
                title="Kunlik bemorlar soni"
                value={
                  currency.currentPatientCount
                    ? currency.currentPatientCount
                    : "0"
                }
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true}>
              <Statistic
                title="Haftalik bemorlar soni"
                value={
                  currency.currentWeekCount
                    ? currency.currentWeekCount
                    : "0"
                }
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true}>
              <Statistic
                title="Oylik bemorlar soni"
                value={
                  currency.currentMonthCount
                    ? currency.currentMonthCount
                    : "0"
                }
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true}>
              <Statistic
                title="Yillik bemorlar soni"
                value={
                  currency.currentYearCount
                    ? currency.currentYearCount
                    : "0"
                }
                // prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Card bordered={true}>
              <div class="card-title">Oxirgi 10 kunlikdagi yangi bemorlar statistikasi</div>
              <LineCHarts />
            </Card>
          </Col>
        </Row>
      </div>
    </StatistikaWrapper>
  );
};

export default Statistika;
