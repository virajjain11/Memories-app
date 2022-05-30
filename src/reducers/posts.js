import {
  CREATE_NEW,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_ALL,
} from "../constants/constantTypes";
const reducers = (
  posts = [
    {
      creator: "Virajjj",
      title: "js is funn",
      message: "nothing msg",
      tags: ["php", "js", "css"],
      id: 1,
    },
  ],
  action
) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case CREATE_NEW:
      return [...posts, action.payload]; //posts
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case UPDATE:
    case LIKE:
      return [
        posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      ];

    default:
      return posts;
  }
};
export default reducers;
