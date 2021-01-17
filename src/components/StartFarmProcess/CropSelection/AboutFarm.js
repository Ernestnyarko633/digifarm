import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Progress,
  Text
} from '@chakra-ui/react'
import { BsInfoCircleFill } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'

import { getformattedDate } from 'helpers/misc'

const AboutFarm = ({ farm }) => (
  <Box css={{ direction: 'ltr' }}>
    <Box>
      <Box>
        <Heading as='h5' size='md'>
          {farm.cropVariety?.crop?.name}({farm.cropVariety?.name}) #{farm.name}
        </Heading>
        <Text fontSize='xs'>
          <Icon as={MdLocationOn} color='gray.400' /> {farm.location?.name},{' '}
          {farm.location?.state} <Icon as={BsInfoCircleFill} color='cf.400' />
        </Text>
        <Divider orientation='horizontal' borderColor='gray.300' my={6} />
      </Box>

      <Box w='100%' h='200px' backgroundColor='#cccc'>
        <Image
          h='100%'
          w='100%'
          objectFit='cover'
          rounded='md'
          src={farm.cropVariety?.imageUrl || farm.cropVariety?.crop?.imageUrl}
          alt='crop'
        />
      </Box>
    </Box>

    <Box mb={{ md: 12 }}>
      <Box mt={{ md: 10 }}>
        <Heading as='h6' size='sm'>
          About crop
        </Heading>
      </Box>

      <Box
        borderWidth={1}
        borderColor='gray.300'
        rounded='md'
        p={{ md: 6 }}
        color='gray.700'
        mt={4}
      >
        <Flex align='center' justify='space-between' fontSize='sm'>
          <Text>Farm starts: {getformattedDate(farm.startDate)} </Text>
          <Text>Farm duration: {farm.duration} months </Text>
        </Flex>
        <Divider orientation='horizontal' mt={4} />
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

    <Box textAlign='left'>
      <Text>{farm.cropVariety?.description}</Text>
      <Text>{farm.cropVariety?.crop?.description}</Text>
    </Box>
  </Box>
)

AboutFarm.propTypes = {
  farm: PropTypes.object.isRequired
}

export default AboutFarm
