import {
    SET_APP_LOADED, SET_USER_DETAILS
} from "../constants/userCons";

const initial = { userData: null, loaded: false };
const docDetailsReducer = (state = initial, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_DETAILS:
      return { ...state, userData: payload };
    case SET_APP_LOADED:
      return { ...state, loaded: payload };

    default:
      return state;
  }
};

export default docDetailsReducer;
