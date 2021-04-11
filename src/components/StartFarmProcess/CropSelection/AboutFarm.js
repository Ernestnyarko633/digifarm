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
  const [isLoaded, setLoading] = React.useState(false)
  return (
    <Box textAlign='left' css={{ direction: 'ltr' }}>
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
        <Divider orientation='horizontal' borderColor='gray.300' my={6} />
      </Box>

      <Box w='100%' h='300px' rounded='lg' backgroundColor='#cccc'>
        <ImageLoader
          h='100%'
          w='100%'
          height='300px'
          isLoaded={isLoaded}
          setLoading={setLoading}
          rounded='lg'
          objectFit='cover'
          src={farm.cropVariety?.imageUrl || farm.cropVariety?.crop?.imageUrl}
          alt={farm.cropVariety?.crop?.name}
        />
      </Box>

      <Box mb={{ md: 12 }}>
        <Box mt={{ base: 5, md: 10 }}>
          <Heading as='h6' size='sm'>
            About crop
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
            value={30}
            rounded='30px'
            borderWidth={1}
            borderColor='gray.300'
            bg='transparent'
            height='22px'
            my={{ md: 8 }}
          />
          <Flex align='center' justify='center' fontSize='sm'>
            <Text>{farm.acreage} Acres left</Text>
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
