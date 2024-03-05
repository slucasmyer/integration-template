"use client"
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
if (process.env.NODE_ENV !== "production") {  // Adds messages only in a dev environment

  loadDevMessages();

  loadErrorMessages();

}

export function useApollo() {
  const httpLink = new HttpLink({
    uri: "/api/graphql",
  });

  const wsLink = new WebSocketLink({
    uri: `ws://localhost:3000/api/graphql`,
    options: {
      reconnect: true,
    },
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
}
