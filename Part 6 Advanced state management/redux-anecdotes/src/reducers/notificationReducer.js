import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    notify(state, action) {
      return state + action.payload;
    },
    removeNotification() {
      return "";
    }
  }
});

export const { notify, removeNotification } = notificationSlice.actions;

export const setNotification = (content, second) => {
  return async (dispatch) => {
    dispatch(notify(content));
    setTimeout(() => {
      dispatch(removeNotification());
    }, second * 1000);
  };
};

export default notificationSlice.reducer;
