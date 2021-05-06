import React, { useEffect, useRef, useState } from "react";
import echarts, { EChartOption, ECharts } from "echarts";

const EchartsOptions = (
  xAxisData: string[],
  seriesData: number[]
): EChartOption => {
  const COLOR_MAP = ["#2d85f0", "#ffbc32", "#0aa858", "#f60", "#f4433c"];

  return {
    xAxis: {
      name: "出现频次",
      type: "category",
      data: xAxisData,
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
      axisLine: {
        symbol: ["none", "arrow"],
        lineStyle: {
          color: "#44444F",
          width: 2,
        },
      },
    },
    yAxis: {
      name: "人数",
      type: "value",
      axisTick: {
        show: true,
      },
      max: function (value) {
        return value.max + 0.1 * value.max;
      },
      axisLine: {
        symbol: ["none", "arrow"],
        lineStyle: {
          color: "#44444F",
          width: 2,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#44444F", //44444F
        },
      },
      minInterval: 1,
    },
    textStyle: {
      color: "#00f",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
      // formatter: (params: { name: string; dataIndex: number; value: number }[]) => {
      //   /**
      //    * 姓名：
      //    * 性别
      //    * 身份证号
      //    * 出现在该领域的次数
      //    */
      //   // const main_identity_number = originData[params[0].dataIndex].main_identity_number;
      //   // const gender = originData[params[0].dataIndex].gender;
      //   return `姓名：${params[0].name}<br/>性别：`;
      // }
    },
    legend: {
      show: true,
      //   orient: 'vertical',
      //   data: ['18-30岁', '31-40岁', '41-50岁', '51-60岁', '61岁以上', '未标明'],
      //   top: '12%',
      //   right: '50',
      //   itemGap: 15,
      //   icon: 'square',
      //   textStyle: {
      //     // 边栏字体颜色
      //     color: 'rgba(100, 100, 100, 1)',
      //     fontSize: 16,
      //     rich: rich
      //   },
      //   formatter: function (name: any) {
      //     // console.log("name==", name);
      //     let str: string = '';
      //     dataPie.forEach((item: any, i: number) => {
      //       if (item.name === name) {
      //         const color = Object.keys(rich)[i];
      //         str += `${item.name} | {${color}|${item.value}}%`;
      //       }
      //     });
      //     return str;
      //   }
    },
    series: [
      {
        data: seriesData,
        type: "bar",
        barCategoryGap: "0%",
        itemStyle: {
          shadowColor: "rgba(0, 0, 0, 0.5)",
          shadowBlur: 10,
          // barBorderRadius: 4, // 柱子圆角
          barBorderRadius: [5, 5, 0, 0],

          color: (params: any) => {
            const color =
              COLOR_MAP[params.dataIndex] ||
              COLOR_MAP[Math.floor(Math.random() * 9)];
            return color;
          },
        },
        label: {
          show: true,
          position: "top",
          textStyle: {
            padding: [4, 5, 0, 5],
            color: "#000",
            backgroundColor: "#fff",
            fontSize: 16,
          },
        },
      },
    ],
  };
};

const Wrap: React.FC = (props) => {
  const EcharsRef = useRef<HTMLDivElement>(null);
  const [EchartsInstance, setEchartsInstance] = useState<ECharts | null>(null);
  useEffect(() => {
    if (!EcharsRef) return;
    const instance = echarts.init(EcharsRef.current as HTMLDivElement);
    setEchartsInstance(instance);
  }, [EcharsRef]);

  useEffect(() => {
    if (!EchartsInstance) return;
    const x = ["0-10次", "10-20次", "20-30次", "30-40次", "40-50次"];
    const y = [120, 200, 150, 80, 70, 110, 130];
    EchartsInstance.setOption(EchartsOptions(x, y));
  }, [EchartsInstance]);

  return (
    <div
      ref={EcharsRef}
      style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
    ></div>
  );
};

export default Wrap;
