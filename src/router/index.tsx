import { Redirect, Route, Switch } from "react-router-dom";

import Form from "../pages/form";
import Home from "../pages/home";
import NotFound from "../pages/notFound";
import React from "react";
import Table from "../pages/table";

const BaseRouter = () => {
  return (
    // <Router>
    <Switch>
      <Route path="/form" component={Form} />
      <Route path="/table" component={Table} />
      {/* <Route path="/login" component={Table} />
      <Route path="/order/detail" component={Table} /> */}
      {/* /根目录 放最下面 */}
      <Route
        path="/"
        render={() => (
          <Home>
            <Switch>
              <Route path="/ui/:id" component={Table} />
              <Redirect exact={true} from="/" to="/home" />
              <Route path="/home" component={Table} />
              <Route path="/ui/button" component={Table} />
              <Route path="/form" component={Form} />
              <Route path="/table" component={Table} />
              <Route component={NotFound} />
            </Switch>
          </Home>
        )}
      />
    </Switch>
    // </Router>
  );
};

export default BaseRouter;
