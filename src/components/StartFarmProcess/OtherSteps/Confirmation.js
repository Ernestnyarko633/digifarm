import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import useComponent from 'context/component'

import { Button } from 'components'
import FarmInfo from 'components/Cards/FarmInfo'

const MotionFlex = motion.custom(Flex)

const Confirmation = () => {
  const { handleModalClick } = useComponent()
  return (
    <MotionFlex w='100%'>
      <Box w='50%'>
        <Flex align='center' justify='center' h='100%'>
          <Image
            w={80}
            h={80}
            src={require('../../../assets/images/congratulatioins.svg').default}
          />
        </Flex>
      </Box>
      <Box w='50%' p={14} pos='relative'>
        <Flex direction='column' align='center' justify='center'>
          <Box textAlign='center' m='auto' mt={6}>
            <Text mb={1} fontSize={22} fontWeight='bold'>
              Confirmation
            </Text>
            <Text color='gray.400' mb={8} fontSize={20}>
              Hurray! you have successfully <br /> made payment to your new farm
            </Text>
          </Box>
          <FarmInfo />
        </Flex>
        <Flex align='center' pos='absolute' bottom={5} left={0} right={0}>
          <Button
            w={64}
            h={12}
            mx={6}
            fontSize='md'
            rounded='30px'
            color='cf.900'
            variant='outline'
            borderColor='cf.900'
            btntitle='View farm receipt'
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
            onClick={() => handleModalClick('receipt')}
          />
          <Button
            w={64}
            h={12}
            fontSize='md'
            rounded='30px'
            btntitle='View farm contract'
            onClick={() => handleModalClick('contract')}
          />
        </Flex>
      </Box>
    </MotionFlex>
  )
}

export default Confirmation
