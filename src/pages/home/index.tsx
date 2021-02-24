import Map from "../../components/Map";
import MapBar from "../../components/MapBar";
import MapLine from "../../components/MapLine";
import MapPie from "../../components/MapPie";
import React from "react";

const Wrap = () => {
  return (
    <div>
      <Map />
      <MapBar />
      <MapPie />
      <MapLine />
    </div>
  );
};

export default Wrap;
