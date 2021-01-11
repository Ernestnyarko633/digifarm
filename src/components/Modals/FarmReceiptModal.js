import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import Button from 'components/Button'
import FarmInfo from 'components/Cards/FarmInfo'
import useComponent from 'context/component'
import React from 'react'
import ModalWrapper from './ModalWrapper'

const FarmReceiptModal = () => {
  const { isOpen, onClose } = useComponent()
  return (
    <ModalWrapper
      image={require('../../assets/images/logo.png').default}
      isCentered
      alt='Complete Farmer Logo'
      isOpen={isOpen}
      onClose={onClose}
    >
      <Divider orientation='horizontal' my={3} />
      <Heading as='h3' fontSize={{ md: '3xl' }}>
        Farm receipt
      </Heading>
      <Box mb={8}>
        <Text fontWeight='bold'>Description</Text>
        <Divider orientation='horizontal' my={3} />
        <Text fontSize='xs'>
          Here’s a cofirmation of your payment and a receipt for your farm
        </Text>
      </Box>
      <FarmInfo width='100%' margin={0} />

      <Flex align='center' justify='space-between' my={8}>
        <Text fontSize='xs'>Have an issue with your farm receipt?</Text>
        <Button
          btntitle='Contact support'
          fontSize='xs'
          borderWidth={1}
          borderColor='cf.400'
          color='cf.400'
          rounded='30px'
          bg='white'
          h={6}
          w={32}
          _hover={{ bg: 'white' }}
          _active={{ bg: 'white' }}
          shadow='none'
        />
      </Flex>

      <Box w={56} mx='auto' my={6}>
        <Button
          btntitle='Download receipt'
          width='100%'
          h={12}
          mx='auto'
          fontSize='md'
          rounded='30px'
        />
      </Box>
    </ModalWrapper>
  )
}

export default FarmReceiptModal
