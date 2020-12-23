import "echarts/map/js/china.js";

import React, { useEffect, useRef, useState } from "react";
import { cityCode, province } from "../data/cityMap";
import echarts, { EChartOption, ECharts } from "echarts";

import { Button } from "antd";
import china from "../assets/map/china.json";

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
  const option: EChartOption = {
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
        map: "china",
        data,
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
        style={{ width: "100%", height: "600px" }}
      ></div>
    </>
  );
};

export default Map;
