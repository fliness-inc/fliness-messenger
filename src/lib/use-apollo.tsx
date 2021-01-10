import { ApolloClient, InMemoryCache, HttpLink, split, ApolloProvider, gql } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { tokenVar } from '@store/auth';
import { menuStateVar } from '@store/menu';
import { currentPageVar } from '@store/pages';
import withApollo from 'next-with-apollo';
import React from 'react';
import Cookie from 'js-cookie';

const typeDefs = gql`
	extend type Query {
		localState: LocalState!
	}

	type LocalState {
		menuState: String!
		currentPage: String!
		token: String!
	}
`;

export const createApolloClient = (initialState, ctx) => {

	const wsLink = typeof window !== 'undefined'
		? new WebSocketLink({
			uri: process.env.NEXT_PUBLIC_API_WS_URL,
			options: {
			  reconnect: true,
			  connectionParams: {
				  authToken: tokenVar()
			  },
			},
		})
		: null;

	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_API_HTTP_URL,
		credentials: 'include',
	});

	const authLink = setContext(async () => {
		if (!tokenVar()) {
			if (ctx) {
				const cookies = ctx.req.headers['cookie']?.split(';');
				const jwtToken = cookies?.some(cookie => cookie?.split('=')[0] === 'jwt-token');

				if (jwtToken) {
					const res = await fetch(process.env.NEXT_PUBLIC_API_HTTP_URL, {
						body: JSON.stringify({
							operationName: 'RefreshTokens',
							query: `
								mutation RefreshTokens {
									auth {
										refresh {
											accessToken,
											refreshToken
										}
									}
								}`
						}),
						headers: {
							'cookie': ctx.req.headers['cookie'],
							'content-type': 'application/json',
							'user-agent':  ctx.req.headers['user-agent']
						},
						method: 'POST',
						credentials: 'include',
						mode: 'cors'
					});

					const tokens = await res.json();

					if (tokens.errors) return;

					ctx.res.setHeader('set-cookie', `jwt-token=${tokens.data.auth.refresh.refreshToken}`);
					tokenVar(tokens.data.auth.refresh.accessToken);
				}
			}
			else {
				if (Cookie.get('jwt-token')) {
					const res = await fetch(process.env.NEXT_PUBLIC_API_HTTP_URL, {
						body: JSON.stringify({
							operationName: 'RefreshTokens',
							query: `
								mutation RefreshTokens {
									auth {
										refresh {
											accessToken,
											refreshToken
										}
									}
								}`
						}),
						headers: {
							'cookie': `jwt-token=${Cookie.get('jwt-token')}`,
							'content-Type': 'application/json',
							'user-agent': window.navigator.userAgent
						},
						method: 'POST',
						credentials: 'include',
						mode: 'cors'
					});
		
					const tokens = await res.json();
		
					if (tokens.errors) return;

					Cookie.set('jwt-token', tokens.data.auth.refresh.refreshToken);
					tokenVar(tokens.data.auth.refresh.accessToken);
				}
			}
		}

		return {
			headers: {
				authorization: tokenVar() ? `Bearer ${tokenVar()}` : '',
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
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						localState: {
							read() {
								return { 
									menuState: menuStateVar(),
									token: tokenVar(),
									currentPage: currentPageVar(),
								};
							}
						}
					}
				}
			}
		}).restore(initialState || {}),
		typeDefs,
	});
}

export default withApollo(
	({ initialState, ctx }) => {
		return createApolloClient(initialState, ctx);
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
