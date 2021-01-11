import { Box, Flex, Image, Text } from '@chakra-ui/react'
import FarmInfo from 'components/Cards/FarmInfo'
import { Button } from 'components'
import React from 'react'
import useComponent from 'context/component'
import { motion } from 'framer-motion'
// import { BsQuestionCircleFill } from 'react-icons/bs';

const MotionFlex = motion.custom(Flex)

const Confirmation = () => {
  const { handleModalClick } = useComponent()
  return (
    <MotionFlex layout w='100%'>
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
            btntitle='View farm receipt'
            rounded='30px'
            borderColor='cf.900'
            variant='outline'
            color='cf.900'
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
            w={64}
            h={12}
            mx={6}
            fontSize='md'
            onClick={() => handleModalClick('receipt')}
          />
          <Button
            btntitle='View farm contract'
            rounded='30px'
            w={64}
            h={12}
            fontSize='md'
            onClick={() => handleModalClick('contract')}
          />
        </Flex>
      </Box>
    </MotionFlex>
  )
}

export default Confirmation
