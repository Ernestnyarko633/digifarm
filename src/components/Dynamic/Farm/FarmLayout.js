import React from 'react'
import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import useApi from 'context/api'

import FarmLeftSideBar from '../Container/FarmLeftSideBar'
import FarmRightSidebar from '../Container/FarmRightSidebar'

export default function FarmLayout({ children, ...rest }) {
  const [state, setState] = React.useState('compA')
  const { id } = useParams()
  const [setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [farms, setFarms] = React.useState([])
  const { getMyFarm } = useApi()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const res = await getMyFarm(id)
        setFarms(res.data)

        setLoading(false)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [getMyFarm, id])

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

        <FarmRightSidebar state={state} farms={farms?.order?.product?._id} />
      </GridItem>
    </Grid>
  )
}

FarmLayout.propTypes = {
  children: PropTypes.node.isRequired,
  rest: PropTypes.any
}
