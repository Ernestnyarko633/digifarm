import React from 'react'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import useComponent from 'context/component'
import Vector from 'assets/images/Vector.svg'
import Button from 'components/Button'
import useRollover from 'context/rollover'

const RequestRollover = () => {
  const { onClose, handleModalClick } = useComponent()
  const { handleNext } = useRollover()
  return (
    <Box w='100%'>
      <Flex
        align='center'
        justify='center'
        borderBottomWidth={1}
        borderBottomColor='gray.200'
        px={{ md: 8 }}
        w='100%'
      >
        <Heading
          as='h3'
          textAlign='center'
          align='center'
          fontSize={{ base: 'xl', md: '4xl' }}
          fontWeight={800}
          mb={{ base: 5 }}
        >
          Request for Rollover
        </Heading>
      </Flex>
      <Flex
        w='100%'
        direction='column'
        justify='center'
        align='center'
        pt={{ md: 10 }}
      >
        <Image src={Vector} m={{ base: 10 }} />
        <Text
          w='90%'
          textAlign='center'
          align='center'
          pt={{ md: 10 }}
          my={{ base: 5, md: 0 }}
        >
          We are at the end of the farm cycle. We are at the end of the farm
          cycle. We are at the end of the farm cycle{' '}
        </Text>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          mt={{ md: 16 }}
          justify='center'
          align='center'
          w={{ base: '100%', md: '60%' }}
        >
          <Button
            btntitle='Cancel'
            bg='white'
            borderWidth={1}
            borderColor='gray.400'
            fontWeight={900}
            color='gray.800'
            rounded='30px'
            isDisabled={false}
            mx={{ base: 3, md: 0 }}
            my={{ base: 2, md: 5 }}
            colorScheme='none'
            w='100%'
            h={50}
            _hover={{ bg: 'white' }}
            shadow='none'
            fontSize={{ base: 'sm', xl: 'md' }}
            mr={{ md: 5 }}
            onClick={() => {
              onClose()
            }}
          />

          <Button
            btntitle='Rollover'
            borderColor='cf.green'
            color='white'
            fontWeight={900}
            rounded='30px'
            mx={{ base: 3, md: 0 }}
            my={{ base: 2, md: 5 }}
            w='100%'
            h={50}
            fontSize={{ base: 'sm', xl: 'md' }}
            onClick={() => {
              false && handleModalClick('successmodal')
              handleNext()
            }}
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default RequestRollover
