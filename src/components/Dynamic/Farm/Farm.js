import { Box, Flex } from '@chakra-ui/react'
import Button from 'components/Button'
import React from 'react'
import PropTypes from 'prop-types'
import FarmLayout from './FarmLayout'
import Map from 'components/Map/Map'
import useEosApi from 'context/eosApi'

export default function Farm({ onOpen, digitalFarmerFarms }) {
  const [loading, setLoading] = React.useState('fetching')
  const [error, setError] = React.useState(null)
  const [viewID, setViewID] = React.useState('')
  const { getEOSViewID } = useEosApi()

  React.useEffect(() => {
    let _payload = {
      fields: ['sceneID', 'cloudCoverage'],
      limit: 1,
      page: 1,
      search: {
        satellites: ['sentinel2', 'landsat8'],
        date: {
          from: '2021-01-01',
          to: '2021-02-08'
        },
        cloudCoverage: {
          from: 0,
          to: 60
        },
        shape: {
          type: 'Polygon',
          coordinates: [
            [
              [-1.531048, 5.578849],
              [-1.530683, 5.575411],
              [-1.521606, 5.576286],
              [-1.522036, 5.579767],
              [-1.531048, 5.578849]
            ]
          ]
        }
      },
      sort: {
        date: 'desc'
      }
    }
    const fetchData = async payload => {
      try {
        setLoading('fetching')
        const res = await getEOSViewID(payload, 'multi')
        setViewID(res.results[0].view_id)
        // redisClient.setex(redisKey, 86400, JSON.stringify(res.results[0].view_id))
        setLoading('done')
      } catch (error) {
        setError(error)
        setLoading('done')
      }
    }
    fetchData(_payload)
  }, [getEOSViewID, digitalFarmerFarms])

  return (
    <FarmLayout>
      <Box h={{ md: 128 }} w='100%'>
        <Box
          h='100%'
          w='100%'
          objectFit='cover'
          as={Map}
          viewID={viewID}
          loading={loading}
          error={error}
          center={[-1.521606, 5.576286]}
        />
      </Box>
      <Flex align='center' justify='flex-end' my={{ md: 6 }} px={{ md: 6 }}>
        <Button
          btntitle='Download'
          bg='white'
          borderWidth={2}
          borderColor='cf.400'
          rounded='30px'
          mr={6}
          _hover={{ bg: 'white' }}
          color='cf.400'
          h={12}
          w={{ md: 40 }}
          shadow='none'
        />
        <Button
          btntitle='Share'
          rounded='30px'
          h={12}
          w={{ md: 40 }}
          onClick={onOpen}
        />
      </Flex>
    </FarmLayout>
  )
}

Farm.propTypes = {
  onOpen: PropTypes.func,
  digitalFarmerFarms: PropTypes.any
}
