import { APIProvider } from 'context/apiContext'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import Router from 'routes/router'
import React from 'react'
import { ComponentProvider } from 'context/ComponentContext'
import { ModalsProvider } from 'context/ModalsContext'

const queryCache = new QueryCache()

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <APIProvider>
        <ComponentProvider>
          <ModalsProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </ModalsProvider>
        </ComponentProvider>
      </APIProvider>
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryCacheProvider>
  )
}

export default App
