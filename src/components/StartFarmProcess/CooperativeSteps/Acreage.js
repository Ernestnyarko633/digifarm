import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { FieldArray, Formik } from 'formik'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Grid, GridItem, Heading, Image, Icon } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/avatar'
import { HiLocationMarker } from 'react-icons/hi'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { BsPlus } from 'react-icons/all'
import useStartFarm from 'context/start-farm'
import Scrollbar from 'react-perfect-scrollbar'

import CooperativeMemberCard from '../../Cards/CooperativeMemberCard'
import Support from '../../Support'

import useAuth from 'context/auth'
import { Button } from '../../index'

import InviteImg from 'assets/images/cooperative/admin.png'

const MotionGrid = motion(Grid)

const Acreage = ({ name, farm, selectedType }) => {
  const {
    barrier,
    cooperativeName,
    coopImg,
    selectedCooperativeType,
    setCooperativeName,
    setInvites,
    acres
  } = useStartFarm()
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const mapKeys = i => i
  const initialValues = {
    users: [
      { email: user.email, acreage: '' },
      { email: '', acreage: '' }
    ]
  }

  useEffect(() => {
    let mounted = true
    if (!cooperativeName && mounted)
      return setCooperativeName(`${user?.lastName}'s Cooperative`)

    return () => (mounted = false)
  }, [cooperativeName, setCooperativeName, user?.lastName])

  return (
    <Formik initialValues={initialValues}>
      {({ values, errors, handleChange, handleBlur, touched }) => (
        <MotionGrid
          templateColumns={{ xl: '45% 55%', '2xl': 'repeat(2, 1fr)' }}
        >
          <GridItem
            borderRightColor='gray.400'
            borderRightWidth={{ md: 1 }}
            px={{ base: 6, md: 20, lg: 10 }}
            borderBottomWidth={{ base: 1, md: 0 }}
            py={{ base: 10, md: 6 }}
          >
            <Scrollbar>
              <Image
                w={{ sm: 95 }}
                h={{ sm: 95 }}
                d={{ base: 'none', lg: 'block' }}
                mx='auto'
                objectFit='scale-down'
                src={InviteImg}
              />
              <Box mt={10}>
                <Support />
              </Box>
            </Scrollbar>
          </GridItem>
          <GridItem
            overflowY='hidden'
            css={{
              direction: 'ltr',
              scrollbarColor: 'rebeccapurple',
              scrollBehavior: 'smooth'
            }}
          >
            <Scrollbar>
              <Box css={{ direction: 'ltr' }} p={{ base: 4, md: 6, lg: 10 }}>
                <Flex
                  d={{ base: 'block', md: 'flex' }}
                  align='center'
                  justify='space-between'
                >
                  <Flex align='center'>
                    <Avatar src={farm?.cropVariety?.imageUrl} />
                    <Box ml={2}>
                      <Heading as='h3' fontSize='xl' textTransform='uppercase'>
                        {farm?.cropVariety?.crop?.name}
                      </Heading>
                      <Text fontSize='xs' textColor='gray.500' mt={-1}>
                        ({farm?.cropVariety?.name}) #{farm?.name}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex align='center' mt={{ base: 6, md: 0 }}>
                    <Avatar
                      src={
                        coopImg
                          ? URL.createObjectURL(coopImg)
                          : require('../../../assets/images/user-avatar.png')
                              .default
                      }
                      size='lg'
                    />
                    <Box ml={2}>
                      <Text fontWeight={700} fontSize={{ md: 'xl' }}>
                        {name}
                      </Text>
                      <Text mt={-2} fontSize='14px'>
                        Created by:{' '}
                        <Text as='span'>
                          {user?.firstName + ' ' + user?.lastName}
                        </Text>
                      </Text>
                    </Box>
                  </Flex>
                </Flex>

                <Flex
                  align={{ md: 'center' }}
                  justify='space-between'
                  borderTopWidth={1}
                  borderBottomWidth={1}
                  borderColor='gray.200'
                  py={3}
                  mt={{ base: 2, md: 4 }}
                  direction={{ base: 'column', md: 'row' }}
                >
                  <Flex align='center' color='gray.500' mt={{ base: 2, md: 0 }}>
                    <Icon as={HiLocationMarker} />
                    <Text fontSize='xs'>
                      {farm?.location?.name}, {farm?.location?.state}
                    </Text>
                  </Flex>

                  <Flex align='center' color='gray.500' mt={{ base: 2, md: 0 }}>
                    <Text fontSize='xs'>
                      Cooperative type:{' '}
                      <Text
                        as='span'
                        textTransform='uppercase'
                        fontWeight={900}
                        color='black'
                      >
                        {selectedType?.name} ({selectedType?.discount * 100}%
                        discount)
                      </Text>
                    </Text>
                  </Flex>
                </Flex>
                <Box my={{ base: 6, md: 10 }}>
                  <Heading as='h4' fontSize={{ md: 'xl' }}>
                    Add Members and their acreage
                  </Heading>
                  <Text color='gray.500' fontSize='sm'>
                    Please invite cooperative members by adding their emails and
                    their respective acreages
                  </Text>
                  <Flex
                    align='center'
                    bg='#E5EDEC'
                    p={3}
                    rounded='md'
                    mt={{ base: 4, md: 5 }}
                    direction='row'
                  >
                    <Box
                      mb={{ base: 40, md: 14 }}
                      pt={{ base: 20, md: 0 }}
                      align='flex-start'
                      justify='flex-start'
                      w='5%'
                    >
                      <Icon
                        color='cf.400'
                        boxSize={5}
                        as={BsFillInfoCircleFill}
                      />
                    </Box>
                    <Flex direction='column' w='95%'>
                      <Box
                        borderBottomWidth={1}
                        borderRightColor='gray.300'
                        w='100%'
                        py={2}
                        pl={2}
                      >
                        <Text color='cf.darkGreen' fontSize='sm'>
                          There should be a <strong color>minimum of 2</strong>{' '}
                          and and{' '}
                          <strong>
                            maximum of {selectedCooperativeType?.maxMember}
                          </strong>{' '}
                          members
                        </Text>
                      </Box>
                      <Box borderRightColor='gray.300' p={2}>
                        <Text color='cf.darkGreen' fontSize='sm'>
                          This cooperative will have to meet the minimum number
                          of acreages for{' '}
                          <strong>{selectedCooperativeType?.name}</strong> which
                          is <strong>{selectedCooperativeType?.minAcre}</strong>{' '}
                          and must not exceed{' '}
                          <strong>{barrier.toFixed(1)}</strong>
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <form>
                    <FieldArray
                      name='users'
                      render={({ push, remove }) => (
                        <>
                          {values?.users?.map((value, i) => (
                            <CooperativeMemberCard
                              farm={farm}
                              acres={acres}
                              isDisabled={i === 0 ? true : false}
                              member={i + 1}
                              errors={errors?.users?.[i]}
                              touched={touched?.users?.[i]}
                              name={`users.${i}.`}
                              values={values?.users}
                              value={value}
                              key={mapKeys(i)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              remove={remove}
                              barrier={barrier}
                              setInvites={setInvites}
                            />
                          ))}
                          <Box mb={10}>
                            <Button
                              btntitle='Add another'
                              leftIcon={<BsPlus />}
                              color='cf.800'
                              borderWidth={1}
                              borderColor='cf.800'
                              bg='transparent'
                              fontSize={{ base: 'sm', '2xl': 'md' }}
                              width={{ md: 32, '2xl': 48 }}
                              _hover={{ bg: 'transparent' }}
                              isDisabled={
                                values.users?.length ===
                                selectedCooperativeType?.maxMember
                              }
                              onClick={() => push({ email: '', acreage: '' })}
                            />
                          </Box>
                        </>
                      )}
                      validateOnChange={false}
                    />
                  </form>
                </Box>
              </Box>
            </Scrollbar>
          </GridItem>
        </MotionGrid>
      )}
    </Formik>
  )
}

Acreage.propTypes = {
  farm: PropTypes.object,
  name: PropTypes.string,
  selectedType: PropTypes.object
}

export default Acreage
