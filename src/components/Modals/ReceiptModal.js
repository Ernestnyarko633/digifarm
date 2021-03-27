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
import useComponent from 'context/component'
import Logo from 'assets/images/white.png'

const ReceiptModal = () => {
  const { isOpen, onClose } = useComponent()
  return (
    <ModalWrapper isCentered isOpen={isOpen} onClose={onClose} size='3xl'>
      <Box w='100%'>
        <Box w='100%'>
          {/*Header */}
          <Flex
            align='center'
            justify='center'
            bg='cf.400'
            borderBottomWidth={{ md: '1px' }}
            borderBottomColor={{ md: 'white' }}
          >
            <Flex py={{ md: 5 }} h={{ md: 100 }} direction='row'>
              <Image src={Logo} boxSize={10} />
            </Flex>
          </Flex>
          <Flex align='center' justify='center' bg='cf.400'>
            <Heading as='h6' py={{ md: 5 }}>
              [Task] Receipt
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
                    <Td>millimetres (mm)</Td>
                  </Tr>
                  <Tr>
                    <Td>Farm name</Td>
                    <Td>centimetres (cm)</Td>
                  </Tr>
                  <Tr>
                    <Td>Digital farmer</Td>
                    <Td>metres (m)</Td>
                  </Tr>
                  <Tr>
                    <Td>Activity</Td>
                    <Td>metres (m)</Td>
                  </Tr>
                  <Tr>
                    <Td>Resources</Td>
                    <Td>metres (m)</Td>
                  </Tr>
                  <Tr>
                    <Td>Farm Manager Signature</Td>
                    <Td>metres (m)</Td>
                  </Tr>
                  <Tr>
                    <Td>Tax/VAT</Td>
                    <Td>metres (m)</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Total cost</Th>
                    <Th>into</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </Box>
          </Box>
          {/*Footer */}
          <Flex align='center' justify='space-between' bg='cf.400' w='100%'>
            <Flex w='50%' py={{ md: 5 }} pl={{ md: 5 }}>
              <Text color='white'>
                19 Banana Street, Ambassadorial <br />
                Enclave, Eat Legon-Accra, <br />
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

export default ReceiptModal
