import {
  CREATE_NEW,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_ALL,
  FETCH_POST,
  START_LOADING,
  END_LOADING,
  FETCH_BY_SEARCH,
} from "../constants/constantTypes";
// posts=[]
const reducers = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL:
      // return {action.payload}
      return {
        ...state,
        posts: action.payload,
      };
    case FETCH_POST:
      return { ...state, post: action.payload };

    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };

    case CREATE_NEW:
      // return [...posts, action.payload]; //posts
      // console.log("payload", action.payload._id);
      return { ...state, posts: [...state.posts, action.payload] };

    case DELETE:
      // return posts.filter((post) => post._id !== action.payload);
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case UPDATE:
    case LIKE:
      // return [
      //   posts.map((post) =>
      //     post._id === action.payload._id ? action.payload : post
      //   ),
      // ];
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    default:
      return state;
  }
};
export default reducers;
