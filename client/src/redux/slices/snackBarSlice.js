import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	open: false,
	message: "",
	severity: "success"
}

const snackBarSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		showSnackBar: (state, action) => {
			state.open = true;
			state.message = action.payload.message;
			state.severity = action.payload.severity;
		},
		hideSnackBar: (state) => {
			state.open = false;
			state.message = "";
			state.severity = "";
		}
	}
});

export const { hideSnackBar, showSnackBar } = snackBarSlice.actions

export default snackBarSlice.reducer;