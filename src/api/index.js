import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:4000" });
const API = axios.create({
  baseURL: "https://memories-server-1.herokuapp.com",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Autherization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// const url = "http://localhost:4000/posts";
export const fetchPosts = () => API.get("/posts");
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const signIn = (formData) => API.post("/users/sign-in", formData);
export const signUp = (formData) => API.post("/users/sign-up", formData);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search/filter?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
