import "./App.less";

import React, { FC } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Form from "./pages/form";
import Home from "./pages/home";
import MenuRouter from "./router";
import Message from "./pages/message";
import NotFound from "./pages/notFound";
import Permission from "./pages/permission";
import Person from "./pages/person";
import { Redirect } from "react-router";
import Role from "./pages/role";
import Table from "./pages/table";
import FlowChart from "./pages/flowChart";

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/person" component={Person} />
        <MenuRouter>
          {/* /根目录 放最下面 */}
          <Route
            path="/"
            render={() => (
              <Switch>
                <Redirect exact={true} from="/" to="/home" />
                <Route path="/home" component={Home} />
                <Route path="/table" component={Table} />
                <Route path="/form" component={Form} />
                <Route path="/role" component={Role} />
                <Route path="/mssage" component={Message} />
                <Route path="/permission" component={Permission} />
                <Route path="/flowChart" component={FlowChart} />
                <Route component={NotFound} />
              </Switch>
            )}
          />
        </MenuRouter>
      </Switch>
    </Router>
  );
};

export default App;
