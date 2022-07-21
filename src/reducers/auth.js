import { AUTH, LOGOUT } from "../constants/constantTypes";

const reducers = (state = { AuthData: null }, action) => {
  switch (action.type) {
    case AUTH:
      console.log("reducerssss", action.data, action);
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));

      return { ...state, AuthData: action?.payload };

    case LOGOUT:
      localStorage.clear();
      return { ...state, AuthData: null };

    default:
      return state;
  }
};

export default reducers;
