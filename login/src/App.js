import axios from "axios";
import { Loading, Notify } from "notiflix";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router, Redirect, Route, Switch
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import SignIn from "./components/SignIn/SignIn";
import { verify_user } from "./redux/actions/userAction";
import { SET_APP_LOADED } from "./redux/constants/userCons";
import { Dashboard } from "./Routes/routes";


axios.defaults.baseURL = "http://localhost:5000/";

function App() {
  const dispatch = useDispatch();

  const alerts = useSelector((state) => state.alert);
  const loading = useSelector((state) => state.loading.isLoading);
  const { userData, loaded } = useSelector((state) => state.user);

  const [doneAlerts, setDoneAlerts] = useState([]);

  useEffect(() => {
    const isAuth = localStorage.getItem("token");

    if (isAuth) {
      dispatch(verify_user(isAuth));
    }else{
      dispatch({ type: SET_APP_LOADED, payload: true });
    }
  }, []);

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

    
  }, [alerts]);
  if (!loaded) {
    return null;
  }
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route
            path={"/login"}
            exact={true}
            render={(props) =>
              userData ? <Redirect to="/" /> : <Login {...props} />
            }
          />
          <Route
            path={"/signup"}
            exact={true}
            render={(props) =>
              userData ? <Redirect to="/" /> : <SignIn {...props} />
            }
          />
          <Route
            path={"/"}
            // exact={true}
            render={(props) =>
              userData ? <Dashboard {...props} /> : <Redirect to="/login" />
            }
          />

          {/* <Route path={"/"} render={(props) => <HomeRoute {...props} />} /> */}
        </Switch>
      </Router>
      {/* <AppRouter /> */}
    </div>
  );
}

export default App;
