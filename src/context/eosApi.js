/* eslint-disable */
import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import getConfig from 'utils/configs'
import http from 'utils/httpFacade'

const EosApiContext = createContext()

export const EosApiContextProvider = ({ children }) => {
  const { EOS_API_KEY , EOS_API} = getConfig()

    /**
   *@summary returns an array of results with view_id included
   * @param { string } type whether sentinel2, landsat8, or multi by default sentinel2 is activated
   * @param { object } payload to be sent to the eos search api
   */
  const getEOSViewID = async (payload, type) => {
      switch (type) {
          case 'sentinel2':
            return await http.post({
                url: `${EOS_API}/lms/search/v2/sentinel2?apikey=${EOS_API_KEY}`,
                body: JSON.stringify(payload)
              })
           case 'multi':
            return await http.post({
                url: `${EOS_API}/lms/search/v2?apikey=${EOS_API_KEY}`,
                body: JSON.stringify(payload)
              })
           case 'landsat8':
            return await http.post({
                url: `${EOS_API}/lms/search/v2/landsat8?apikey=${EOS_API_KEY}`,
                body: JSON.stringify(payload)
              })
          default:
            return await http.post({
                url: `${EOS_API}/lms/search/v2/sentinel2?apikey=${EOS_API_KEY}`,
                body: JSON.stringify(payload)
              })
      }
 
  }

    /**
   *@summary returns array of obejcts with weather forcast on a particular specified geometric location
   * @param { string } type without-aggregate-data, historical,, default returns normal forcast for location for the next four days including the current day
   * @param { object } payload to be sent to the eos weather api
   */

  const getWeatherForeCast = async (payload, type) => {
    
    switch (type) {
         case 'without-aggregate-data':
          return await http.post({
              url: `${EOS_API}/forecast/weather/forecast/world/?apikey=${EOS_API_KEY}`,
              body: JSON.stringify(payload)
            })
         case 'historical':
          return await http.post({
              url: `${EOS_API}/cz/backend/forecast-history/?apikey=${EOS_API_KEY}`,
              body: JSON.stringify(payload)
            })
        default:
          return await http.post({
              url: `${EOS_API}/forecast/weather/forecast/?apikey=${EOS_API_KEY}`,
              body: JSON.stringify(payload)
            })
        }
 
  }

  

  return <EosApiContext.Provider value={{
    getEOSViewID,
    getWeatherForeCast
  }}>{children}</EosApiContext.Provider>
}



  
EosApiContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useEosApi = () => useContext(EosApiContext)

export default useEosApi
