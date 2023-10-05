import * as echarts from "echarts";

import React, { useEffect } from "react";

const PieStatistic = () => {
  useEffect(() => {
    const echartElemPie = document.getElementById("echartPie");

    if (echartElemPie) {
      const echartPie = echarts.init(echartElemPie);

      const options = {
        color: [
          "#4290f5",
          "#4290f5ea",
          "#408aeb",
          "#4188e4",
          "#2e74d1",
          "#6ca1e7",
        ],
        tooltip: {
          show: true,
          backgroundColor: "rgba(0, 0, 0, .8)",
        },
        series: [
          {
            name: "Laboratoriyalardagi bemorlar soni",
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            data: [
                { value: 1, name: "sss" },
                { value: 2, name: "dd" },
                { value: 3, name: "ff" },
                { value: 4, name: "gg" },
                { value: 5, name: "hh" },
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
  }, []);

  return <div id="echartPie" style={{ width: "100%", height: "400px" }} />;
};

export default PieStatistic;
