import { AUTH } from "../constants/constantTypes";
import * as api from "../api/index";

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    // sign in user
    const { data } = await api.signUp(formData);
    console.log("dataaa!!!!!!", data);
    dispatch({ type: AUTH, payload: data });
    navigate("/", { replace: true });

    // navigate(-1);
  } catch (error) {
    console.log("error in signUp action", error);
  }
};
export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    // login the user here
    const { data } = await api.signIn(formData);
    console.log("sign-in data", data);
    dispatch({ type: AUTH, payload: data });
    // navigate.push("/");
    // navigate(-1);
    navigate("/", { replace: true });
  } catch (error) {
    console.log("error in signIn action", error);
  }
};
