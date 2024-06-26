import * as echarts from "echarts";

import React, { useEffect, useState } from "react";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";

const PieStatistic = ({dateString}) => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    LabaratoryProvider.getAllSumm(dateString[0], dateString[1])
    .then(res=>{
      setData(res.data.data)
      console.log(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
  }, [dateString])

  useEffect(() => {
    const echartElemPie = document.getElementById("echartPie");

    if (echartElemPie) {
      const echartPie = echarts.init(echartElemPie);

      const options = {
        color: [
          "#66f89c",
          "#408aeb",
          "#b315b6",
          "#e8eb40",
          "#b63015",
        ],
        tooltip: {
          show: true,
          backgroundColor: "rgba(0, 0, 0, .8)",
        },
        series: [
          {
            name: "Laboratoriyalardagi kirim",
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            // data: [
            //     { value: 1, name: "sss" },
            //     { value: 2, name: "dd" },
            //     { value: 3, name: "ff" },
            //     { value: 4, name: "gg" },
            //     { value: 5, name: "hh" },
            // ],
            data : data?.map((i, index) => {
              return {
                value: i.totalSum,
                name: i.name,
              };
            }),
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
  }, [data, dateString]);

  return <div id="echartPie" style={{ width: "100%", height: "400px" }} />;
};

export default PieStatistic;
