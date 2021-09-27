import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { PrivateRoute } from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import ErrorPage from "./components/Error";

export default function App() {
  // const [isErrorPageOpen , setIsErrorPage]
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
}
