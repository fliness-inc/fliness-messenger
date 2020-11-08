import { ApolloClient, InMemoryCache, HttpLink, split, ApolloProvider } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { token } from '@store/auth';
import withApollo from 'next-with-apollo';
import React from 'react';

export const createApolloClient = (initialState, headers) => {

	const wsLink = typeof window !== 'undefined'
		? new WebSocketLink({
			uri: process.env.NEXT_PUBLIC_API_WS_URL,
			options: {
			  reconnect: true,
			  connectionParams: {
				  authToken: token()
			  },
			},
		})
		: null;

	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_API_HTTP_URL,
		credentials: 'include',
	});

	const authLink = setContext(async () => {
		if (!token()) {
			const res = await fetch(process.env.NEXT_PUBLIC_API_HTTP_URL, {
				body: JSON.stringify({
					operationName: 'RefreshTokens',
					query: `
						mutation RefreshTokens {
							auth {
								refresh {
									accessToken
								}
							}
						}`
				}),
				headers: {
					...headers,
					'Content-Type': 'application/json',
				},
				method: 'POST',
				credentials: 'include',
				mode: 'cors'
			});

			const tokens = await res.json();

			if (tokens.data) token(tokens.data.auth.refresh.accessToken);
		}

		return {
			headers: {
				...headers,
				authorization: token() ? `Bearer ${token()}` : '',
			}
		}
	});

	const link =
	  typeof window !== 'undefined'
		  ? split(
			  	({ query }) => {
				  	const definition = getMainDefinition(query);
				  	return (
					  	definition.kind === 'OperationDefinition' &&
						definition.operation === 'subscription'
				  	);
			  	},
			  	wsLink,
		  		authLink.concat(httpLink),
		  )
		  : authLink.concat(httpLink);

	return new ApolloClient({
		link,
		cache: new InMemoryCache().restore(initialState || {}),
		headers
	});
}

export default withApollo(
	({ initialState, headers }) => {
		return createApolloClient(initialState, headers);
	},
	{
		render: ({ Page, props }) => {
			return (
				<ApolloProvider client={props.apollo}>
					<Page {...props} />
				</ApolloProvider>
			);
		}
	}
);
