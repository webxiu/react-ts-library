import "./App.less";

import React, { FC } from "react";

import { Button } from "antd";
import Home from "./pages/home";
import Map from "./components/Map";
import MapBar from "./components/MapBar";
import MapPie from "./components/MapPie";

// import BaseRouter from "./router";

// import Map from "./components/Map";
// import MyTable from "./components/MyTable";

const App: FC = () => (
  <div className="App">
    <Home>
      <Map />
      <MapBar />
      <MapPie />
    </Home>
    {/* <Router history={history}>
      <Switch>
        <Route path="/form" component={Form} />
      </Switch>
    </Router> */}
  </div>
);

export default App;
