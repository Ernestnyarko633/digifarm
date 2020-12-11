import React from 'react'
import {
  Box,
  Grid,
  Heading,
  Divider,
  Text,
  GridItem,
  Icon,
  Flex
} from '@chakra-ui/react'

import BaseSelect from 'components/Form/BaseSelect'
import { InfoIcon } from '@chakra-ui/icons'
import FormRadio from 'components/Form/FormRadio'
import Map from './Map'
import { motion } from 'framer-motion'

const array = [...Array(500).keys()]
const options = [ 'Yes', 'No' ]

const MotionGrid = motion.custom(Grid)

const ChooseAcreage = () => {
  const [ selectedAcreage, setSelectedAcreage ] = React.useState('')
  const [ cycle, setCycle ] = React.useState('yes')

  return (
    <MotionGrid layout templateColumns={{ md: 'repeat(2, 1fr)' }}>
      <GridItem>
        <Map />
      </GridItem>

      <GridItem borderLeftWidth={1}
        borderLeftColor='gray.300'
        overflowY='scroll'
        css={{
          direction     : 'rtl',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth',
        }}
        mb={10}>
        <Box css={{ direction: 'ltr' }} p={{ md: 10 }}>
          <Heading as='h6' size='md' mb={2}>
            About Location{' '}
            <Icon as={InfoIcon} color='cf.400' boxSize={4} mx={2} />
          </Heading>

          <Box borderWidth={1}
            borderColor='gray.300'
            rounded='md'
            overflow='hidden'
            padding={10}>
            <Box paddingBottom='5'>
              <Heading as='h6' size='md'>
                Ecological zone
              </Heading>
              <Text>Northern savanna</Text>
            </Box>
            <Divider orientation='horizontal' />
            <Heading as='h6' size='xs' mb={4}>
              Weather
            </Heading>
            <Text mb={6}>
              Weather Sandy loam soil is one of the most preferable types of
              soil for many types of plants. Planting in loam soil with a high
              percentage of sand is the same as planting in normal loam soil,
              but extra amendments may be made to compensate for slightly lower
              water
            </Text>
          </Box>
          <Box marginTop='10'>
            <Heading as='h5' size='sm' mb={2}>
              Choose number of acres to farm
            </Heading>
            <Flex align='center'>
              <BaseSelect options={array}
                id='acres'
                name='acres'
                setFieldValue={setSelectedAcreage}
                value={selectedAcreage || ''}
                title='How many acres?'
                placeholder='1 Acre'
                width='250px' />
              <Box ml={6}>
                <Text color='red.600' fontSize='xs'>
                  +$800.00
                </Text>
                <Text mt={-2}>$ 750.000</Text>
              </Box>
            </Flex>
          </Box>
          <Box marginTop={10}>
            <FormRadio state={cycle}
              onChange={setCycle}
              title='Do you want allow cycle for this farm?'
              options={options}
              icon />
          </Box>
          <Box my={10}>
            <Heading as='h5' size='sm' mb={2}>
              Choose number of acres to farm
            </Heading>
            <Box w='250px'>
              <BaseSelect options={array}
                id='acres'
                name='acres'
                setFieldValue={setSelectedAcreage}
                value={selectedAcreage || ''}
                title='Choose number of cycle(s)'
                placeholder='1 cycle' />
            </Box>
          </Box>
        </Box>
      </GridItem>
    </MotionGrid>
  )
}

export default ChooseAcreage
