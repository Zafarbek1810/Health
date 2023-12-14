import { useEffect, useState } from "react";
import * as echarts from "echarts";
import LabaratoryProvider from "../../../../../../Data/LabaratoryProvider";

const BarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    LabaratoryProvider.getSummTenDay()
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const echartElemBar = document.getElementById("echartBar");

    if (echartElemBar) {
      const echartBar = echarts.init(echartElemBar);

      const options = {
        legend: {
          borderRadius: 0,
          orient: "horizontal",
          x: "right",
          data: ["Naqd", "Plastik"],
        },
        grid: {
          left: "8px",
          right: "8px",
          bottom: "0",
          containLabel: true,
        },
        tooltip: {
          show: true,
          backgroundColor: "rgba(0, 0, 0, .8)",
        },
        xAxis: [
          {
            type: "category",
            data: data.map((item)=>(item.date.slice(5))),
            axisTick: {
              alignWithLabel: true,
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}",
            },
            // min: 200000,
            // max: 1000000,
            // interval: 100000,
            axisLine: {
              show: false,
            },
            splitLine: {
              show: true,
              interval: "auto",
            },
          },
        ],
        series: [
          {
            name: "Naqd",
            data: data.map((item)=>(item.totalCash)),
            label: {
              show: false,
              color: "#0168c1",
            },
            type: "bar",
            barGap: 0,
            color: "#4390f580",
            smooth: true,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: -2,
                shadowColor: "rgba(0, 0, 0, 0.3)",
              },
            },
          },
          {
            name: "Plastik",
            data: data.map((item)=>(item.totalPlastic)),
            label: {
              show: false,
              color: "#639",
            },
            type: "bar",
            color: "rgba(246, 71, 71, 0.5)",
            smooth: true,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: -2,
                shadowColor: "rgba(0, 0, 0, 0.3)",
              },
            },
          },
        ],
      };

      echartBar.setOption(options);

      window.addEventListener("resize", () => {
        setTimeout(() => {
          echartBar.resize();
        }, 500);
      });
    }
  }, [data]);

  return <div id="echartBar" style={{ width: "100%", height: "400px" }} />;
};

export default BarChart;