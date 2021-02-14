import { ApolloClient, QueryOptions } from '@apollo/client';

export interface RequestResponse<D = any, E = Error> {
  error?: E;
  statusCode?: number;
  data?: D;
}

export class Request {
  public static make(apolloClient: ApolloClient<any>, option: QueryOptions) {
    return apolloClient
      .query(option)
      .then(({ data }) => ({
        data,
        statusCode: null,
        error: null,
      }))
      .catch(e => ({
        data: null,
        statusCode:
          e.graphQLErrors && e.graphQLErrors.length
            ? e.graphQLErrors[0].extensions.statusCode
            : 500,
        error: e,
      }));
  }
}

export default Request;
