import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loginForm: {
		email: "",
		password: ""
	},
	registerForm: {
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	}
}

const formSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setloginEmail: (state, action) => {
			state.loginForm.email = action.payload;
		},
		setloginPassword: (state, action) => {
			state.loginForm.password = action.payload;
		}
	}
});

export const { setToken, removeToken, setAuthenticated } = formSlice.actions

export default formSlice.reducer;