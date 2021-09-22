/* eslint-disable no-console */
import React, { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Text
} from '@chakra-ui/react'

import { AnimatePresence, motion } from 'framer-motion'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import AddressUpload from './AddressUpload'
import IdentityUpload from './IdentityUpload'
import useAuth from 'context/auth'
import { BiHourglass } from 'react-icons/bi'
import { GiCancel, GiCheckMark } from 'react-icons/gi'
import { IoMdClose } from 'react-icons/io'

const ProfileIdentity = () => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()

  console.log(user, 'user')
  const MotionBox = motion(Box)
  const [identityFile, setIdentityFile] = useState(false)
  const [addressFile, setAddressFile] = useState(false)

  const pendingIdentity = user?.proofOfIdentity?.status === 'PENDING'
  const approvedIdentity = user?.proofOfIdentity?.status === 'APPROVED'
  const disapprovedIdentity = user?.proofOfIdentity?.status === 'DISAPPROVED'

  const pendingAddress = user?.proofOfAddress?.status === 'PENDING'
  const approvedAddress = user?.proofOfAddress?.status === 'APPROVED'
  const disapprovedAddress = user?.proofOfAddress?.status === 'DISAPPROVED'

  return (
    <Box
      rounded='xl'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      bg='white'
      p={{ base: 2, md: 10 }}
      mt={12}
    >
      <Box m={10}>
        <Heading as='h4' fontSize={{ base: 'xl', md: '3xl' }} mb={4}>
          Identity Verification
        </Heading>

        <Box>
          <Text mb={4} fontWeight={500} fontSize='lg'>
            Proof of Identity
            <Box as='span' fontSize='sm' ml={1} color='gray.400'>
              (passport or national ID)
            </Box>
          </Text>
          {pendingIdentity ? (
            <Flex align='center' color='#F6AD55'>
              <Icon as={BiHourglass} />
              <Text ml={2}>Identity file uploaded- awaiting verification</Text>
            </Flex>
          ) : disapprovedIdentity ? (
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify='space-between'
              align='center'
              color='red'
            >
              <Flex align='center'>
                <Icon as={GiCancel} />
                <Text ml={2}>Identity file disapproved</Text>
              </Flex>
              <Button
                mt={{ base: 4, md: 'inherit' }}
                shadow='sm'
                rounded='30px'
                colorScheme='linear'
                leftIcon={
                  identityFile === false ? (
                    <AiOutlineCloudUpload />
                  ) : (
                    <IoMdClose />
                  )
                }
                onClick={() => setIdentityFile(!identityFile)}
              >
                {identityFile === false ? 'Add File' : 'Close'}
              </Button>
            </Flex>
          ) : approvedIdentity ? (
            <Flex align='center' color='cf.green'>
              <Icon as={GiCheckMark} />
              <Text ml={2}>Identity file successfully uploaded</Text>
            </Flex>
          ) : (
            <Button
              shadow='sm'
              rounded='30px'
              colorScheme='linear'
              leftIcon={
                identityFile === false ? (
                  <AiOutlineCloudUpload />
                ) : (
                  <IoMdClose />
                )
              }
              onClick={() => setIdentityFile(!identityFile)}
            >
              {identityFile === false ? 'Add File' : 'Close'}
            </Button>
          )}

          <Box mt={4}>
            <AnimatePresence>
              {identityFile && (
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.3 }
                  }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
                >
                  <IdentityUpload />
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>
        </Box>
        <Divider orientation='horizontal' mt={6} />
        <Box mt={6}>
          <Text mb={4} fontWeight={500} fontSize='lg'>
            Proof of Address
            <Box as='span' fontSize='sm' ml={1} color='gray.400'>
              (any document with residential address)
            </Box>
          </Text>
          {pendingAddress ? (
            <Flex align='center' color='#F6AD55'>
              <Icon as={BiHourglass} />
              <Text ml={2}>Address file uploaded- awaiting verification</Text>
            </Flex>
          ) : disapprovedAddress ? (
            <Flex justify='space-between' align='center' color='red'>
              <Box>
                <Icon as={GiCancel} />
                <Text ml={2}>Address file disapproved</Text>
              </Box>
              <Button
                shadow='sm'
                rounded='30px'
                colorScheme='linear'
                leftIcon={
                  addressFile === false ? (
                    <AiOutlineCloudUpload />
                  ) : (
                    <IoMdClose />
                  )
                }
                onClick={() => setAddressFile(!addressFile)}
                _focus={{ outline: 'none' }}
              >
                {addressFile === false ? 'Add File' : 'Close'}
              </Button>
            </Flex>
          ) : approvedAddress ? (
            <Flex align='center' color='cf.green'>
              <Icon as={GiCheckMark} />
              <Text ml={2}>Address file successfully uploaded</Text>
            </Flex>
          ) : (
            <Button
              shadow='sm'
              rounded='30px'
              colorScheme='linear'
              leftIcon={
                addressFile === false ? <AiOutlineCloudUpload /> : <IoMdClose />
              }
              onClick={() => setAddressFile(!addressFile)}
              _focus={{ outline: 'none' }}
            >
              {addressFile === false ? 'Add File' : 'Close'}
            </Button>
          )}

          <Box mt={4}>
            <AnimatePresence>
              {addressFile && (
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.3 }
                  }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
                >
                  <AddressUpload />
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileIdentity
