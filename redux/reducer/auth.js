import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postData, getData } from "../../utils/petchData";

export const notify = createAsyncThunk("notity", async (notity) => {
  const notifyMsg = notity;

  return notifyMsg;
});

export const createUser = createAsyncThunk(
  "createUser",
  async (user, { dispatch }) => {
    dispatch(notify({ loading: true }));

    const res = await postData("/register", user);

    if (res.err) {
      dispatch(notify({ error: [res.err] }));
      return;
    } else {
      dispatch(notify({ success: [res.success] }));
      return res.user;
    }
  }
);

export const login = createAsyncThunk("login", async (user, { dispatch }) => {
  dispatch(notify({ loading: true }));

  const res = await postData("/login", user);

  if (res.err) {
    dispatch(notify({ error: [res.err] }));
    return;
  } else {
    dispatch(notify({ success: [res.success] }));
    return res;
  }
});

export const getUser = createAsyncThunk("getUser", async (dispatch) => {
  const res = getData("accessToken");

  if (res.err) {
    dispatch(notify({ error: [res.err] }));
    return;
  } else {
    return res;
  }
});

const todosSlice = createSlice({
  // name action
  name: "todos",
  initialState: {
    user: {},
    notify: {},
    token: "",
  },
  reducers: {
    // chua cac action'

    deleteUser(state, action) {
      state.token = "";
      state.user = {};
      return state;
    },
  },
  extraReducers: {
    [createUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    // [notify.pending]: (state) => {
    //   state.notify = { loading: true };
    // },
    [notify.fulfilled]: (state, action) => {
      state.notify = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.access_token;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.access_token;
    },
  },
});

// Action export
export const { deleteUser } = todosSlice.actions;

// Export reducer
const auth = todosSlice.reducer;

export default auth;
