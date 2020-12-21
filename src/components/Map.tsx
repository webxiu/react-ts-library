import * as echarts from "echarts";

import React, { useEffect, useRef } from "react";

interface Props {}

// type OptionsType = typeof option;
const Map: React.FC<Props> = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const option:any = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    geo: {
      map: 'china',
      // roam: true,
      right: 0,
      left: 100,
      zoom: 1,
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        borderColor: '#000',
        emphasis: {
          areaColor: '#fff464'
        }
      }
    },
    series: [
      {
        type: "map",
        map: 'china',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };

  console.log("mapRef.current", mapRef.current);

  useEffect(() => {
    if (!mapRef) return;
    const myChart = echarts.init(
      document.getElementById("china") as HTMLDivElement
    );
    myChart?.setOption(option as any);
  }, [mapRef]);

  return (
    <>
      <div
        id="china"
        ref={mapRef}
        style={{ width: "100%", height: "600px" }}
      ></div>
    </>
  );
};

export default Map;
