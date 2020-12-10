import { Box, Flex, Text } from '@chakra-ui/react'
import FarmInfo from 'components/Cards/FarmInfo'
import { Button } from 'components'
import React from 'react'
// import { BsQuestionCircleFill } from 'react-icons/bs';

const Confirmation = () => (
  <Flex w='100%'>
    <Box w='50%'>Left</Box>
    <Box w='50%'
      borderLeftWidth={1}
      borderLeftColor='gray.300'
      p={20}
      pos='relative'>
      <Flex direction='column' align='center' justify='center'>
        <Box textAlign='center' m='auto' mt={10}>
          <Text mb={1} fontSize={22} fontWeight='bold'>
            Confirmation
          </Text>
          <Text color='gray.400' mb={8} fontSize={20}>
            Hurray! you have successfully <br /> made payment to your new farm
          </Text>
        </Box>
        <FarmInfo />
      </Flex>
      <Flex align='center' pos='absolute' bottom={4} left={0} right={0}>
        <Button btntitle='View farm receipt'
          rounded='30px'
          borderColor='cf.900'
          variant='outline'
          color='cf.900'
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
          w={64}
          h={12}
          mx={6}
          fontSize='md' />
        <Button btntitle='View farm contract'
          rounded='30px'
          w={64}
          h={12}
          fontSize='md' />
      </Flex>
    </Box>
  </Flex>
)

export default Confirmation
