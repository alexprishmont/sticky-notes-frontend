import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import config from '@/config';

const httpLink = new HttpLink({
  uri: config.GRAPHQL_URI,
  withCredentials: true,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = JSON.parse(localStorage.getItem(config.AUTH_HEADER));

  operation.setContext({
    headers: {
      [config.AUTH_HEADER]: token || '',
    },
  });

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  fetchOptions: {
    mode: 'no-cors',
  },
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

Vue.use(VueApollo);

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading',
  },
});
