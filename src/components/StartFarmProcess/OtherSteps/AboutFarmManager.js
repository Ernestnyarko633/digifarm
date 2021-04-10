/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'

import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  ListItem,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import { Support, Schedule, Update } from 'theme/Icons'
import Prismic from 'prismic-javascript'
import { BsInfoCircleFill } from 'react-icons/bs'
import { IoLocation } from 'react-icons/io5'
import { motion } from 'framer-motion'

import getConfig from 'utils/configs'
import ImageLoader from 'components/ImageLoader'

const MotionGrid = motion.custom(Grid)

const AboutFarmManager = ({ farm }) => {
  const [isLoaded, setLoading] = React.useState(false)
  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig()

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN
  })

  const [doc, setDocData] = React.useState(null)

  React.useEffect(() => {
    let mounted = true
    if (mounted && !doc) {
      const fetchData = async () => {
        let data = []
        const dataPromise = await farm.managers.map(async managers => {
          const res = await Client.getByUID('farm_managers', managers._id)
          return res.data
        })

        data = await Promise.all(dataPromise)

        if (data) {
          setDocData(data[0])
        }
      }
      fetchData()
    }
    return () => (mounted = false)
  }, [Client, doc, farm.managers])

  return (
    <Box mx={{ base: 2, md: 0 }}>
      <MotionGrid templateColumns={{ md: 'repeat(2, 1fr)' }}>
        <Box
          px={{ base: 6, md: 20 }}
          pt={{ base: 6, md: 20 }}
          borderRightColor='gray.400'
          borderRightWidth={2}
        >
          <Box>
            <ImageLoader
              h={{ base: 64, md: 80 }}
              w={{ base: 80, md: '100%' }}
              height='300px'
              isLoaded={isLoaded}
              setLoading={setLoading}
              rounded='3xl'
              objectFit='cover'
              src={
                farm.cropVariety?.imageUrl || farm.cropVariety?.crop?.imageUrl
              }
              alt={farm.cropVariety?.crop?.name}
            />
          </Box>
          <Flex
            direction='column'
            align='center'
            justify='space-between'
            mt={{ md: 20 }}
            display={{ base: 'none', md: 'flex' }}
          >
            <Heading as='h6' fontSize='md' mb={3}>
              What is included in this farm
            </Heading>
            <Flex justify='space-between' align='center' fontSize='sm'>
              <Flex align='center'>
                <Icon as={Update} color='cf.400' boxSize={5} />
                <Text ml={1}>Farm Updates</Text>
              </Flex>
              <Flex align='center' mx={6}>
                <Icon as={Support} color='cf.400' boxSize={5} />
                <Text ml={1}>Support</Text>
              </Flex>
              <Flex align='center'>
                <Icon as={Schedule} color='cf.400' boxSize={5} />
                <Text ml={1}>Scheduled Farm Visits</Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        <Box>
          <Box px={{ base: 6, md: 20 }} pt={{ base: 6, md: 20 }}>
            <Box py={4}>
              <Flex alignItems='center'>
                <Heading as='h2' size='lg' textTransform='uppercase'>
                  {farm.cropVariety?.crop?.name}
                </Heading>
                <Text ml={2} as='span' fontSize='xs' textColor='gray.500'>
                  ({farm.cropVariety?.name}) #{farm.name}
                </Text>
              </Flex>
              <Flex fontSize='sm' alignItems='center'>
                <Icon as={IoLocation} color='cf.400' />
                {farm.location?.name}, {farm.location?.state},{' '}
                {farm.location?.country}
                <Icon as={BsInfoCircleFill} color='cf.400' mx={2} />
              </Flex>
            </Box>
            <Divider />
            <Box py={5}>
              <Heading pb={5} as='h5' size='md'>
                Meet the farm managers
              </Heading>
              <Box borderColor='gray.400' p={5} borderWidth={1} rounded='md'>
                {farm.managers?.map(manager => (
                  <Grid key={manager._id} templateColumns='repeat(2, 1fr)'>
                    <Box py={10} px={2}>
                      <Avatar
                        src={doc?.manager_image?.url || manager?.avatar}
                        size={{ base: 4, md: 8 }}
                        justify='space-around'
                      />
                    </Box>
                    <Box m={{ base: 3, md: 5 }}>
                      <Text fontSize='md' fontWeight='800'>
                        {manager?.firstName} {manager?.lastName}
                      </Text>
                      <Text fontSize='sm'>Farm Manager</Text>
                      <Divider
                        orientation='horizontal'
                        borderColor='gray.200'
                        w={60}
                        my={5}
                      />
                      <Text>Manager Profile</Text>
                      {doc ? (
                        <UnorderedList>
                          {doc?.manager_profile?.map(item => (
                            <ListItem
                              key={item.text}
                              fontSize='xs'
                              textColor='gray.500'
                            >
                              {item.text}
                            </ListItem>
                          ))}
                        </UnorderedList>
                      ) : (
                        <Text
                          className='loading-text loading-text-b'
                          fontSize='xs'
                        >
                          loading farm manager profile
                        </Text>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Flex
          direction='column'
          mt={{ md: 20 }}
          display={{ base: 'flex', md: 'none' }}
          px={{ base: 6, md: 20 }}
          mb={4}
        >
          <Heading as='h6' fontSize='md' mb={3}>
            What is included in this farm
          </Heading>
          <Flex fontSize='sm' direction='column'>
            <Flex align='center'>
              <Icon as={Update} color='cf.400' boxSize={5} />
              <Text ml={1}>Farm Updates</Text>
            </Flex>
            <Flex align='center' py={3}>
              <Icon as={Support} color='cf.400' boxSize={5} />
              <Text ml={1}>Support</Text>
            </Flex>
            <Flex align='center'>
              <Icon as={Schedule} color='cf.400' boxSize={5} />
              <Text ml={1}>Scheduled Farm Visits</Text>
            </Flex>
          </Flex>
        </Flex>
      </MotionGrid>
    </Box>
  )
}

AboutFarmManager.propTypes = {
  farm: PropTypes.object.isRequired
}

export default AboutFarmManager
