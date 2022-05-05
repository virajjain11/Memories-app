const reducers = (posts = ["aaaa"], action) => {
  switch (action.type) {
    case "FETCH ALL":
      return action.payload;

    case "CREATE_NEW":
      return [...posts, action.payload]; //posts

    default:
      return posts;
  }
};
export default reducers;
