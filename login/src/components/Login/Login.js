import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../redux/actions/docDetailAction";

import "./Login.css";

import InputGroup from "../Common/InputGroup/InputGroup";
import RoundBtn from "../Common/RoundBtn/RoundBtn";
import { useHistory } from "react-router-dom";

const Login = ({ text }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  // const { isAuthenticated, user } = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading.isLoading);

  // const role = user?.role;

  const handleSubmit = (e) => {
    e.preventDefault();    
    dispatch(loginUser({email, password},history));
   
  };

  // if (isAuthenticated && !loading) {
  //   history.push("/admin");
  // }
  return (
    <div className="login">
      <div className="login__card">
        <img
          src="../../oval.svg"
          className="grad-sphere"
          alt="sphere"
        />
        <img
          src="../../oval.svg"
          className="grad-sphere"
          alt="sphere"
        />
        <div className="login__card__left"></div>
        <div className="login__card__right">
          <form className="box" onSubmit={handleSubmit}>
            <h2>{text} Login</h2>
          
              <InputGroup
                label="Email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                theme="dark"
              />          
            
            <InputGroup
              label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              theme="dark"
            />
            <RoundBtn text="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
