import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";


import NavBar from '../components/NavBar';
import SaveFile from '../components/SaveFile';
import Login from '../components/Login/Login';
import SignIn from "../components/SignIn/SignIn";

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

const Dashboard = ({ routes }) => {
  
  return (
    <div className="dashboard">
      {
        routes.Nav &&  <NavBar />  
      }
     
          <Switch>
            {routes.map((route, i) => {
              
              return <RouteWithSubRoutes key={i} {...route} />;
              
            })}
            
          </Switch>     
    </div>
  );
};


//Routing Logic

const ROUTES = [
  {
    path: "/",
    key: "welcome",
    component: Dashboard,
    routes: [
      {
        path: "/",
        exact: true,
        Nav: false,
        component: () => <Login />,        
      },   
      {
        path: "/login",
        exact: true,
        Nav: false,
        component: () => <Login />,        
      },
      {
        path: "/signup",
        exact: true,
        Nav: false,
        component: () => <SignIn />,        
      },   
      {
        path: "/dashboard",
        exact: true,
        Nav: true,
        component: () => <SaveFile />,
        icon: "fas fa-home",
        title: "Home",
      },
      // {
      //   path: "/details/:id",
      //   exact: true,
      //   component: () => <Details />,
      // },     
      // {
      //   path: "/upload/movies",
      //   exact: true,
      //   component: () => <UploadMovies />,
      // },   
      ]
     
  }
];

export default ROUTES;
export { RouteWithSubRoutes };
