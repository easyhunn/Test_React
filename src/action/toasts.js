
const addToast = (id, message, kind) => {
  return {
    type: "ADD_TOAST",
    payload: {
      id: id,
      message: message
    }
  }
}
const removeToast = (id, message, kind) => {
  return {
    type: "REMOVE_TOAST",
    id: id,
  }
}

let id = 0;
const timeout = 2000;

export const showToast = (dispatch, message) => {
  id ++;
  dispatch(
    addToast(id, message + id)
  );
  setTimeout(() => {
    dispatch(
      removeToast(id)
    );
  }, timeout)
  
}