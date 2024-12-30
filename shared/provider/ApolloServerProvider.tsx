import * as React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ENV } from '@/shared/utils/env-resolver';

const client = new ApolloClient({
  uri: ENV.EXPO_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export default function ApolloServerProvider({
  children,
}: React.PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
