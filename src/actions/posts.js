import * as api from "../api/index";
import {
  CREATE_NEW,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "../constants/constantTypes";

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data }); //destructuring
    dispatch({ type: END_LOADING });

    // normal way of writing action
    // const action = {type:"FETCH_ALL", payload: []}
    // return action but instead of returning the action, here we dispatch action
  } catch (error) {
    console.error("error in getPosts action", error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    // console.log("data from action", data);
    dispatch({ type: FETCH_POST, payload: { post: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    // console.log("post", post);
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE_NEW, payload: data });
    dispatch({ type: END_LOADING });
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
    // console.log("insidee delete action", id);
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

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    // console.log(data);
    dispatch({ type: END_LOADING });

    // console.log(data);
  } catch (error) {
    console.error("error in getPostsBySearch action", error);
  }
};
