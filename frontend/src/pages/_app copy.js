// _app.js

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <div></div>
    // <ApolloProvider client={createApolloClient}>
    //   {/* 这里可以添加全局布局、样式、导航栏等 */}
    //   <Component {...pageProps} />
    //   ddddddddddddddddd
    // </ApolloProvider>
  );
}

export default MyApp;
