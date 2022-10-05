import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  user: {}
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    updateLoginUser(state) {
      const userInStorage = localStorage.getItem('user');
      if (userInStorage) state.user = JSON.parse(userInStorage);
    },
    loginUser(state, action) {
      console.log(action.payload);
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutUser(state) {
      state.user = {};
      localStorage.removeItem('user');
    }
  }
});

const { actions, reducer } = userSlice;
export const { loginUser, updateLoginUser, logoutUser } = actions;
export default reducer;
