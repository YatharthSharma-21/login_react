import {SET_DETAILS,UPDATE_DETAILS,REMOVE_DETAILS} from '../constants/docDetailsCons';

const initialState = [];
const docDetailsReducer = (state=initialState,action) => {
    const {type, payload} = action;
    switch(type){
        case SET_DETAILS :
            return [...state, payload];
            
        case UPDATE_DETAILS:
            break;
        case REMOVE_DETAILS:
            break;
        default:
            return state;

    }
}

export default docDetailsReducer