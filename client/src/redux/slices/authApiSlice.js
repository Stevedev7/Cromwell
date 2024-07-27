import { apiSlice } from "./apiSlice";


const AUTH_URL = '/api/user';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: `${AUTH_URL}/login`,
				method: 'POST',
				body: {
					email,
					password
				}
			})
		})
	})
});

export const { useLoginMutation } = authApiSlice;