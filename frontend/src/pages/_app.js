// _app.js

import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component, pageProps }) {
    return(
        <Component {...pageProps} />
    )
    //   return (
    //     // <ApolloProvider client={client}>
    //       {/* 这里可以添加全局布局、样式、导航栏等 */}
    //     //   <Component>4999</Component>
    //       <Component {...pageProps} />
    //     //   ddddddddddddddddd
    //     // </ApolloProvider>
    //   );
}

export default MyApp;
