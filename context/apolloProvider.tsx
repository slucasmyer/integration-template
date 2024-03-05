"use client"
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/lib/apolloClient";

export default function ApolloClientProvider({ children }:any) {
  const apolloClient = useApollo();
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  )
}