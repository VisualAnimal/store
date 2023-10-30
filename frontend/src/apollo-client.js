import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = () => {
  return new ApolloClient({
    uri: "http://45.207.38.55:3000/api/graphql",
    cache: new InMemoryCache(),
  });
};

export default client;
