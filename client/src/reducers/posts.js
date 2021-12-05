import {
  FETCHFEED,
  CREATEPOST,
  UPDATEPOST,
  DELETEPOST,
  FETCHSINGLEPOST,
  START_LOADING,
  END_LOADING,
  LIKEPOST,
  DISLIKEPOST,
  FETCHCOMMENTS,
  COMMENTPOST,
  REPLYCOMMENT,
  START_REPLY_LOADING,
  END_REPLY_LOADING,
  START_COMMENT_LOADING,
  END_COMMENT_LOADING,
  START_FETCH_COMMENT_LOAD,
  END_FETCH_COMMENT_LOAD,
  LIKECOMMENT,
  DISLIKECOMMENT,
  SEARCHBYPOSTNAME,
  SEARCHPROFILEBYNAME,
  START_LOAD_SINGLEPOST,
  END_LOAD_SINGLEPOST,
} from "../constants/actionTypes";

const postReducer = (
  state = {
    Loading: true,
    loadSingle: false,
    replyLoading: false,
    commentLoading: false,
    fetchCommentLoading: false,
    blogs: [],
    arts: [],
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, Loading: true };
    case END_LOADING:
      return { ...state, Loading: false };
    case START_LOAD_SINGLEPOST:
      return { ...state, loadSingle: true };
    case END_LOAD_SINGLEPOST:
      return { ...state, loadSingle: false };
    case START_FETCH_COMMENT_LOAD:
      return { ...state, fetchCommentLoading: true };
    case END_FETCH_COMMENT_LOAD:
      return { ...state, fetchCommentLoading: false };
    case START_COMMENT_LOADING:
      return { ...state, commentLoading: true };
    case END_COMMENT_LOADING:
      return { ...state, commentLoading: false };
    case START_REPLY_LOADING:
      return { ...state, replyLoading: true };
    case END_REPLY_LOADING:
      return { ...state, replyLoading: false };

    case FETCHFEED:
      sessionStorage.setItem("fetched?", true);
      return {
        ...state,
        blogs: action.payload.BLogs,
        arts: action.payload.Arts,
      };

    case SEARCHBYPOSTNAME:
      return { ...state, blogs: action.payload };

    case SEARCHPROFILEBYNAME:
      return { ...state, blogs: action.payload };

    case FETCHSINGLEPOST:
      return { ...state, detail: action.payload };

    case CREATEPOST:
      if (action.section === 1) {
        return { ...state, arts: [...state.arts, action.payload] };
      } else {
        return { ...state, blogs: [...state.blogs, action.payload] };
      }

    case UPDATEPOST:
      if (action.section === 1) {
        return {
          ...state,
          arts: state.arts.map((post) =>
            post.post._id === action.payload.post._id ? action.payload : post
          ),
        };
      } else {
        return {
          ...state,
          blogs: state.blogs.map((post) =>
            post.post._id === action.payload.post._id ? action.payload : post
          ),
        };
      }

    case LIKEPOST:
      if (action.section === 1) {
        return {
          ...state,
          arts: state.arts.map((post) =>
            post._id === action.payload._id ? action.payload : state.arts
          ),
        };
      } else {
        return {
          ...state,
          blogs: state.blogs.map((post) =>
            post._id === action.payload._id ? action.payload : state.blogs
          ),
        };
      }

    case DISLIKEPOST:
      if (action.section === 1) {
        return {
          ...state,
          arts: state.arts.map((post) =>
            post._id === action.payload._id ? action.payload : state.arts
          ),
        };
      } else {
        return {
          ...state,
          blogs: state.blogs.map((post) =>
            post._id === action.payload._id ? action.payload : state.blogs
          ),
        };
      }

    case LIKECOMMENT:
      if (action.section === 1) {
        return {
          ...state,
          arts: state.arts.map((post) =>
            post._id === action.payload._id ? action.payload : state.arts
          ),
        };
      } else {
        return {
          ...state,
          blogs: state.blogs.map((post) =>
            post._id === action.payload._id ? action.payload : state.blogs
          ),
        };
      }

    case DISLIKECOMMENT:
      if (action.section === 1) {
        return {
          ...state,
          arts: state.arts.map((post) =>
            post._id === action.payload._id ? action.payload : state.arts
          ),
        };
      } else {
        return {
          ...state,
          blogs: state.blogs.map((post) =>
            post._id === action.payload._id ? action.payload : state.blogs
          ),
        };
      }

    case FETCHCOMMENTS:
      return {
        ...state,
        comments: action?.payload,
      };
    case COMMENTPOST:
      return {
        ...state,
        comments: action?.payload,
      };
    case REPLYCOMMENT:
      return {
        ...state,
        comments: action?.payload,
      };
    case DELETEPOST:
      if (action.section === 1) {
        return {
          ...state,
          arts: state.arts.filter((post) => post._id !== action.payload),
        };
      } else {
        return {
          ...state,
          blogs: state.blogs.filter((post) => post._id !== action.payload),
        };
      }

    default:
      return state;
  }
};

export default postReducer;
