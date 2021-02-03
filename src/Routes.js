import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import Admin from "./components/Admin";
export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </div>
  );
}
