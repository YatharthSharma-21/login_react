import { setAlert } from "./alertAction";
import { startLoading, stopLoading } from "./loadingAction";
import {SET_DETAILS,UPDATE_DETAILS,REMOVE_DETAILS} from '../constants/docDetailsCons';
import { saveDocDetails } from "../../api";

//@desc Create Partner
const uploadFiles = (formData, history) => async (dispatch, getState) => {
    dispatch(startLoading(getState().loading.count));
  
    try {
      const  {data}  = await saveDocDetails(formData);
  console.log('data',data)
      dispatch({ type: SET_DETAILS, payload: data });
      dispatch(stopLoading(getState().loading.count));
      dispatch(setAlert("Files Successfully uploaded", "success"));
    //   const partner = getState().BP.partner;
    //   history.push(`/admin/partner/${partner._id}`);
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

  export{uploadFiles}