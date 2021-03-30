import axios from 'axios'
import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import getConfig from 'utils/configs'

const ExternalContext = createContext()

export const ExternalContextProvider = ({ children }) => {
  const {
    EXCHANGE_RATE_API,
    EXCHANGE_RATE_API_KEY,
    EOS_API_KEY,
    EOS_API
  } = getConfig()

  /**
   *@summary returns an array of results with view_id included
   * @param { string } type whether sentinel2, landsat8, or multi by default sentinel2 is activated
   * @param { object } payload to be sent to the eos search api
   */
  const getEOSViewID = async (payload, type = '') => {
    return await axios({
      method: 'POST',
      url: EOS_API + '/lms/search/v2' + type,
      data: JSON.stringify(payload),
      params: { api_key: EOS_API_KEY }
    })
  }

  /**
   *@summary returns an obejct with task_id included task_id is needed to fetch statistics on a particular locations. getting statistics on "NDVI", "MSI", "EVI" bm types
   * @param { object } payload to be sent to the eos stats api
   */
  const createEOSTaskForStats = async payload => {
    return await axios({
      method: 'POST',
      url: EOS_API + '/gdw/api',
      data: JSON.stringify(payload),
      params: { api_key: EOS_API_KEY }
    })
  }

  /**
   *@summary returns statistical data on the task_id created : "NDVI", "MSI", "EVI" bm types
   * @param { string } task_id to be sent to the eos stats api
   */
  const getEOSStatistics = async task_id => {
    return await axios({
      method: 'GET',
      url: EOS_API + '/gdw/api/' + task_id,
      params: { api_key: EOS_API_KEY }
    })
  }

  /**
   *@summary returns array of obejcts with weather forcast on a particular specified geometric location
   * @param { string } type without-aggregate-data, historical,, default returns normal forcast for location for the next four days including the current day
   * @param { object } payload to be sent to the eos weather api
   */

  const getEOSWeatherForeCast = async (payload, type = '') => {
    return await axios({
      method: 'POST',
      url: EOS_API + '/forecast/weather/forecast/' + type,
      data: JSON.stringify(payload),
      params: { api_key: EOS_API_KEY }
    })
  }

  const getExchangeRate = async params => {
    params.apiKey = EXCHANGE_RATE_API_KEY
    params.compact = 'ultra'
    return await axios({ method: 'GET', url: EXCHANGE_RATE_API, params })
  }

  return (
    <ExternalContext.Provider
      value={{
        getExchangeRate,
        getEOSViewID,
        createEOSTaskForStats,
        getEOSStatistics,
        getEOSWeatherForeCast
      }}
    >
      {children}
    </ExternalContext.Provider>
  )
}

ExternalContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useExternal = () => useContext(ExternalContext)

export default useExternal
