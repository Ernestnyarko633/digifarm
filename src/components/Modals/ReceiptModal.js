import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Th,
  Tfoot
} from '@chakra-ui/react'
import ModalWrapper from './ModalWrapper'

import Logo from 'assets/images/logo.png'
import PropTypes from 'prop-types'

const ReceiptModal = ({ open, onClose, data }) => {
  return (
    <ModalWrapper isCentered isOpen={open} onClose={onClose} size='3xl'>
      <Box w='100%'>
        <Box w='100%'>
          <Flex
            align='center'
            justify='center'
            bg='cf.green'
            borderBottomWidth={{ md: '1px' }}
            borderBottomColor={{ md: 'white' }}
          >
            <Flex py={{ md: 5 }} h={{ md: 100 }} direction='row'>
              <Image src={Logo} boxSize={10} />
            </Flex>
          </Flex>
          <Flex align='center' justify='center' bg='cf.green'>
            <Heading as='h6' py={{ md: 5 }} color='white'>
              [{data?.data?.task?.title}] Receipt
            </Heading>
          </Flex>
          <Box w='100%' p={{ md: 10 }}>
            <Box
              w='100'
              borderWidth={{ md: '1px' }}
              borderTopRadius={{ md: 12 }}
              borderBottomRadius={{ md: 12 }}
              borderColor='gray.300'
            >
              <Table variant='simple' w='100%'>
                <Thead bg='gray.300'>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Value</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Task date</Td>
                    <Td>{data?.date}</Td>
                  </Tr>
                  <Tr>
                    <Td>Farm name</Td>
                    <Td>{data?.data?.farm?.name}</Td>
                  </Tr>
                  <Tr>
                    <Td>Digital farmer</Td>
                    <Td>{data?.data?.digitalFarmer}</Td>
                  </Tr>
                  <Tr>
                    <Td>Activity</Td>
                    <Td>{data?.data?.activity?.title}</Td>
                  </Tr>
                  <Tr>
                    <Td>Farm Manager Signature</Td>
                    <Td>
                      {data?.data?.managerSignature === 'no signature'
                        ? '---'
                        : data?.data?.managerSignature}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Tax/VAT</Td>
                    <Td>0.05</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Total cost</Th>
                    <Th>{data?.data?.cost}</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </Box>
          </Box>
          <Flex align='center' justify='space-between' bg='cf.green' w='100%'>
            <Flex w='50%' py={{ md: 5 }} pl={{ md: 5 }}>
              <Text color='white'>
                No. 3, Abeasi Street <br />
                East Legon-Accra, <br />
                Ghana
              </Text>
            </Flex>
            <Flex w='50%' pl={{ md: 20 }}>
              <Text color='white'>
                www.completefarmer.com <br />
                info@completefarmer.com <br />
                +233 201 467190
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </ModalWrapper>
  )
}

ReceiptModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.object
}
export default ReceiptModal
