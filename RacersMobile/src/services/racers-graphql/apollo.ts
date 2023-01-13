import {
  ApolloClient,
  createHttpLink,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {RetryLink} from '@apollo/client/link/retry';
import DebounceLink from 'apollo-link-debounce';
import {GRAPHQL_BFF_URL} from '@env';

const DEFAULT_DEBOUNCE_TIMEOUT = 2000;

const httpLinkUri = createHttpLink({uri: GRAPHQL_BFF_URL});

const authLink = setContext(async (_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization: '',
    },
  };
});

const errorLink = onError(
  ({graphQLErrors, networkError, operation, forward}) => {
    console.log('Some apollo client error was caught.');
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.log('[🛑 GraphQL Error]:', JSON.stringify(err, null, 2));
      }
    }
    if (networkError) {
      if (networkError.message.includes('Network request failed')) {
      }
      console.log('[Network error]:', networkError.message);
    }
    return forward(operation);
  },
);

const retryLink = new RetryLink({
  delay: {
    initial: 600,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => {
      if (JSON.stringify(error).includes('400')) {
        return false;
      }
      return true;
    },
  },
});

const debounceLink = new DebounceLink(DEFAULT_DEBOUNCE_TIMEOUT);

const httpLinkTreated = ApolloLink.from([
  debounceLink,
  errorLink,
  retryLink,
  httpLinkUri,
]);

export const link = authLink.concat(httpLinkTreated);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  queryDeduplication: true,
  connectToDevTools: __DEV__,
});

export default client;
