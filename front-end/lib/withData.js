// to make it a Higher Order Component to expose Apollo via props
import withApollo from "next-with-apollo";
// provides extra functionality, e.g. remote data fetching
import ApolloClient from "apollo-boost";
import { endpoint, prodEndpoint } from "../config";

// need headers for auth
function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    // include credentials (cookies) with every request
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    }
  });
}

// exported as a function to be executed in _app.js
export default withApollo(createClient);
