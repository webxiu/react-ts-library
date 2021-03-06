import "echarts/map/js/china.js";
import "../assets/map/china.json";

import React, { useEffect, useRef, useState } from "react";
import echarts, { EChartOption, ECharts } from "echarts";

import { Button } from "antd";

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
  const [selectArea, setSelectArea] = useState<any>();
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
      setSelectArea(params);
    });
    echartsInstance?.setOption(option as any);
  }, [mapRef, option]);

  //渲染城市地图
  useEffect(() => {
    console.log("selectArea", selectArea);
    const address: any = {
      北京: "BeiJing",
      上海: "ShangHai",
      天津: "TianJin",
      重庆: "ChongQing",
      香港: "XiangGang",
      澳门: "Aomen",
      安徽: "AnHui",
      福建: "FuJian",
      广东: "GuangDong",
      广西: "GuangXi",
      贵州: "GuiZhou",
      甘肃: "GanSu",
      海南: "HaiNan",
      河北: "HeBei",
      河南: "HeNan",
      黑龙江: "HeiLongJiang",
      湖北: "HuBei",
      湖南: "HuNan",
      吉林: "JiLin",
      江苏: "JiangSu",
      江西: "JiangXi",
      辽宁: "LiaoNing",
      内蒙古: "NeiMengGu",
      宁夏: "NingXia",
      青海: "QingHai",
      陕西: "ShanXi",
      山西: "ShanXi",
      山东: "ShanDong",
      四川: "SiChuan",
      台湾: "TaiWan",
      西藏: "XiZang",
      新疆: "XinJiang",
      云南: "YunNan",
      浙江: "ZheJiang",
    };
    import(
      `echarts/map/js/province/${
        address[selectArea?.name]?.toLowerCase() || "beijing"
      }.js` as any
    ).then((res) => {
      console.log("res", res);
      // echartsInstance?.hideLoading();
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
            map: selectArea?.name,
            data,
          },
        ],
      };
      echartsInstance?.setOption(option1);
    });
  }, [selectArea]);

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
