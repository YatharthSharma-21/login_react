import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "../components/NavBar";
import SaveFile from "../components/SaveFile";




//Higher Order Components
const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

const isAuth = localStorage.getItem("token");


const Dashboard = ({ routes }) => {
  console.log("isAuth", routes);
  if (!isAuth) {
    return <Redirect to={"/login"} />;
  }
  return (
    <div className="dashboard">
      <NavBar />

      <Switch>
        <Route
          path={"/"}
          // exact={true}
          render={(props) => <SaveFile {...props} />}
        />

      </Switch>
    </div>
  );
};

//Routing Logic



export { RouteWithSubRoutes, Dashboard };

