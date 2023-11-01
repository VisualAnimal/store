import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Attribute from './routes/attribute';
import List from './routes/list';
import Product from './routes/product';
import './index.css'

const client = new ApolloClient({
  uri: 'http://45.207.38.55:3000/api/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>hello world</div>
  },
  {
    path: '/attribute',
    element: <Attribute/>
  },
  {
    path: '/list',
    element: <List/>
  },
  {
    path: '/product',
    element: <Product/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
)
