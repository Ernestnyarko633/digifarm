/* eslint-disable no-console */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useToast,
  Button,
  Box,
  Text,
  Heading,
  Flex,
  Divider,
  Center
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import useApi from 'context/api'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'

const ConfirmSale = ({
  title,
  _width,
  height,
  onClosex,
  isOpenx,
  onClose,
  buyers,
  myFarm
}) => {
  const history = useHistory()
  // const toast = useToast()
  const [modal, setModal] = useState(true)
  const toast = useToast()
  const { sellProduce } = useApi()
  const [loading, setLoading] = React.useState(false)

  const queryClient = useQueryClient()

  const handleKeyPress = e => {
    const key = e.keyCode || e.charCode
    if (key === 13 || e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      // toast({
      //   position: 'top-right',
      //   duration: 9000,
      //   render: () => <Notification amtBought={amtBought} name={name} />
      // })
    }
  }

  const _sellProduce = async (id, payload) => {
    try {
      setLoading(true)
      const res = await sellProduce(id, payload)
      queryClient.invalidateQueries('my_farms')
      toast({
        position: 'top-right',
        isClosable: true,
        title: 'Farm sold successfully',
        description: res?.message,
        status: 'success',
        onCloseComplete: () => {
          queryClient.invalidateQueries('my_farms')
          onClosex()
          history.push('/warehouses', { reload: true })
        },
        duration: 3000
      })
    } catch (error) {
      toast({
        status: 'error',
        duration: 5000,
        position: 'top-right',
        title: 'Error occurred',
        description:
          error?.data?.message || error?.message || 'Something went wrong'
      })
    } finally {
      setLoading(false)
    }
    // onClosex()
  }
  React.useEffect(() => {
    if (!isOpenx) {
      setModal(true)
    }
  }, [isOpenx])

  return (
    <>
      <Modal
        isOpen={isOpenx}
        onClose={onClosex}
        mt={10}
        variant='outline'
        colorScheme='white'
        isCentered
        size='xl'
      >
        <ModalOverlay>
          {modal ? (
            <ModalContent>
              <Flex m={3} justify='center' align='center'>
                <Box ml={10}>
                  <Heading as='h4' fontWeight='bold' fontSize={{ md: 'xl' }}>
                    Confirm your order
                  </Heading>
                </Box>
                <ModalCloseButton />
              </Flex>
              <Divider orientation='horizontal' borderColor='gray.400' />
              <ModalBody p={8}>
                <Box textAlign='center' p={2}>
                  <Text>
                    Payment is only done when produce have been delivered.
                  </Text>
                  <Text>
                    Are you sure you want to sell this crop to this buyer?
                  </Text>
                </Box>
                <Flex my={8} justify='center'>
                  <Button
                    mr={5}
                    onClick={onClosex}
                    rounded='30px'
                    fontWeight='thin'
                    color='cf.green'
                    variant='outline'
                    borderColor='cf.green'
                    w={{ md: '120px' }}
                    bg='white'
                    _hover={{ bg: 'white' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    isLoading={loading}
                    isDisabled={loading}
                    colorScheme='linear'
                    rounded='30px'
                    w={{ md: '120px' }}
                    onKeyPress={handleKeyPress}
                    onClick={
                      () =>
                        _sellProduce(myFarm?._id, {
                          cost:
                            myFarm?.order?.cost +
                            myFarm?.order?.cost *
                              (myFarm?.order?.product
                                ?.projectedMarketReturnsRangePerAcre?.min /
                                100 +
                                buyers?.rate / 100),
                          quantity:
                            myFarm?.order?.acreage *
                            myFarm?.order?.product?.storagePerAcre
                        })
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                  >
                    Sell crop
                  </Button>
                </Flex>
              </ModalBody>
            </ModalContent>
          ) : (
            <ModalContent>
              <Flex m={3} justify='center' align='center'>
                <Box ml={10}>
                  <Heading as='h4' fontWeight='bold' fontSize={{ md: 'xl' }}>
                    Order successful
                  </Heading>
                </Box>
                <ModalCloseButton />
              </Flex>
              <Divider orientation='horizontal' borderColor='gray.400' />
              <ModalBody p={10}>
                <Center>
                  <CheckIcon w={10} h={10} color='cf.green' />
                </Center>
                <Center>
                  <Text pt={4} w='380px' textAlign='center'>
                    Your transaction for produce you sold to buyer is being
                    processed
                  </Text>
                </Center>
                <Center>
                  <Button
                    colorScheme='none'
                    rounded='30px'
                    ml={2}
                    mt={6}
                    onClick={onClosex}
                    borderWidth={1}
                    borderColor='cf.green'
                    w={{ md: '300px' }}
                    h={{ md: '40px' }}
                    color='cf.green'
                    mr={2}
                  >
                    Dismiss
                  </Button>
                </Center>
              </ModalBody>
            </ModalContent>
          )}
        </ModalOverlay>
      </Modal>
    </>
  )
}

ConfirmSale.propTypes = {
  title: PropTypes.string,
  _width: PropTypes.any,
  height: PropTypes.string,
  onClosex: PropTypes.any,
  isOpenx: PropTypes.any,
  onClose: PropTypes.any,
  myFarm: PropTypes.any,
  buyers: PropTypes.any
}

export default ConfirmSale
