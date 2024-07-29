// This file defines the authentication API slice for handling user login
import { apiSlice } from "./apiSlice";

const AUTH_URL = '/api/user';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: `${AUTH_URL}/login`,
				method: 'POST',
				// Body of the request
				body: {
					email,
					password
				}
			})
		})
	})
});

export const { useLoginMutation } = authApiSlice;