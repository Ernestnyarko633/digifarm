import React from 'react'
import { BrowserRouter, withRouter } from 'react-router-dom'
import ReactGA from 'react-ga'

import { StartFarmContextProvider } from 'context/start-farm'
import { ComponentContextProvider } from 'context/component'
import { ExternalContextProvider } from 'context/external'
import { ModalContextProvider } from 'context/modal'
import { AuthContextProvider } from 'context/auth'
import { ApiContextProvider } from 'context/api'

import Router from 'routes/register'

const TRACKING_ID = '167739611-1'
ReactGA.initialize(TRACKING_ID)

const App = () => {
  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <BrowserRouter>
      <ComponentContextProvider>
        <ApiContextProvider>
          <ExternalContextProvider>
            <AuthContextProvider>
              <StartFarmContextProvider>
                <ModalContextProvider>
                  <Router />
                </ModalContextProvider>
              </StartFarmContextProvider>
            </AuthContextProvider>
          </ExternalContextProvider>
        </ApiContextProvider>
      </ComponentContextProvider>
    </BrowserRouter>
  )
}

export default withRouter(App)
