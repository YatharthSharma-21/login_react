import { setAlert } from "./alertAction";
import { startLoading, stopLoading } from "./loadingAction";
import { SET_USER_DETAILS, SET_APP_LOADED } from "../constants/userCons";
import { verifyUSer } from "../../api";

const verify_user = (formData, history) => async (dispatch, getState) => {
  dispatch(startLoading(getState().loading.count));
  try {
    dispatch({ type: SET_APP_LOADED, payload: false });
    const { data } = await verifyUSer(formData);
    dispatch({ type: SET_USER_DETAILS, payload: data });
    dispatch(stopLoading(getState().loading.count));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err.response.data);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch(stopLoading(getState().loading.count));
  }
  dispatch({ type: SET_APP_LOADED, payload: true });
};

export { verify_user };
