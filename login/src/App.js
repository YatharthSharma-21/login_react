import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Notify, Loading } from "notiflix";
import RenderRoutes from "./Routes/Helpers/RenderRoutes";
import ROUTES from "./Routes/routes";
import { BrowserRouter as Router } from "react-router-dom";

import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5000/';

function App() {
  const dispatch = useDispatch();

  const alerts = useSelector((state) => state.alert);
  const loading = useSelector((state) => state.loading.isLoading);

  const [doneAlerts, setDoneAlerts] = useState([]);

  // useEffect(() => {
  //   dispatch(loadUser());
  //   dispatch(getReportTypes());
  //   getLocationAccessToken();
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("storage", () => {
  //     if (!localStorage.token) dispatch(logout());
  //   });
  // }, []);

  useEffect(() => {
    loading
      ? Loading.Hourglass("Loading...", { svgColor: "#3271c6" })
      : Loading.Remove();
  }, [loading]);

  useEffect(() => {
    alerts.forEach((alert) => {
      if (!doneAlerts.includes(alert.id)) {
        switch (alert.alertType) {
          case "success":
            Notify.Success(alert.msg, {
              fontFamily: "Poppins",
              useGoogleFont: true,
            });
            break;
          case "danger":
            Notify.Failure(alert.msg, {
              fontFamily: "Poppins",
              useGoogleFont: true,
            });
            break;
          case "warning":
            Notify.Warning(alert.msg, {
              fontFamily: "Poppins",
              useGoogleFont: true,
            });
            break;
          default:
            console.log(alert.type);
        }

        setDoneAlerts([...doneAlerts, alert.id]);
      }
    });

    // return () => {
    //   setDoneAlerts([]);
    // };
  }, [alerts]);

  return (
    <div className="app">
      <Router>
        <RenderRoutes routes={ROUTES} />
      </Router>
      {/* <AppRouter /> */}
    </div>
  );
}

export default App;
