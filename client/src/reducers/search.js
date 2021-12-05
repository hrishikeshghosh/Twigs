import {
  END_LOADING,
  SEARCH_POST,
  START_LOADING,
} from "../constants/actionTypes";

const searchReducer = (state = { data: [], loading: false }, action) => {
  switch (action.type) {
    // case START_LOADING:
    //   return { ...state, loading: true };
    // case END_LOADING:
    //   return { ...state, loading: false };
    case SEARCH_POST:
      return { ...state, data: action?.payload };
    default:
      return state;
  }
};

export default searchReducer;
