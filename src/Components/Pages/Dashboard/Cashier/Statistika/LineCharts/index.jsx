import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as echarts from 'echarts';
import LabaratoryProvider from '../../../../../../Data/LabaratoryProvider';

const LineCHarts = () => {
    const [names, setNames] = useState({
        data: [
          "1/11/2018",
          "2/11/2018",
          "3/11/2018",
        ]
    })
      const [series, setSeries] = useState({
        data: [
          15,
          25,
          28,
          32,
          44,
          12
        ]
      })
    
    
      useLayoutEffect(() => {
        LabaratoryProvider.getSummSevenDay()
          .then((res) => {
            console.log("asas", res.data.data);
            setNames({
                data: res.data.data.map((item) => item.date.slice(5)),
            });
            setSeries(
              {
                data: res.data.data.map((item) => item.total_sum),
              },
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    
      useEffect(() => {
        const echartElem3 = document.getElementById("echart3");
    
        if (echartElem3) {
          const echart3 = echarts.init(echartElem3);
    
          const echartsOptions = {
            lineShadow: {
              // Define your line shadow options here
            },
          };
    
          const options = {
            tooltip: {
              show: true,
              trigger: "axis",
              axisPointer: {
                type: "line",
                animation: true,
              },
            },
            grid: {
              top: "10%",
              left: "70",
              right: "10",
              bottom: "40",
            },
            xAxis: {
              type: "category",
              data: names.data,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: series.data,
                lineStyle: {
                  color: "#4290f5",
                  width: 3,
                  ...echartsOptions.lineShadow,
                },
                label: {
                  show: true,
                  color: "#212121",
                },
                type: "line",
                smooth: true,
                itemStyle: {
                  borderColor: "#4290f5",
                },
              },
            ],
          };
    
          echart3.setOption(options);
    
          window.addEventListener("resize", () => {
            setTimeout(() => {
              echart3.resize();
            }, 500);
          });
        }
      }, [names, series]);
    
      return <div id="echart3" style={{ width: "100%", height: "400px" }} />;
};

export default LineCHarts;