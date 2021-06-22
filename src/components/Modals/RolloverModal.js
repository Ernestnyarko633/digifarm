import React from 'react'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import ModalWrapper from './ModalWrapper'
import useComponent from 'context/component'
import Vector from '../../assets/images/Vector.svg'
import Button from 'components/Button'

const RolloverModal = () => {
  const { isOpen, onClose, handleModalClick } = useComponent()
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
            Request for Rollover
          </Heading>
        </Flex>
        <Flex
          w='100%'
          direction='column'
          justify='center'
          align='center'
          pt={{ md: 20 }}
        >
          <Image src={Vector} />
          <Text w='90%' pt={{ md: 10 }}>
            We are at the end of the farm cycle. We are at the end of the farm
            cycle. We are at the end of the farm cycle{' '}
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
            onClick={() => {
              handleModalClick('successmodal')
            }}
          />
        </Flex>
      </Box>
    </ModalWrapper>
  )
}

export default RolloverModal
