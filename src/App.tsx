import "./App.less";

import React, { FC } from "react";

import { Button } from "antd";
import Map from "./components/Map";
import MyTable from "./components/MyTable";

const App: FC = () => (
  <div className="App">
    <MyTable />
    <hr />
    <Map />
    <Button type="primary">Button</Button>
  </div>
);

export default App;
