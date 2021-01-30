import React from 'react'
import PropTypes from 'prop-types'

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
import { InfoIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

import useStartFarm from 'context/start-farm'

import BaseSelect from 'components/Form/BaseSelect'
import FormRadio from 'components/Form/FormRadio'
import FormInput from 'components/Form/FormInput'

import Map from './Map'
import { getFormattedMoney } from 'helpers/misc'

const options = ['Yes', 'No']

const MotionGrid = motion.custom(Grid)

const ChooseAcreage = ({ farm }) => {
  const [wantCycle, setWantCycle] = React.useState('no')

  const { cycle, acreage, setCycle, setAcreage } = useStartFarm()

  // eslint-disable-next-line no-console
  console.log(wantCycle)

  return (
    <MotionGrid layout='true' templateColumns={{ md: 'repeat(2, 1fr)' }}>
      <GridItem>
        <Map />
      </GridItem>

      <GridItem
        borderLeftWidth={1}
        borderLeftColor='gray.300'
        overflowY='scroll'
        css={{
          direction: 'rtl',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth'
        }}
        mb={10}
      >
        <Box css={{ direction: 'ltr' }} p={{ md: 10 }}>
          <Heading as='h6' size='md' mb={2}>
            About Location{' '}
            <Icon as={InfoIcon} color='cf.400' boxSize={4} mx={2} />
          </Heading>

          <Box
            rounded='md'
            padding={10}
            borderWidth={1}
            overflow='hidden'
            borderColor='gray.300'
          >
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
          <Flex marginTop='10' justifyContent='space-between'>
            <Box>
              <Heading as='h5' size='sm' mb={2}>
                Choose number of acres to farm ({farm.acreage - acreage})
              </Heading>
              <Box w={36}>
                <FormInput
                  min={1}
                  bg='white'
                  type='number'
                  name='acreage'
                  value={acreage}
                  max={farm.acreage}
                  label='How many acres?'
                  onChange={e => {
                    // eslint-disable-next-line no-console
                    console.log(e.target.value)
                    if (e.nativeEvent.data) {
                      setAcreage(e.nativeEvent.data)
                    }
                  }}
                />
              </Box>
            </Box>
            <Box textAlign='right'>
              <Heading as='h5' size='sm' mb={2}>
                Cost($)
              </Heading>
              <Box mt={6}>
                <Text textAlign='right'>
                  {getFormattedMoney(farm.pricePerAcre * acreage, true)}
                </Text>
              </Box>
            </Box>
          </Flex>
          <Box marginTop={10}>
            <FormRadio
              icon
              state={wantCycle}
              options={options}
              onChange={setWantCycle}
              title='Do you want to apply cycle for this farm?'
            />
          </Box>
          {wantCycle === 'yes' && (
            <Box my={10}>
              <Heading as='h5' size='sm' mb={2}>
                Choose number of cycles
              </Heading>
              <Box w='250px'>
                <BaseSelect
                  id='cycle'
                  name='cycle'
                  value={cycle}
                  placeholder='1 cycle'
                  options={[2, 3, 4, 5]}
                  title='Choose number of cycle(s)'
                  setFieldValue={(name, value) => setCycle(value)}
                />
              </Box>
            </Box>
          )}
        </Box>
      </GridItem>
    </MotionGrid>
  )
}

ChooseAcreage.propTypes = {
  farm: PropTypes.object.isRequired
}

export default ChooseAcreage
