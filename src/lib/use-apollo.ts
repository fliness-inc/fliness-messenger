import { withApollo as useApollo } from 'next-apollo';
import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const wsLink =
  typeof window !== 'undefined'
  	? new WebSocketLink({
  		uri: 'ws://localhost:8080/graphql',
  		options: {
  			reconnect: true,
  		},
  	})
  	: null;

const httplink = new HttpLink({
	uri: 'http://localhost:8080/graphql',
	credentials: 'same-origin',
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
  		httplink,
  	)
  	: httplink;

const apolloClient = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});

export default useApollo(apolloClient);
