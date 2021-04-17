import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Progress,
  Text
} from '@chakra-ui/react'
import { BsInfoCircleFill } from 'react-icons/bs'
import { IoLocation } from 'react-icons/io5'

import { getformattedDate } from 'helpers/misc'
import ImageLoader from 'components/ImageLoader'

const AboutFarm = ({ farm }) => {
  return (
    <Box textAlign='left' css={{ direction: 'ltr' }}>
      <Flex justifyContent='space-between'>
        <Box>
          <Flex alignItems='center'>
            <Heading as='h5' size='md' textTransform='uppercase'>
              {farm.cropVariety?.crop?.name}
            </Heading>
            <Text ml={2} as='span' fontSize='xs' textColor='gray.500'>
              ({farm.cropVariety?.name}) #{farm.name}
            </Text>
          </Flex>
          <Text fontSize='xs'>
            <Icon as={IoLocation} color='cf.400' />
            {farm.location?.name}, {farm.location?.state},{' '}
            {farm.location?.country}
            <Icon as={BsInfoCircleFill} color='cf.400' mx={2} />
          </Text>
        </Box>
        <Box>
          <Heading as='h5' size='md'>
            ${farm.pricePerAcre}/acre
          </Heading>
          <Text fontWeight='600' color='cf.400'>
            {farm.projectedMarketReturnsRangePerAcre.min}
            {'% - '}
            {farm.projectedMarketReturnsRangePerAcre.max}% ROI
          </Text>
        </Box>
      </Flex>

      <Divider orientation='horizontal' borderColor='gray.300' my={6} />

      <Box w='100%' h='300px' rounded='lg' backgroundColor='#fff'>
        <ImageLoader
          h='100%'
          w='100%'
          height='300px'
          rounded='lg'
          objectFit='cover'
          src={farm.cropVariety?.imageUrl || farm.cropVariety?.crop?.imageUrl}
          alt={farm.cropVariety?.crop?.name}
        />
      </Box>

      <Box mb={{ md: 12 }}>
        <Box mt={{ base: 5, md: 10 }}>
          <Heading as='h6' size={{ base: 'xs', md: 'sm' }}>
            About this crop
          </Heading>
        </Box>

        <Box
          borderWidth={1}
          borderColor='gray.300'
          rounded='md'
          p={{ base: 3, md: 6 }}
          color='gray.700'
          mt={4}
        >
          <Flex align='center' justify='space-between' fontSize='sm'>
            <Text>Farm starts: {getformattedDate(farm.startDate)} </Text>
            <Text>Farm duration: {farm.duration} months </Text>
          </Flex>
          <Divider orientation='horizontal' my={4} />
          <Progress
            colorScheme='cfButton'
            value={(farm.acreageSold / (farm.acreage + farm.acreageSold)) * 100}
            rounded='30px'
            borderWidth={1}
            borderColor='gray.300'
            bg='transparent'
            height='22px'
            my={{ md: 8 }}
          />
          <Flex align='center' justify='center' fontSize='sm'>
            <Text>{farm.acreage + farm.acreageSold} Acres</Text>
            <Divider
              orientation='vertical'
              height={4}
              mx={4}
              borderColor='gray.400'
            />
            <Text>{farm.acreage} Acres available</Text>
            <Divider
              orientation='vertical'
              height={4}
              mx={4}
              borderColor='gray.400'
            />
            <Text>{farm.acreageSold} Acres bought</Text>
          </Flex>
        </Box>
      </Box>

      <Box textAlign='left' mt={{ base: 3, md: 0 }}>
        <Text>{farm.cropVariety?.description}</Text>
        <Text>{farm.cropVariety?.crop?.description}</Text>
      </Box>
    </Box>
  )
}

AboutFarm.propTypes = {
  farm: PropTypes.object.isRequired
}

export default AboutFarm
