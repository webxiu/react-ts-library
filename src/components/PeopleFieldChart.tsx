import React, { useEffect, useRef, useState } from "react";
import echarts, { EChartOption, ECharts } from "echarts";

const EchartsOptions = (
  xAxisData: string[],
  seriesData: number[]
): EChartOption => {
  const COLOR_MAP = ["#2d85f0", "#ffbc32", "#0aa858", "#f60", "#f4433c"];
  return {
    title: {
      text: "按频次均等统计",
      top: "10",
      left: "50%",
      textStyle: { color: "#fff" },
    },
    xAxis: {
      name: "出现频次",
      type: "category",
      data: xAxisData,
      axisTick: { show: false, alignWithLabel: true },
      axisLine: {
        symbol: ["none", "arrow"],
        symbolOffset: [0, 25],
        lineStyle: {
          color: "#797979",
          width: 2,
          shadowOffsetX: 22, //利用阴影进行延长
          shadowColor: "#797979",
        },
      },
      nameTextStyle: {
        fontSize: 14,
        padding: [30, 0, 0, 15], // 四个数字分别为上右下左与原位置距离
      },
    },
    yAxis: {
      name: "人数",
      type: "value",
      axisTick: { show: false },
      // max: function (value) {
      //   return value.max + 0.1 * value.max;
      // },
      axisLine: {
        symbol: ["none", "arrow"],
        symbolOffset: [0, 25],
        lineStyle: {
          color: "#797979",
          width: 2,
          shadowOffsetY: -20, //利用阴影进行延长坐标轴箭头
          shadowColor: "#797979",
        },
      },
      splitLine: {
        show: true,
        lineStyle: { type: "dashed", color: "#44444F" }, // 横虚线
      },
      minInterval: 1,
      nameTextStyle: {
        fontSize: 14,
        padding: [0, 45, 10, 0], // 坐标轴名称位置
      },
    },
    grid: {
      // 图表到边的距离
      left: "3%",
      right: "20%",
      bottom: "8%",
      containLabel: true,
    },
    textStyle: { color: "#00f" }, // 坐标轴字体颜色
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" }, // 坐标轴指示器，默认为直线，可选为：'line' | 'shadow'
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
            backgroundColor: "#0f0",
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
    const y = [120, 200, 150, 80, 70];
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
