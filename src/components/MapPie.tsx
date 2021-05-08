import React, { useEffect, useRef, useState } from "react";
import echarts, { EChartOption, ECharts } from "echarts";

interface Props {}
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
      backgroundColor: "#f3214c", //提示标签背景颜色
      textStyle: { color: "#ffa", align: "left" }, //提示标签字体颜色
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      // formatter: (params: any) => {
      //   return `{a}${params.name}:${params.value}`;
      // },
    },
    /** 图标kuangao */
    grid: {
      containLabel: true,
      left: 10,
      right: 5,
      top: 60,
      bottom: 10,
    },
    legend: {
      orient: "vertical",
      data: ["18-30岁", "31-40岁", "41-50岁", "51-60岁", "61岁以上", "未标明"],
      top: "12%",
      right: "50",
      itemGap: 15,
      icon: "square",
      textStyle: {
        // 边栏字体颜色
        color: "rgba(100, 100, 100, 1)",
        fontSize: 16,
        rich: rich,
      },
      formatter: function (name: any) {
        // console.log("name==", name);
        let str: string = "";
        dataPie.forEach((item: any, i: number) => {
          if (item.name === name) {
            const color = Object.keys(rich)[i];
            str += `${item.name} | {${color}|${item.value}}%`;
          }
        });
        return str;
      },
    },
    // 可以为一个函数返回
    series: [
      {
        name: "位置追踪",
        data: dataPie,
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        // 是否显示环形中间的文字formatter
        label: {
          show: false,
          position: "center", // 文字再环形中间还是两边: right/left...
          // formatter: function (params:any) {
          //   console.log('params*****', params)
          // }
          formatter: "{b}\n{c} ({d}%)",
        },
        // hover环形中间的文字样式
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        // 柱状图背景色
        showBackground: true,
        backgroundStyle: {
          // color: "rgba(255, 0, 220, 0.5)",
          color: "#0f0",
        },

        itemStyle: {
          color: function (data: any) {
            const index = data.dataIndex;
            const color = Object.keys(rich)[index];
            return rich[color].color;
          },
        },
      },
    ],
  };

  useEffect(() => {
    if (!mapRef) return;
    const mychart = echarts.init(
      document.getElementById("apie") as HTMLDivElement
    );
    setEchartsInstance(mychart);
    echartsInstance?.on("click", (params: any) => {
      console.log("params", params);
    });
    echartsInstance?.setOption(option as any);
  }, [mapRef, option]);

  return (
    <div
      id="apie"
      ref={mapRef}
      style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
    ></div>
  );
};

export default Map;
