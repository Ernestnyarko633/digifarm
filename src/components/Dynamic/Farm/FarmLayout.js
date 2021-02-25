import React from 'react'
import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import useApi from 'context/api'
import useEosApi from 'context/eosApi'

import FarmLeftSideBar from '../Container/FarmLeftSideBar'
import FarmRightSidebar from '../Container/FarmRightSidebar'

export default function FarmLayout({ children, ...rest }) {
  const [state, setState] = React.useState('compA')
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [digitalFarmerFarm, setDigitalFarmerFarm] = React.useState([])
  const [eosTaskID, setEosTaskID] = React.useState('')
  const [eosStats, setEosStats] = React.useState([])
  const { getMyFarm } = useApi()
  const { createEOSTaskForStats, getEOSStatistics } = useEosApi()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getMyFarm(id)
        setDigitalFarmerFarm(res.data)
        setLoading(false)
      } catch (error) {
        setError(error)
      }
    }
    id && fetchData()
  }, [getMyFarm, id, setLoading])

  React.useEffect(() => {
    let _payload = {
      type: 'mt_stats',
      params: {
        bm_type: '(B08-B04)/(B08+B04)',
        date_start: '2020-12-01',
        date_end: '2020-12-31',
        geometry: {
          coordinates: [
            [
              [-1.531048, 5.578849],
              [-1.530683, 5.575411],
              [-1.521606, 5.576286],
              [-1.522036, 5.579767],
              [-1.531048, 5.578849]
            ]
          ],
          type: 'Polygon'
        },
        reference: 'ref_20210208-00-00',
        sensors: ['sentinel2'],
        max_cloud_cover_in_aoi: 0,
        limit: 5
      }
    }
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await createEOSTaskForStats(_payload)
        setEosTaskID(res?.task_id)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [createEOSTaskForStats])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getEOSStatistics(eosTaskID)
        setEosStats(res?.result)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [eosTaskID, getEOSStatistics])
  return (
    <Grid
      templateRows='repeat(1 1fr)'
      templateColumns='17% 53% 30%'
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
    >
      <GridItem shadow='xl'>
        <FarmLeftSideBar state={state} setState={setState} />
      </GridItem>
      <GridItem>
        <Box
          minW={{ lg: '53%' }}
          as='main'
          color='gray.800'
          fontFamily='body'
          overflowX='hidden'
          {...rest}
        >
          {children}
        </Box>
      </GridItem>
      <GridItem shadow='xl'>
        {error && (
          <Box>
            <Text fontSize='md' ml={2} color='cf.400'>
              Something went wrong
            </Text>
          </Box>
        )}

        {!loading && !error && (
          <FarmRightSidebar
            state={state}
            eosStats={eosStats}
            digitalFarmerFarm={digitalFarmerFarm}
          />
        )}
      </GridItem>
    </Grid>
  )
}

FarmLayout.propTypes = {
  children: PropTypes.node.isRequired,
  rest: PropTypes.any
}
