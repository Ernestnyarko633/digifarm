import React from 'react'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import ModalWrapper from './ModalWrapper'
import useComponent from 'context/component'
import Check from '../../assets/images/check.svg'
import Button from 'components/Button'

const SuccessModal = () => {
  const { isOpen, onClose } = useComponent()
  return (
    <ModalWrapper isCentered isOpen={isOpen} onClose={onClose} size='3xl'>
      <Box w='100%'>
        <Flex
          align='center'
          justify='center'
          borderBottomWidth={1}
          borderBottomColor='gray.200'
          px={{ md: 8 }}
          w='100%'
        >
          <Heading as='h3' fontSize='4xl' fontWeight={800}>
            Success
          </Heading>
        </Flex>
        <Flex
          w='100%'
          direction='column'
          justify='center'
          align='center'
          pt={{ md: 20 }}
        >
          <Image src={Check} />
          <Text w='90%' pt={{ md: 10 }} textAlign='center'>
            Form has been submitted successfully. <br />
            You can update your bank information on your dashboard at anytime.
            You will be contacted by customer support upon submission of this
            form to discuss next steps.
          </Text>
          <Button
            btntitle='Rollover'
            borderColor='cf.green'
            color='white'
            rounded='30px'
            mt={5}
            w='100%'
            h={55}
            fontSize='xl'
            // onClick={() => {
            //   handleModalClick('payout')
            // }}
          />
        </Flex>
      </Box>
    </ModalWrapper>
  )
}

export default SuccessModal
