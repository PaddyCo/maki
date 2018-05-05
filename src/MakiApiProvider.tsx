import * as React from "react";

import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }

      if (networkError) {
        console.error(`[Network error]: ${networkError}`);
      }
    }),
    new HttpLink({
      uri: "http://localhost:8000/graphql", // TODO: Move this to some config
    })
  ]),
  cache: new InMemoryCache(),
});

export interface IProps {
  children: JSX.Element;
}

const MakiApiProvider = ({ children }: IProps) => (
  <ApolloProvider client={ client }>
    {children}
  </ApolloProvider>
);

export default MakiApiProvider;

