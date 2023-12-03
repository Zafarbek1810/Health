import * as echarts from "echarts";

import React, { useEffect, useState } from "react";
import OrderProvider from "../../../../../../Data/OrderProvider";

const PieStatistic = () => {
  const [data, setData] = useState([])

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
    const echartElemPie = document.getElementById("echartPie");

    if (echartElemPie) {
      const echartPie = echarts.init(echartElemPie);

      const options = {
        color: [
          "#f77f00",
          "#120a8f",
          "red",
          "#4cbb17",
          "#f15e03",
        ],
        tooltip: {
          show: true,
          backgroundColor: "rgba(0, 0, 0, .8)",
        },
        series: [
          {
            name: "Bemorlarning natija holatlari",
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            data: [
                { value: data.inLine, name: "Navbatda" },
                { value: data.pending, name: "Kutmoqda" },
                { value: data.reject, name: "Rad etilgan" },
                { value: data.ready, name: "Tayyor" },
                { value: data.failed, name: "Bekor qilingan" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      echartPie.setOption(options);

      window.addEventListener("resize", () => {
        setTimeout(() => {
          echartPie.resize();
        }, 500);
      });
    }
  }, [data]);

  return <div id="echartPie" style={{ width: "100%", height: "400px" }} />;
};

export default PieStatistic;
