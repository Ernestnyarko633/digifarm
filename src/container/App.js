import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import TagManager from 'react-gtm-module'
import { StartFarmContextProvider } from 'context/start-farm'
import { ComponentContextProvider } from 'context/component'
import { ExternalContextProvider } from 'context/external'
import { ModalContextProvider } from 'context/modal'
import { AuthContextProvider } from 'context/auth'
import { ApiContextProvider } from 'context/api'
import { WalletContextProvider } from 'context/wallet'
import { RolloverContextProvider } from 'context/rollover'
import { SocketContextProvider } from 'context/socket'
import Router from 'routes/register'

// const tagManagerArgs = {
//   gtmId: process.env.REACT_APP_GTM
// }

const App = () => {
  // const history = useHistory()
  // React.useEffect(() => {
  //   TagManager.initialize(tagManagerArgs)
  // }, [])

  function FacebookPixel() {
    React.useEffect(() => {
      import('react-facebook-pixel')
        .then(x => x.default)
        .then(ReactPixel => {
          ReactPixel.init('2143795925947401')
          ReactPixel.pageView()

          // history?.listen(location => {
          //   ReactPixel.pageView()
          //   ReactPixel.fbq('track', 'PageView')
          // })
        })
    })
    return null
  }

  return (
    <BrowserRouter>
      <SocketContextProvider>
        <ComponentContextProvider>
          <ApiContextProvider>
            <ExternalContextProvider>
              <AuthContextProvider>
                <RolloverContextProvider>
                  <StartFarmContextProvider>
                    <ModalContextProvider>
                      <WalletContextProvider>
                        <FacebookPixel />
                        <Router />
                      </WalletContextProvider>
                    </ModalContextProvider>
                  </StartFarmContextProvider>
                </RolloverContextProvider>
              </AuthContextProvider>
            </ExternalContextProvider>
          </ApiContextProvider>
        </ComponentContextProvider>
      </SocketContextProvider>
    </BrowserRouter>
  )
}

export default App
