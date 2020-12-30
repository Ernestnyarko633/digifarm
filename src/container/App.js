import { APIProvider } from 'context/apiContext'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import Router from 'routes/router'
import React from 'react'
import { ComponentProvider } from 'context/ComponentContext'
import { ModalsProvider } from 'context/ModalsContext'
import PaymentContextProvider from 'context/paymentContext'
import { AuthProvider } from 'context/authContext'

const queryCache = new QueryCache()

function App() {
  return (
    <BrowserRouter>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <AuthProvider>
          <APIProvider>
            <PaymentContextProvider>
              <ComponentProvider>
                <ModalsProvider>
                  <Router />
                </ModalsProvider>
              </ComponentProvider>
            </PaymentContextProvider>
          </APIProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen />
      </ReactQueryCacheProvider>
    </BrowserRouter>
  )
}

export default App
