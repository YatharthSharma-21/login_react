import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sign_up, verify_otp } from "../../redux/actions/docDetailAction";
// import { signInUser } from "../../redux/actions/authAction";

import "../Login/Login.css";

import InputGroup from "../Common/InputGroup/InputGroup";
import RoundBtn from "../Common/RoundBtn/RoundBtn";
import { useHistory } from "react-router-dom";

const SignIn = ({ text }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [otp, setOtp] = useState("");

  // const { isAuthenticated, user } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.docDetails);
  let currentUser = user && user.length > 0 ? user[(user.length - 1)] : '';
  console.log('user',currentUser)
  // const role = user?.role;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp && otp != '') {
      dispatch(verify_otp({ otp }, history));
    } else {
      dispatch(sign_up({ name: username, email, password, cpassword }, history));
    }
  };

  // if (isAuthenticated && !loading) {
  //   history.push("/admin");
  // }
  return (
    <div className="login">
      <div className="login__card">
        <img src="../../oval.svg" className="grad-sphere" alt="sphere" />
        <img src="../../oval.svg" className="grad-sphere" alt="sphere" />
        <div className="login__card__left"></div>
        <div className="login__card__right">
          <form className="box" onSubmit={handleSubmit}>
            <h2>{text} Sign Up</h2>
            {currentUser == '' ?
              <>
                <InputGroup
                  label="Username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  theme="dark"
                />

                <InputGroup
                  label="Email"
                  type="email"
                  placeholder="Eail"
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

                <InputGroup
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  theme="dark"
                />

              </>
              :
              <>
                <InputGroup
                  label="OTP"
                  type="text"
                  placeholder="Verify Account"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  theme="dark"
                />

              </>
            }
            <RoundBtn text="Sign Up" />
            <a className="text-center col-sm-12 d-block" href={`/login`}>Log In</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
