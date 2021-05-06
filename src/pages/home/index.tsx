import Map from "../../components/Map";
import MapBar from "../../components/MapBar";
import MapLine from "../../components/MapLine";
import MapPie from "../../components/MapPie";
import PeopleFieldChart from "../../components/PeopleFieldChart";
import PeopleNumberChart from "../../components/PeopleNumberChart";
import React from "react";

const Wrap: React.FC = () => {
  return (
    <div>
      <Map />
      <MapBar />
      <MapPie />
      <MapLine />
      <PeopleFieldChart />
      <PeopleNumberChart />
    </div>
  );
};

export default Wrap;
