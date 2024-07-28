import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import snackBarReducer from './slices/snackBarSlice'
import { apiSlice } from './slices/apiSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		snackBar: snackBarReducer,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true
})

export default store