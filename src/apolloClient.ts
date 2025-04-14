import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.HASURA_GRAPHQL_URL, // use the env variable
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET || "", // use the env variable
  },
});

export default client;
