import "echarts/map/js/china.js";

import React, { useEffect, useRef, useState } from "react";
import { cityCode, province } from "../data/cityMap";
import echarts, { EChartOption, ECharts } from "echarts";

import { Button } from "antd";
import china from "../assets/map/china.json";

const com = () => {
  return (
    <div>
      <p>333333</p>
      <p>333333</p>
      <p>333333</p>
      <p>333333</p>
    </div>
  );
};

console.log("china", china);

interface Props {}
const data: { name: string; value: number }[] = [
  { name: "南海诸岛", value: 0 },
  { name: "北京", value: 97 },
  { name: "天津", value: 5 },
  { name: "上海", value: 30 },
  { name: "重庆", value: 2300 },
  { name: "河北", value: 2 },
  { name: "河南", value: 5000 },
  { name: "云南", value: 122 },
  { name: "辽宁", value: 4 },
  { name: "黑龙江", value: 13 },
  { name: "湖南", value: 129 },
  { name: "安徽", value: 300 },
  { name: "山东", value: 50 },
  { name: "新疆", value: 2000 },
  { name: "江苏", value: 499 },
  { name: "浙江", value: 300 },
  { name: "江西", value: 2689 },
  { name: "湖北", value: 86285 },
  { name: "广西", value: 3 },
  { name: "甘肃", value: 40 },
  { name: "山西", value: 1000 },
  { name: "内蒙古", value: 300 },
  { name: "陕西", value: 7 },
  { name: "吉林", value: 8000 },
  { name: "福建", value: 0 },
  { name: "贵州", value: 500 },
  { name: "广东", value: 49 },
  { name: "青海", value: 400 },
  { name: "西藏", value: 0 },
  { name: "四川", value: 17 },
  { name: "宁夏", value: 3000 },
  { name: "海南", value: 800 },
  { name: "台湾", value: 54 },
  { name: "香港", value: 70 },
  { name: "澳门", value: 2 },
];
const Map: React.FC<Props> = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [echartsInstance, setEchartsInstance] = useState<any>(null);
  const option: EChartOption | any = {
    layoutCenter: ["40%", "50%"], //图标平移位置
    layoutSize: "50%", //缩放大小
    title: {
      text: "主要的标题",
      subtext: "子标题",
      left: "40%",
      top: "50",
      right: "auto",
      bottom: "auto",
      textAlign: "center", // 标题居中
    },
    toolbox: {
      feature: {
        myTool1: {
          show: true,
          title: "自定义扩展方法1",
          icon: "image://http://echarts.baidu.com/images/favicon.png",
          onclick: function () {
            alert("myToolHandler1");
          },
        },
      },
    },
    graphic: {
      elements: [
        {
          type: "text",
          right: 100,
          top: 200,
          z: -10,
          style: {
            text: [
              "自定义文字自定义文字",
              "自定义文字自定义文字",
              "自定义文字自定义文字",
              "自定义文字自定义文字",
              "自定义文字",
            ].join("\n"),
            font: "14px Microsoft YaHei",
          },
        },
      ],
    },
    visualMap: [
      {
        dimension: 0,
        inRange: {
          color: [ "#0f0", "#4575b4", "#74add1", "#f46d43", "#00f"],
        },
        pieces: [
          { min: 10000, label: "10000以上" },
          { min: 5000, max: 10000, label: "5000-10000" },
          { min: 1000, max: 5000, label: "1000-5000" },
          { min: 100, max: 1000, label: "100-1000" },
          { min: 0, max: 100, label: "100以下" },
        ],
        show: true,
      },
    ],
    tooltip: {
      show: true,
      backgroundColor: "#f00", //提示标签背景颜色
      textStyle: { color: "#fff" }, //提示标签字体颜色
      formatter: (params: any) => {
        console.log("地图数据", params);
        const data = params.data;
        if (data) {
          return `${data.name} <br />
            塔机: ${data.taji} <br />
            送货电梯: ${data.dianti} <br />
          `;
        } else {
          return "暂无数据";
        }
      },
    },
    geo: {
      zoom: 1,
      nameProperty: "name",
      nameMap: {
        aomen: "澳门",
        zoom: 5,
      },
      itemStyle: {
        label: {
          show: true,
        },
      },
      regions: [
        {
          name: "澳门",
          itemStyle: {
            areaColor: "red",
            color: "red",
          },
          label: {
            show: true,
          },
          zoom: 5,
        },
      ],
    },
    // 可以为一个函数返回
    series: [
      {
        name: "标题==",
        type: "map",
        map: "china",
        data: [
          { name: "新疆", value: 463, taji: 755, dianti: 254 },
          { name: "江苏", value: 899, taji: 1111, dianti: 111 },
          { name: "浙江", value: 300, taji: 222, dianti: 222 },
          { name: "江西", value: 2689, taji: 333, dianti: 333 },
          { name: "湖北", value: 86285, taji: 444, dianti: 444 },
        ],
        zoom: 2,
        roam: true,
        itemStyle: {
          normal: {
            borderWidth: 1, //区域边框宽度
            borderColor: "#ccc", //区域边框颜色
            areaColor: "#f60", //区域颜色
          },
          emphasis: {
            borderWidth: 1, // 区域hover线宽
            borderColor: "#f60", // 区域hover线颜色
            areaColor: "#0f0", // 区域hover背景颜色
          },
        },
      },
    ],
  };

  useEffect(() => {
    if (!mapRef) return;
    const mychart = echarts.init(
      document.getElementById("china") as HTMLDivElement
    );
    setEchartsInstance(mychart);
    echartsInstance?.on("click", (params: any) => {
      console.log("params", params);

      if (params?.name in province) {
        const city = province[params?.name];
        const option1: EChartOption = {
          visualMap: [
            {
              dimension: 0,
              inRange: {
                color: [
                  "#fff",
                  "#4575b4",
                  "#74add1",
                  "#f46d43",
                  "#d73027",
                  "#a50026",
                ],
              },
              pieces: [
                { min: 10000, label: "10000以上" },
                { min: 5000, max: 10000, label: "5000-10000" },
                { min: 1000, max: 5000, label: "1000-5000" },
                { min: 100, max: 1000, label: "100-1000" },
                { min: 0, max: 100, label: "100以下" },
              ],
              show: true,
            },
          ],
          tooltip: {
            show: true,
            formatter: (params: any) => {
              return `${params.name}:${params.value}`;
            },
          },
          series: [
            {
              name: "标题==",
              type: "map",
              map: params?.name,
              data,
            },
          ],
        };
        getCity(`province/${city}`, params, option1);
      } else if (params?.name in cityCode) {
        const code = cityCode[params?.name];
        const option2: EChartOption = {
          visualMap: [
            {
              dimension: 0,
              inRange: {
                color: [
                  "#fff",
                  "#4575b4",
                  "#74add1",
                  "#f46d43",
                  "#d73027",
                  "#a50026",
                ],
              },
              pieces: [
                { min: 10000, label: "10000以上" },
                { min: 5000, max: 10000, label: "5000-10000" },
                { min: 1000, max: 5000, label: "1000-5000" },
                { min: 100, max: 1000, label: "100-1000" },
                { min: 0, max: 100, label: "100以下" },
              ],
              show: true,
            },
          ],
          tooltip: {
            show: true,
            formatter: (params: any) => {
              return `${params.name}:${params.value}`;
            },
          },
          series: [
            {
              name: "标题==",
              type: "map",
              map: params?.name,
              data,
            },
          ],
        };
        getCity(`city/${code}`, params, option2);
      }
    });
    echartsInstance?.setOption(option as any);
  }, [mapRef, option]);

  /** 获取省市 */
  const getCity = (url: string, params: any, option: EChartOption) => {
    echartsInstance.showLoading({
      text: "加载中",
      color: "rgba(145,213,255,0.85)", //设置转圈圈字体颜色
      textColor: "rgba(145,213,255,0.85)", //设置文字字体颜色
      maskColor: "rgba(36, 102, 175, 0.05)",
      zlevel: 0,
    });
    import(`../assets/map/${url}.json`).then((geoJson) => {
      console.log("geoJson", geoJson);
      echartsInstance?.hideLoading();
      echarts?.registerMap(params?.name, geoJson.default);
      echartsInstance?.setOption(option);
    });
  };

  const goback = () => {
    echartsInstance?.setOption(option as any);
  };
  return (
    <>
      <Button onClick={goback}>返回</Button>
      <div
        id="china"
        ref={mapRef}
        style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
      ></div>
    </>
  );
};

export default Map;
