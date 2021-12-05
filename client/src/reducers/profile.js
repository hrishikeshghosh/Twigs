import {
  FETCHPROFILE,
  SETPROFILE,
  UPDATEPASSWORD,
  UPDATEPASSWORDERRS,
  DELETEACCOUNT,
  START_LOADING,
  END_LOADING,
  ADDTOLIBRARY,
  SEARCHLIBRARY,
  START_LIBRARY_LOADING,
  END_LIBRARY_LOADING,
  DELETEALLIBRARY,
  REMOVEDPOSTFROMLIBRARY,
} from "../constants/actionTypes";
import USERDATA from "../Helper/USERDATA";

const profileReducer = (
  state = { Loading: false, blogs: [], arts: [], error: "" },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, Loading: true };
    case END_LOADING:
      return { ...state, Loading: false };
    case START_LIBRARY_LOADING:
      return { ...state, Loading: true };
    case END_LIBRARY_LOADING:
      return { ...state, Loading: false };
    case FETCHPROFILE:
      return {
        ...state,
        profileData: action.payload.profileData,
        blogs: action.payload.Blogs,
        arts: action.payload.Arts,
        library: action.payload.library,
      };
    case SETPROFILE:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, data: action.payload };
    case UPDATEPASSWORD:
      return { ...state, passwordSuccess: action.payload };
    case UPDATEPASSWORDERRS:
      return { ...state, error: action.error };
    case DELETEACCOUNT:
      localStorage.clear();
      return { ...state, AccountdeleteStatus: action?.payload };

    case ADDTOLIBRARY:
      return { ...state, data: action?.payload };
    case SEARCHLIBRARY:
      return { ...state, library: action?.payload };
    case DELETEALLIBRARY:
      return { ...state, library: action?.payload };
    case REMOVEDPOSTFROMLIBRARY:
      return { ...state, library: action?.payload };
    default:
      return state;
  }
};

export default profileReducer;
