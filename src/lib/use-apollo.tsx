import { 
	ApolloClient, 
	InMemoryCache, 
	HttpLink, 
	split, 
	ApolloProvider,
	gql, 
	ApolloQueryResult, 
	ApolloLink 
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { tokenVar } from '@store/auth';
import { menuStateVar } from '@store/menu';
import { currentPageVar } from '@store/pages';
import withApollo from 'next-with-apollo';
import React from 'react';
import Cookie from '@lib/cookie';
import { NextPageContext } from 'next';
import JWTLink from './apollo-link-jwt';

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

const getUserAgent = (ctx: NextPageContext) => {
	return ctx ? ctx?.req?.headers['user-agent'] : window.navigator.userAgent;
}

export const createApolloClient = (initialState, ctx: NextPageContext) => {

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

	const contextLink = setContext(async () => ({
			headers: {
				Authorization: tokenVar() ? `Bearer ${tokenVar()}` : '',
			}
		})
	);

	const authLink = new JWTLink({
		fetchRequest: () => ({
			url: process.env.NEXT_PUBLIC_API_HTTP_URL,
			params: {
				body: JSON.stringify({
					query: `
						mutation {
							auth {
								refresh {
									accessToken,
									refreshToken
								}
							}
						}`
				}),
				headers: {
					'cookie': Cookie.getString(ctx),
					'content-type': 'application/json',
					'user-agent':  getUserAgent(ctx),
				},
				method: 'POST',
				credentials: 'include',
				mode: 'cors',
			}
		}),
		fetchResponse: ({ data, errors }: ApolloQueryResult<any>) => {
			if (errors) {
				console.error(errors);
				return;
			}

			tokenVar(data.auth.refresh.accessToken);
			Cookie.set(ctx, 'jwt-token', data.auth.refresh.refreshToken);
		},
		fetchError: (e: Error) => console.error(e)
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
		  		ApolloLink.from([authLink, contextLink, httpLink]),
		  )
		  : ApolloLink.from([authLink, contextLink, httpLink]);

	return new ApolloClient({
		link,
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						me: {
							merge(existing = [], incoming: any) {
								return { ...existing, ...incoming };
							}
						},
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
