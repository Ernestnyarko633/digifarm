/* eslint-disable no-console */
import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import useComponent from 'context/component'

import { Button } from 'components'
import FarmInfo from 'components/Cards/FarmInfo'
import useStartFarm from 'context/start-farm'
import PropTypes from 'prop-types'

const MotionFlex = motion.custom(Flex)

const Confirmation = ({ order }) => {
  const { handleModalClick } = useComponent()
  const { currency, exchangeRate, selectedFarm } = useStartFarm()

  return (
    <MotionFlex w='100%'>
      <Box w={{ md: '50%' }}>
        <Flex align='center' justify='center' h='100%'>
          <Image
            w={80}
            h={80}
            src={require('../../../assets/images/congratulatioins.svg').default}
          />
        </Flex>
      </Box>
      <Box w={{ md: '50%' }} p={{ base: 2, md: 14 }} pos='relative'>
        <Flex direction='column' align='center' justify='center'>
          <Box textAlign='center' m='auto' mt={6}>
            <Text mb={1} fontSize={{ base: 18, md: 22 }} fontWeight='bold'>
              Confirmation
            </Text>
            <Text color='gray.400' mb={8} fontSize={{ base: 14, md: 20 }}>
              Hurray! you have successfully <br /> made payment to your new farm
            </Text>
          </Box>
          <FarmInfo
            order={order}
            farm={selectedFarm}
            currency={currency}
            rate={exchangeRate}
          />
        </Flex>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align='center'
          pos={{ md: 'absolute' }}
          bottom={5}
          left={0}
          right={0}
        >
          <Button
            w={64}
            h={12}
            mx={6}
            fontSize='md'
            rounded='30px'
            color='cf.900'
            variant='outline'
            borderColor='cf.900'
            btntitle='View farm invoice'
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
            onClick={() => {
              return handleModalClick('receipt', {
                order,
                currency,
                exchangeRate,
                type: 'invoice'
              })
            }}
          />
          <Button
            w={64}
            mt={{ base: 4, md: 0 }}
            h={12}
            fontSize='md'
            rounded='30px'
            btntitle='View farm agreement'
            onClick={() => {
              return handleModalClick('contract', {
                order,
                currency,
                exchangeRate,
                type: 'agreement'
              })
            }}
          />
        </Flex>
      </Box>
    </MotionFlex>
  )
}

Confirmation.propTypes = {
  order: PropTypes.any
}

export default Confirmation
