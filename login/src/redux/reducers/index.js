import { combineReducers } from "redux";

import docDetailsReducer from "./docDetailsReducer";
import alertReducer from "./alertReducer";
import loadingReducer from './loadingReducer'


export default combineReducers({
  loading: loadingReducer,
  alert: alertReducer,
  docDetails: docDetailsReducer,
});
