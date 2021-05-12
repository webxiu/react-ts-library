import React, { useEffect, useRef, useState } from "react";
import echarts, { EChartOption, ECharts } from "echarts";

const EchartsOptions = (
  yAxisData: number[],
  seriesData: number[]
): EChartOption => {
  const COLOR_MAP = ["#2d85f0", "#ffbc32", "#0aa858", "#f60", "#f4433c"];
  const rich: any = {
    one: {
      color: "#f5ed00",
      fontSize: 25,
      padding: [1.5, 0],
      align: "center",
    },
    two: {
      color: "#c58029",
      fontSize: 20,
      padding: [1.5, 0],
      align: "center",
    },
    three: {
      color: "#fdaaeb",
      align: "center",
      fontSize: 32,
      padding: [1.5, 0],
    },
    four: {
      color: "#EF3E5A",
      fontSize: 25,
      align: "center",
    },
    five: {
      color: "#f60",
      fontSize: 20,
      align: "center",
    },
    six: {
      color: "#f0f",
      fontSize: 20,
      align: "center",
    },
  };

  const dataPie: any = [
    { value: 335, name: "18-30岁" },
    { value: 310, name: "31-40岁" },
    { value: 234, name: "41-50岁" },
    { value: 135, name: "51-60岁" },
    { value: 1548, name: "61岁以上" },
    { value: 542, name: "未标明" },
  ];

  const level = [
    "一级：[80，90]",
    "二级：[50，90)",
    "三级：[45，50)",
    "四级：[20，45)",
    "五级：[0，20)",
    "五级：[0，20)",
  ];

  return {
    title: {
      text: "按人数均等统计",
      left: "50%",
      top: "10",
    },
    xAxis: {
      show: true,
      type: "value",
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        padding: [-18, 30, 20, 6],
        formatter: (params: any) => {
          return params === 0 ? 0 : "";
        },
      },
    },
    yAxis: {
      name: "频次",
      type: "category",
      data: yAxisData,

      axisTick: { show: false },
      max: function (value) {
        return value.max + 0.1 * value.max;
      },
      axisLine: {
        show: true,
        symbol: ["none", "arrow"],
        lineStyle: { color: "#44444F", width: 2 },
      },
      axisLabel: {
        lineHeight: 80,
        verticalAlign: "bottom",
      },
      splitLine: {
        show: false,
      },
      minInterval: 1,
    },
    grid: {
      left: "3%",
      right: "60%",
      bottom: "3%",
      containLabel: true,
    },
    textStyle: { color: "#0f0" },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" }, // 坐标轴指示器 , 默认为直线，可选为：'line' | 'shadow'
      // formatter: (params: { name: string; dataIndex: number; value: number }[]) => {
      //   // const main_identity_number = originData[params[0].dataIndex].main_identity_number;
      //   // const gender = originData[params[0].dataIndex].gender;
      //   return `姓名：${params[0].name}<br/>性别：`;
      // }
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
          color: (params: any) => {
            const color =
              COLOR_MAP[params.dataIndex] ||
              COLOR_MAP[Math.floor(Math.random() * 9)];
            return color;
          },
        },
        label: {
          show: true,
          position: ["40%", "50%"],
          textStyle: { color: "#00f", fontSize: 16 },
          formatter: (params: any) => {
            let str = "";
            for (let i = 0; i < 100; i++) {
              str += "\t";
            }
            return params.value + "人" + str + level[params.dataIndex];
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
    const x = [10, 20, 45, 50, 80, 91];
    const y = [18, 18, 18, 18, 18];
    EchartsInstance.setOption(EchartsOptions(x, y));
  }, [EchartsInstance]);

  useEffect(() => {
    const AutoEcharts = () => {
      EchartsInstance?.resize();
    };
    window.addEventListener("resize", AutoEcharts);
    return () => {
      window.removeEventListener("resize", AutoEcharts);
    };
  }, [EchartsInstance]);

  return (
    <div
      ref={EcharsRef}
      style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
    ></div>
  );
};

export default Wrap;
