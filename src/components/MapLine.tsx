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

const random = (min: number = 100, max: number = 5000) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const dataLine1: any = [
  { value: random(), name: "10:00" },
  { value: random(), name: "10:30" },
  { value: random(), name: "11:00" },
  { value: random(), name: "11:30" },
  { value: random(), name: "12:00" },
  { value: random(), name: "12:30" },
  { value: random(), name: "13:00" },
  { value: random(), name: "13:30" },
];
const dataLine2: any = [
  { value: random(), name: "10:00" },
  { value: random(), name: "10:30" },
  { value: random(), name: "11:00" },
  { value: random(), name: "11:30" },
  { value: random(), name: "12:00" },
  { value: random(), name: "12:30" },
  { value: random(), name: "13:00" },
  { value: random(), name: "13:30" },
];
const dataLine3: any = [
  { value: random(), name: "10:00" },
  { value: random(), name: "10:30" },
  { value: random(), name: "11:00" },
  { value: random(), name: "11:30" },
  { value: random(), name: "12:00" },
  { value: random(), name: "12:30" },
  { value: random(), name: "13:00" },
  { value: random(), name: "13:30" },
];
const dataX: string[] = dataLine3.map((item: any) => item.name);
const Map: React.FC<Props> = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [echartsInstance, setEchartsInstance] = useState<any>(null);
  const option: EChartOption | any = {
    title: {
      text: "新增样本/检材/终端数量统计",
      subtext: "子标题",
      // left: "40%",
      top: "10",
      right: "auto",
      bottom: "auto",
      textAlign: "left", // 标题居中
    },

    tooltip: {
      show: true,
      trigger: "axis",
      backgroundColor: "#f0f", //提示标签背景颜色
      textStyle: { color: "#ffa", align: "left" }, //提示标签字体颜色
      // formatter: "{a} <br/>{b}: {c} ({d}%)",
      // formatter: (params: any) => {
      //   console.log('线图参数:', params)
      //   return `{a}${params.name}:${params.value}`;
      // },
    },
    /** 图标宽高 */
    grid: {
      containLabel: true,
      left: 10,
      right: 100,
      top: 60,
      bottom: 50,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: dataX,
    },
    yAxis: {
      type: "value",
    },
    // dataZoom: [{ type: "inside" }, { type: "slider" }],
    dataZoom: [
      //给x轴设置滚动条
      {
        type: "slider",
        start: 0, //默认为0
        end: 50,
        show: true,
        xAxisIndex: [0],
        handleSize: 20, //滑动条的 左右2个滑动条的大小
        height: 20, //组件高度
        left: 50, //左边的距离
        right: 100, //右边的距离
        bottom: 20, //右边的距离
        handleColor: "#f60", //h滑动图标的颜色
        handleStyle: {
          borderColor: "#00f",
          borderWidth: "1",
          shadowBlur: 2,
          background: "#ddd",
          shadowColor: "#ddd",
        },
        textStyle: {
          fontSize: 14,
          lineHeight: '20',
          color: "#ddd",
        },
        fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          {
            //给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变
            //给第一个设置0，第四个设置1，就是垂直渐变
            offset: 0,
            color: "#f00",
          },
          {
            offset: 1,
            color: "#00f",
          },
        ]),
        backgroundColor: "#f0f", //两边未选中的滑动条区域的颜色
        showDataShadow: true, //是否显示数据阴影 默认auto
        showDetail: true, //即拖拽时候是否显示详细数值信息 默认true
        handleIcon:
          "M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z",
        filterMode: "filter",
      },
      //下面这个属性是里面拖到
      {
        type: "inside",
        show: true,
        xAxisIndex: [0],
        start: 0, //默认为1
        end: 50,
      },
    ],
    calculable: true,
    // 可以为一个函数返回
    color: ["#f60", "#00f", "#0f0"],
    series: [
      {
        name: "新增样本统计",
        data: dataLine1,
        stack: "总量",
        type: "line",
      },
      {
        name: "检材统计",
        data: dataLine2,
        stack: "总量",
        type: "line",
      },
      {
        name: "终端数量统计",
        data: dataLine3,
        stack: "总量",
        type: "line",
      },
    ],
  };

  useEffect(() => {
    if (!mapRef) return;
    const mychart = echarts.init(
      document.getElementById("aline") as HTMLDivElement
    );
    setEchartsInstance(mychart);
    echartsInstance?.on("click", (params: any) => {
      console.log("params", params);
    });
    echartsInstance?.setOption(option as any);
  }, [mapRef, option]);

  return (
    <div
      id="aline"
      ref={mapRef}
      style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
    ></div>
  );
};

export default Map;
