import React from 'react'
import PropTypes from 'prop-types'

import {
  Box,
  Flex,
  Grid,
  Icon,
  Text,
  Divider,
  Heading,
  GridItem
} from '@chakra-ui/react'
import Prismic from 'prismic-javascript'
import { BsInfoCircleFill } from 'react-icons/bs'
import { IoLocation } from 'react-icons/io5'
import { motion } from 'framer-motion'

import getConfig from 'utils/configs'
import ImageLoader from 'components/ImageLoader'
import Support from 'components/Support'
import ManagerProfile from './ManagerProfile'

const MotionGrid = motion(Grid)

const AboutFarmManager = ({ farm }) => {
  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig()

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN
  })

  const [doc, setDocData] = React.useState(null)

  React.useEffect(() => {
    let mounted = true
    if (mounted && !doc) {
      const fetchData = async () => {
        const res = await Client.getByUID('farm_managers', farm._id)

        if (res) {
          setDocData(res.data)
        }
      }
      fetchData()
    }
    return () => (mounted = false)
  }, [Client, doc, farm._id, farm.managers])

  return (
    <Box mx={{ base: 2, md: 0 }}>
      <MotionGrid templateColumns={{ md: 'repeat(2, 1fr)' }}>
        <GridItem
          borderRightColor='gray.400'
          borderRightWidth={{ md: 1 }}
          h={{ md: 123 }}
        >
          <Box
            px={{ base: 6, md: 20, lg: 10 }}
            pt={{ base: 6, md: 20, lg: 10 }}
          >
            <Box>
              <ImageLoader
                h={{ base: 64, md: 80 }}
                w={{ base: 80, md: '100%' }}
                height='300px'
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
              <Support />
            </Flex>
          </Box>
        </GridItem>
        <GridItem>
          <Box px={{ md: 20 }} pt={{ base: 6, md: 20 }}>
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
                <Icon as={IoLocation} color='cf.green' />
                {farm.location?.name}, {farm.location?.state},{' '}
                {farm.location?.country}
                <Icon as={BsInfoCircleFill} color='cf.green' mx={2} />
              </Flex>
            </Box>
            <Divider />
            <Box py={5}>
              <Heading pb={5} as='h5' size='md'>
                Meet the farm managers
              </Heading>
              <ManagerProfile item={doc} px={2} />
            </Box>
          </Box>
        </GridItem>
      </MotionGrid>
    </Box>
  )
}

AboutFarmManager.propTypes = {
  farm: PropTypes.object.isRequired
}

export default AboutFarmManager
