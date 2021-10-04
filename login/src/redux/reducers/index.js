import { combineReducers } from "redux";

import docDetailsReducer from "./docDetailsReducer";
import alertReducer from "./alertReducer";
import loadingReducer from './loadingReducer'
import userReducer from './userReducer'


export default combineReducers({
  loading: loadingReducer,
  alert: alertReducer,
  docDetails: docDetailsReducer,
  user:userReducer
});
