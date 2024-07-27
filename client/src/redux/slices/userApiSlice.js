import { apiSlice } from "./apiSlice";

const USER_URL = '/api/user';

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			query: (token) => ({
				url: `${USER_URL}`,
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
		}),
		register: builder.mutation({
			query: ({ firstName, lastName, email, password, confirmPassword }) => ({
				url: `${USER_URL}/register`,
				method: 'POST',
				body: {
					firstName,
					lastName,
					email,
					password,
					confirmPassword
				}
			})
		})
	})
});

export const { useLazyGetUserQuery, useRegisterMutation } = userApiSlice;