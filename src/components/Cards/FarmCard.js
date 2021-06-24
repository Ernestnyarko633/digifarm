import React from 'react'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  Tag
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { Status } from 'helpers/misc'
import Step from 'components/Form/Step'
import Button from 'components/Button'
import FetchCard from 'components/FetchCard'
import ImageLoader from 'components/ImageLoader'
// import Scrollbar from 'react-perfect-scrollbar'

import useFetch from 'hooks/useFetch'
import useApi from 'context/api'

const FarmCard = ({ farm }) => {
  const [reload, setReload] = React.useState(0)
  const { getActivities } = useApi()
  const [imageUrl, setImageUrl] = React.useState(null)
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

  //lifecycle runs on mount and if farm and data changes
  React.useEffect(() => {
    let mounted = true
    if (data && mounted && farm) {
      let activities = data
      // get current activities being worked on
      let startedActivities = activities.filter(
        activity => activity?.status === Status.IN_PROGRESS
      )
      let completedActivities = activities.filter(
        activity => activity?.status === Status.COMPLETED
      )

      startedActivities = startedActivities.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      )

      completedActivities = completedActivities.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      )

      //set image
      if (startedActivities.length) {
        setImageUrl(startedActivities[0]?.imageUrl)
      } else if (completedActivities.length) {
        setImageUrl(completedActivities[0]?.imageUrl)
      } else {
        //set default
        setImageUrl(farm?.order?.product?.cropVariety?.imageUrl)
      }
    }
    return () => (mounted = false)
  }, [data, farm])

  return (
    <Box
      rounded='xl'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      p={10}
      bg='white'
      minW={{ base: 82, md: 120, xl: 123, '2xl': 125 }}
      h={data?.length > 2 ? '100%' : 110}
      mr={{ base: 5, md: 6 }}
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
            {!farm?.order?.cooperative ? (
              <Heading as='h4' fontSize={{ base: 'lg', md: '2xl' }}>
                {farm?.order?.product?.cropVariety?.crop?.name}
              </Heading>
            ) : (
              <Flex direction='row' justify='center' align='center'>
                <Heading as='h4' fontSize={{ base: 'lg', md: '2xl' }}>
                  {farm?.order?.product?.cropVariety?.crop?.name}
                </Heading>

                <Box mx={5}>
                  <Tag
                    color='cf.green'
                    justifyContent='center'
                    bg='#EFF6ED'
                    bgGradient='linear(to-l, #EFF6ED)'
                    rounded={20}
                    minW='12'
                    maxH='5'
                    px={5}
                    py={3}
                    mr={2}
                  >
                    <Text fontWeight={600}>Cooperative</Text>
                  </Tag>
                </Box>
              </Flex>
            )}

            <Text
              as='span'
              fontSize={{ base: 'tiny', md: 'sm' }}
              color='gray.500'
            >
              ({farm?.order?.product?.cropVariety?.name}) {farm.name}
            </Text>
          </Box>
        </Flex>

        <Box d={{ base: 'none', xl: 'block' }}>
          <Button
            rounded='full'
            h={{ md: 12, '2xl': 14 }}
            btntitle='View Farm'
            w={{ md: 44, '2xl': 52 }}
            fontWeight='bold'
            fontSize={{ md: 'lg' }}
            onClick={_ => {
              sessionStorage.setItem('selectedFarm', JSON.stringify(farm))
              setTimeout(() => {
                return history.push(`/farms/${farm._id}`)
              }, 500)
            }}
          />
        </Box>
      </Flex>
      <>
        <Divider orientation='horizontal' borderColor='gray.300' my={6} />
        <Flex
          flexDir={{ base: 'column', xl: 'row' }}
          justify={{ xl: 'space-between' }}
          fontSize={{ base: 'xs', xl: 'md' }}
        >
          <Text color='gray.400'>
            Number of acres:{' '}
            <Text as='span' color='gray.700' fontWeight='bold'>
              {farm?.order?.acreage} acres
            </Text>
          </Text>
          <Text color='gray.400'>
            Location:{' '}
            <Text as='span' color='gray.700' fontWeight='bold'>
              {farm?.order?.product?.location?.name}
              {', '}
              {farm?.order?.product?.location?.state}
            </Text>
          </Text>
        </Flex>

        <Divider orientation='horizontal' borderColor='gray.300' my={6} />

        <Flex
          justifyContent='space-between'
          alignItems={data?.length > 3 ? 'center' : 'flex-start'}
          pos='relative'
        >
          <Box w={{ base: '100%', md: '80%', xl: '50%' }}>
            <Heading as='h4' fontSize={{ md: '2xl' }}>
              Farm Progress
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
            w={{ md: '45%' }}
            display={{ base: 'none', xl: 'flex' }}
            pos='absolute'
            right={{ md: 0 }}
          >
            <ImageLoader height='auto' rounded='3xl' src={imageUrl} />
          </Box>
        </Flex>
      </>

      <Box d={{ base: 'block', xl: 'none' }} mt={{ base: 4, md: 10, xl: 0 }}>
        <Button
          btntitle='View Farm'
          rounded='30px'
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
  })
}

export default FarmCard
