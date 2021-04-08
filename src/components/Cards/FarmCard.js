import React from 'react'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Text
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import Step from 'components/Form/Step'
import Button from 'components/Button'
import FetchCard from 'components/FetchCard'

import useFetch from 'hooks/useFetch'
import useApi from 'context/api'

const FarmCard = ({ farm, _small }) => {
  const [reload, setReload] = React.useState(0)
  const { getActivities } = useApi()
  const history = useHistory()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, isLoading, error } = useFetch(null, getActivities, reload, {
    farm: farm?._id
  })

  return (
    <Box
      rounded='xl'
      shadow='md'
      p={10}
      bg='white'
      minW={{ md: _small ? 85 : 130 }}
      minH={{ md: '34rem' }}
      mr={{ md: 6 }}
    >
      <Flex align='center' justify='space-between'>
        <Flex align='center'>
          <Box mr={4}>
            <Avatar
              src={
                farm?.order?.product?.cropVariety?.imageUrl ||
                require('../../assets/images/soya.png').default
              }
            />
          </Box>

          <Box>
            <Heading as='h4' fontSize={{ md: '2xl' }}>
              {farm.name}
            </Heading>
            <Text color='gray.500' mt={-1}>
              {farm?.order?.product?.location?.name},{' '}
              {farm?.order?.product?.location?.state}
            </Text>
          </Box>
        </Flex>

        <Button
          btntitle='View Farm'
          rounded='30px'
          w={{ md: '190px' }}
          h={{ md: '55px' }}
          fontSize={{ md: 'lg' }}
          onClick={() => history.push(`/farms/${farm._id}`)}
        />
      </Flex>
      {!_small && (
        <>
          <Divider orientation='horizontal' borderColor='gray.300' my={6} />

          <Flex
            justifyContent='space-between'
            alignItems='center'
            pos='relative'
          >
            <Box w={{ md: '40%' }}>
              <Heading as='h4' fontSize={{ md: '2xl' }}>
                Progress on farm
              </Heading>
              <Divider orientation='horizontal' borderColor='gray.300' my={3} />
              {isLoading || error ? (
                <FetchCard
                  m='auto'
                  align='center'
                  justify='center'
                  reload={triggerReload}
                  loading={isLoading}
                  error={error}
                  text='fetching progress'
                />
              ) : (
                <Box>
                  {data.length > 0 ? (
                    data.map((activity, index) => (
                      <Step
                        activity={activity}
                        key={activity.title}
                        cutThread={data.length - 1 === index}
                      />
                    ))
                  ) : (
                    <Box textAlign='center'>Data Unavailable</Box>
                  )}
                </Box>
              )}
            </Box>
            <Box
              w={{ md: '50%' }}
              pos='absolute'
              top={{ md: 14 }}
              right={{ md: 0 }}
            >
              <Image
                rounded='3xl'
                src={
                  farm?.order?.product?.cropVariety?.imageUrl ||
                  require('../../assets/images/farmimg.png').default
                }
              />
            </Box>
          </Flex>
        </>
      )}
    </Box>
  )
}

FarmCard.propTypes = {
  farm: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    order: PropTypes.object
  }),
  _small: PropTypes.bool
}

export default FarmCard
