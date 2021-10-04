import { setAlert } from "./alertAction";
import { startLoading, stopLoading } from "./loadingAction";
import { SET_DETAILS, UPDATE_DETAILS, REMOVE_DETAILS } from '../constants/docDetailsCons';
import { signUp, login, verifyOtp } from "../../api";

//@desc Create Partner
const sign_up = (formData, history) => async (dispatch, getState) => {
  dispatch(startLoading(getState().loading.count));
  if (formData.password !== formData.cpassword) {
    dispatch(stopLoading(getState().loading.count));
    dispatch(setAlert("Password mismatch", "danger"));
  }
  try {

    const data = await signUp(formData);

    dispatch({ type: SET_DETAILS, payload: data });
    dispatch(stopLoading(getState().loading.count));
    dispatch(setAlert("User Successfully Register", "success"));
    //   const partner = getState().BP.partner;
    history.push(`/signup`);


  } catch (err) {
   const errors = err.response.data.errors;

    console.log(err);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    //   dispatch({ type: CREATE_PARTNER_ERROR });
    dispatch(stopLoading(getState().loading.count));
  }
};

//@desc Create Partner
const loginUser = (formData, history) => async (dispatch, getState) => {
  dispatch(startLoading(getState().loading.count));


  try {

    const data = await login(formData);
    localStorage.setItem('token', data);

    dispatch(stopLoading(getState().loading.count));
    dispatch(setAlert("Files Successfully uploaded", "success"));
    //   const partner = getState().BP.partner;
    history.push(`/dashboard`);
  } catch (err) {
    const errors = err.response.data.errors;

    console.log(err.response.data);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    //   dispatch({ type: CREATE_PARTNER_ERROR });
    dispatch(stopLoading(getState().loading.count));
  }
};

//@desc Verify Otp
const verify_otp = (formData, history) => async (dispatch, getState) => {
  dispatch(startLoading(getState().loading.count));


  try {

    const data = await verifyOtp(formData);
    dispatch(stopLoading(getState().loading.count));
    dispatch(setAlert("Account successfully verified", "success"));
    //   const partner = getState().BP.partner;
    history.push(`/login`);
  } catch (err) {
    const errors = err.response.data.errors;

    console.log(err.response.data);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    //   dispatch({ type: CREATE_PARTNER_ERROR });
    dispatch(stopLoading(getState().loading.count));
  }
};

export { sign_up, loginUser, verify_otp }