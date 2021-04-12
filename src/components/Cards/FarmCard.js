import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import Step from 'components/Form/Step'
import Button from 'components/Button'
import FetchCard from 'components/FetchCard'
import ImageLoader from 'components/ImageLoader'

import useFetch from 'hooks/useFetch'
import useApi from 'context/api'

const FarmCard = ({ farm, _small }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [reload, setReload] = React.useState(0)
  const { getActivities } = useApi()
  const history = useHistory()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, isLoading, error } = useFetch(
    `${farm?.order?.product?._id}_activities`,
    getActivities,
    reload,
    {
      farm: farm?.order?.product?._id
    }
  )

  return (
    <Box
      rounded='xl'
      shadow='md'
      p={10}
      bg='white'
      minW={{ base: 82, md: _small ? 85 : 130 }}
      minH={{ md: !_small ? '34rem' : 'auto' }}
      mr={{ md: 6 }}
    >
      <Flex align='center' justify='space-between'>
        <Flex align='center'>
          <Box mr={4}>
            <Avatar
              bgColor='white'
              borderWidth='1px'
              borderColor='gray.300'
              src={farm?.order?.product?.cropVariety?.imageUrl}
            />
          </Box>

          <Box>
            <Flex align='center'>
              <Heading as='h4' fontSize={{ md: '2xl' }}>
                {farm?.order?.product?.cropVariety?.crop?.name}
              </Heading>
              {!_small && (
                <Text ml={1} as='span' fontSize='sm' color='gray.500'>
                  ({farm?.order?.product?.cropVariety?.name}) {farm.name}
                </Text>
              )}
            </Flex>

            <Text color='gray.500' mt={-1}>
              {farm?.order?.product?.location?.name},
              {farm?.order?.product?.location?.state}
            </Text>
          </Box>
        </Flex>

        <Box d={{ base: 'none', md: 'block' }}>
          <Button
            btntitle={!_small ? 'View Farm' : 'View Wallet'}
            rounded='30px'
            disabled
            w={{ md: '190px' }}
            h={{ md: '55px' }}
            fontSize={{ md: 'lg' }}
            onClick={_ => {
              return !_small
                ? history.push(`/farms/${farm._id}`)
                : history.push(`/wallets/${farm._id}`)
            }}
          />
        </Box>
      </Flex>
      {!_small && (
        <>
          <Divider orientation='horizontal' borderColor='gray.300' my={6} />

          <Flex
            justifyContent='space-between'
            alignItems='center'
            pos='relative'
          >
            <Box w={{ md: '50%' }}>
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
                <Box h='300px' overflowY='scroll'>
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
            <Box w={{ md: '45%' }} pos='absolute' right={{ md: 0 }}>
              <ImageLoader
                isLoaded={imageLoaded}
                setLoading={setImageLoaded}
                height='350'
                rounded='3xl'
                src={farm?.order?.product?.cropVariety?.imageUrl}
              />
            </Box>
          </Flex>
        </>
      )}

      <Box d={{ base: 'block', md: 'none' }} mt={{ base: 4, md: 0 }}>
        <Button
          btntitle='View Farm'
          rounded='30px'
          disabled
          w={{ base: '100%', md: '190px' }}
          h={{ base: 12, md: '55px' }}
          fontSize={{ md: 'lg' }}
          onClick={() => history.push(`/farms/${farm._id}`)}
        />
      </Box>
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
