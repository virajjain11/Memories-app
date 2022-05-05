import * as api from "../api/index";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
    // normal way of writing action
    // const action = {type:"FETCH_ALL", payload: []}
    // return action
  } catch (error) {
    console.error("error in getPosts action", error.message);
  }
};
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "CREATE_NEW", payload: data });
  } catch (error) {
    console.error("error in create post action", error.message);
  }
};
