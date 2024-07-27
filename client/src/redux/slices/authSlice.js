import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: localStorage.getItem("token") || null,
	isAuthenticated: false,
	userDetails: {}
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload
			localStorage.setItem("token", action.payload)
		},
		removeToken: (state) => {
			state.token = null;
			localStorage.removeItem("token")
		},
		setAuthenticated: (state, action) => {
			state.isAuthenticated = action.payload
		},
		setUserdetails: (state, action) => {
			state.userDetails = action.payload;
		}
	}
});

export const { setToken, removeToken, setAuthenticated, setUserdetails } = authSlice.actions

export default authSlice.reducer;