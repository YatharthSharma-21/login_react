import { Route, Switch } from "react-router-dom";
import Login from "../../components/Login/Login";
import SignIn from "../../components/SignIn/SignIn";
import { Dashboard } from "../routes";



const RenderRoutes = ({}) => {



  return (
    <Switch>
      <Route
        path={"/login"}
        exact={true}
        render={(props) => <Login {...props} />}
      />
      <Route
        path={"/signup"}
        exact={true}
        render={(props) => <SignIn {...props} />}
      />
      <Route
        path={"/"}        
        render={(props) => <Dashboard {...props} />}
      />
     
    </Switch>
  );
};

export default RenderRoutes;
