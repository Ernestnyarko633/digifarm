import React from 'react'
import Router from 'routes/router'
import { BrowserRouter } from 'react-router-dom'

import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'

import { ComponentContextProvider } from 'context/component'
import { ModalContextProvider } from 'context/modal'
import { PaymentContextProvider } from 'context/payment'
import { AuthContextProvider } from 'context/auth'
import { ProductContextProvider } from 'context/product'
import { CategoryContextProvider } from 'context/category'

const queryCache = new QueryCache()

function App() {
  return (
    <BrowserRouter>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <ComponentContextProvider>
          <AuthContextProvider>
            <PaymentContextProvider>
              <ProductContextProvider>
                <CategoryContextProvider>
                  <ModalContextProvider>
                    <Router />
                  </ModalContextProvider>
                </CategoryContextProvider>
              </ProductContextProvider>
            </PaymentContextProvider>
          </AuthContextProvider>
        </ComponentContextProvider>
        <ReactQueryDevtools initialIsOpen />
      </ReactQueryCacheProvider>
    </BrowserRouter>
  )
}

export default App
