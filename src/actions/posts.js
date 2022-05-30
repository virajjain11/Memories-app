import * as api from "../api/index";
import {
  CREATE_NEW,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_ALL,
} from "../constants/constantTypes";
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data }); //destructuring
    // normal way of writing action
    // const action = {type:"FETCH_ALL", payload: []}
    // return action
  } catch (error) {
    console.error("error in getPosts action", error);
  }
};
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE_NEW, payload: data });
  } catch (error) {
    console.error("error in create post action", error);
  }
};
export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, updatedPost);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.error("error in update Post", error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    console.log("insidee delete action", id);
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.error("error in deleting the post", error);
  }
};
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.error("error in likePost", error);
  }
};
