export const errorMiddleware = (storeAPI) => (next) => (action) => {
  let result = next(action);
  const { error } = action.payload;
  if (error) {
    storeAPI.dispatch({
      type: "SET_MODAL",
      payload: {
        key: "error",
        title: error.title,
        content: error.content,
      },
    });
  }
  return result;
};
