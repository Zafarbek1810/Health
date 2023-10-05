import React, { useEffect, useState } from "react";
import StatistikaWrapper from "./style";
import { Card, Col, DatePicker, Row, Statistic } from "antd";
const { RangePicker } = DatePicker;
import { DiffOutlined, DollarOutlined } from "@ant-design/icons";
import EyeSvg from "../../../../Common/Svgs/EyeSvg"
import PieStatistic from "./PieStatistic";
import LineCHarts from "./LineCharts";
import OrderProvider from "../../../../../Data/OrderProvider";

const Statistika = () => {
  const [currency, setCurrency] = useState({});

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
          <Col span={6}>
            <Card bordered={true}>
              <Statistic
                title="Kunlik tushum"
                value={currency.currentDayIncome ? currency.currentDayIncome :"Mavjud emas"}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true}>
              <Statistic
                title="Haftalik tushum"
                value={currency.currentWeekIncome ? currency.currentWeekIncome  :"Mavjud emas"}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true}>
              <Statistic
                title="Oylik tushum"
                value={currency.currentMonthIncome ? currency.currentMonthIncome :"Mavjud emas"}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={true}>
              <Statistic
                title="Yillik tushum"
                value={currency.currentYearIncome ? currency.currentYearIncome :"Mavjud emas"}
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
