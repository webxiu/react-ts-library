import React, { useEffect, useRef, useState } from "react";
import echarts, { EChartOption, ECharts } from "echarts";

const EchartsOptions = (
  yAxisData: number[],
  seriesData: number[]
): EChartOption => {
  const COLOR_MAP = ["#2d85f0", "#ffbc32", "#0aa858", "#f60", "#f4433c"];
  const level = [
    "一级：[80，90]",
    "二级：[50，90)",
    "三级：[45，50)",
    "四级：[20，45)",
    "五级：[0，20)",
  ];

  return {
    title: {
      text: "按人数均等统计",
      left: "50%",
      top: "10",
    },
    xAxis: {
      show: false,
      type: "value",
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
    graphic: {
      elements: [
        {
          type: "text",
          right: 100,
          top: 140,
          z: -10,
          style: {
            text: level.join("\n\n\n\n\n\n"),
            font: '16px "STHeiti", sans-serif',
            fill: "#f00",
          },
        },
      ],
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
          position: "inside",
          textStyle: { color: "#fff", fontSize: 16 },
          formatter: (params: any) => params.value + "人",
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
    const x = [0, 20, 45, 50, 80, 90];
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
