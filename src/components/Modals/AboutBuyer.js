import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Text,
  Heading,
  Flex,
  Divider,
  Grid,
  Avatar,
  Icon
} from '@chakra-ui/react'

import { FaMapMarkerAlt } from 'react-icons/fa'
import ConfirmSale from 'components/Modals/ConfirmSale'

const AboutBuyer = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  // const { modal, setModal } = useState(true)
  const [isOpened, setOpened] = React.useState(false)

  const onOpenx = () => {
    setOpened(true)
  }

  const onClosex = () => {
    setOpened(false)
  }

  return (
    <>
      <Button
        colorScheme='none'
        rounded='30px'
        ml={2}
        mt={4}
        onClick={onOpen}
        borderWidth={1}
        borderColor='cf.400'
        color='cf.400'
        mr={2}
      >
        About Buyer
      </Button>
      <ConfirmSale
        onClick={onOpenx}
        onClose={onClose}
        isOpenx={isOpened}
        onClosex={onClosex}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        mt={10}
        variant='outline'
        borderColor='black'
        borderWidth={5}
        colorScheme='white'
        isCentered
        size='6xl'
      >
        <ModalOverlay />
        <ModalContent>
          {' '}
          <Flex m={3} justify='center' align='center'>
            <Box ml={10}>
              <Heading as='h4' fontWeight='bold' fontSize={{ md: 'xl' }}>
                About buyer
              </Heading>
            </Box>
            <ModalCloseButton />
          </Flex>
          <Divider orientation='horizontal' borderColor='gray.400' />
          <ModalBody>
            <Grid p={8} templateColumns='50% 50%'>
              <Flex align='center' justify='center' height='50%'>
                <Avatar mt={35} boxSize={80} name='Kimberly Emmanuella' />
              </Flex>
              <Box>
                <Box>
                  <Heading fontSize='36px'>John Clinton</Heading>
                  <Flex py={2}>
                    <Icon
                      as={FaMapMarkerAlt}
                      color='gray.400'
                      pr={2}
                      w={5}
                      h={5}
                      pt={1}
                    />
                    <Text fontSize='18px'> Waterloo, London</Text>
                  </Flex>
                </Box>
                <Box
                  borderWidth={1}
                  bgColor='none'
                  borderColor='gray.400'
                  borderRadius='5px'
                  p={4}
                  w={{ md: 110 }}
                >
                  <Heading fontSize='18px'>Clinton Limited</Heading>
                  <Text fontSize='14px' pb={4}>
                    London, England
                  </Text>
                  <hr />
                  <Heading fontSize='18px' pt={2}>
                    Company description
                  </Heading>
                  <Text fontSize='14px'>
                    Sandy loam soil is one of the most preferable types of soil
                    for many types of plants.Planting in loam soil with a high
                    percentage of sand is the same as planting in normal loam
                    soil, but extra amendments may be made to compensate for
                    slightly lower water
                  </Text>
                </Box>
                <Box
                  borderWidth={1}
                  bgColor='none'
                  borderColor='gray.400'
                  borderRadius='5px'
                  p={4}
                  mt={6}
                  w={{ md: 110 }}
                  h={{ md: 60 }}
                >
                  <Heading fontSize='18px'>Need</Heading>
                  <Flex pb={4} justifyContent='space-between'>
                    <Text fontSize='14px'>Soya Beans | 100 tonnes</Text>
                    <Text color='cf.400' fontSize='16px' fontWeight={600}>
                      $10,000 - $20,000
                    </Text>
                  </Flex>
                  <hr />
                  <Heading fontSize='18px' pt={2}>
                    Description
                  </Heading>
                  <Text fontSize='14px'>Soya Beans | 100 tonnes</Text>
                  <Text p={1} fontSize='14px'>
                    Sandy loam soil is one of the most preferable types of soil
                    for many types of plants.Planting in loam soil with a high
                    percentage of sand is the same as planting in normal loam
                    soil, but extra amendments may be made to compensate for
                    slightly lower water
                  </Text>
                </Box>
                <Box
                  borderWidth={1}
                  bgColor='none'
                  borderColor='gray.400'
                  borderRadius='5px'
                  p={4}
                  mt={6}
                  w={{ md: 110 }}
                  h={{ md: 60 }}
                >
                  <Heading fontSize='18px' pb={4}>
                    Incoterm
                  </Heading>

                  <hr />

                  <Heading fontSize='18px' pt={2}>
                    FAC
                  </Heading>
                  <Text p={1} fontSize='14px'>
                    Sandy loam soil is one of the most preferable types of soil
                    for many types of plants.Planting in loam soil with a high
                    percentage of sand is the same as planting in normal loam
                    soil, but extra amendments may be made to compensate for
                    slightly lower water
                  </Text>
                </Box>
                <Flex>
                  <Button
                    mt={4}
                    colorScheme='linear'
                    rounded='30px'
                    fontSize='xs'
                    width={{ md: '240px' }}
                    h={{ md: '60px' }}
                    onClick={onOpenx}
                  >
                    Sell to buyer
                  </Button>
                  <Button
                    colorScheme='none'
                    rounded='30px'
                    ml={2}
                    mt={4}
                    onClick={onClose}
                    borderWidth={1}
                    borderColor='black'
                    w={{ md: '240px' }}
                    h={{ md: '60px' }}
                    color='black'
                    mr={2}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Box>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AboutBuyer
