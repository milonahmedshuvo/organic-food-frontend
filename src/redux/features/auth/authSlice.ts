import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    loding : false
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
          loginStart(state) {
            state.loding = true
          },
          loginSuccess(state, action) {
            state.loding = false
            state.user = action.payload;
          },
          logout(state) {
            state.user = null;
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
          },
    }
})



export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer;


