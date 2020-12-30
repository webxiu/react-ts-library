import React, { useEffect, useRef, useState } from "react";
import echarts, { EChartOption, ECharts } from "echarts";

interface Props {}
const data: { name: string; value: number }[] = [
  { name: "南海诸岛", value: 0 },
  { name: "香港", value: 70 },
  { name: "澳门", value: 2 },
];

const COLOR_MAP = [
  ["#5A7BEF", "#4048EF"],
  ["#FE9B86", "#F15887"],
  ["#5A7BEF", "#4048EF"],
  ["#14D2B8", "#2DC9EB"],
  ["#fff", "#fff"],
  ["#A573FF", "#645AFF"],
  ["#FFA073", "#FF8298"],
  ["#14D2B8", "#2DC9EB"],
  ["#5A7BEF", "#4048EF"],
];

const Map: React.FC<Props> = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [echartsInstance, setEchartsInstance] = useState<any>(null);
  const option: EChartOption | any = {
    title: {
      text: "主要的标题",
      subtext: "子标题",
      left: "40%",
      top: "10",
      right: "auto",
      bottom: "auto",
      textAlign: "center", // 标题居中
    },

    tooltip: {
      show: true,
      trigger: 'item',
      backgroundColor: "#f3214c", //提示标签背景颜色
      textStyle: { color: "#ffa" }, //提示标签字体颜色
      // formatter: (params: any) => {
      //   return `${params.name}:${params.value}`;
      // },
      formatter: '{a}<br/>{b}: {c}'
    },
    /** 图标kuangao */
    grid: {
      containLabel: true,
      left: 10,
      right: 5,
      top: 60,
      bottom: 10,
    },
    xAxis: {
      type: "category",
      data: ["类别1", "类别2", "类别3", "类别4", "类别5", "类别6", "类别7"],
      axisLabel: {
        color: "#f0f",
        fontSize: 10,
        margin: 5,
        interval: 0,
        formatter: (value: string, index: number) => {
          return `${value.charAt(0) || ""}${value.charAt(1) || ""}${
            value.charAt(2) ? "..." : ""
          }`;
        },
      },
      show: true,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#f60",
      },
      splitLine: {
        show: false,
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    // 可以为一个函数返回
    series: [
      {
        name: "人员分布",
        data: [120, 300, 150, 80, 70, 110, 130],
        type: "bar",
        // 柱状图背景色
        showBackground: true,
        backgroundStyle: {
          // color: "rgba(255, 0, 220, 0.5)",
          color: "#0f0",
        },
        itemStyle: {
          shadowColor: "rgba(0, 0, 0, 0.5)",
          shadowBlur: 10,
          // barBorderRadius: 4, // 柱子圆角
          barBorderRadius: [5, 5, 0, 0],
          color: (params: any) => {
            const color =
              COLOR_MAP[params.dataIndex] ||
              COLOR_MAP[Math.floor(Math.random() * 9)];
            const index = params.dataIndex % 2; // 各行换色
            return index == 1 ? "#f60" : "#00f";
            // 颜色渐变
            // return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //     {offset: 0, color: color[0]},
            //     {offset: 1, color: color[1]},
            // ]);
          },
        },
      },
    ],
  };

  useEffect(() => {
    if (!mapRef) return;
    const mychart = echarts.init(
      document.getElementById("abar") as HTMLDivElement
    );
    setEchartsInstance(mychart);
    echartsInstance?.on("click", (params: any) => {
      console.log("params", params);
    });
    echartsInstance?.setOption(option as any);
  }, [mapRef, option]);

  return (
    <div
      id="abar"
      ref={mapRef}
      style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
    ></div>
  );
};

export default Map;
