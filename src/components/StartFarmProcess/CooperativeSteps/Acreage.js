import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { FieldArray, Formik } from 'formik'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Grid, GridItem, Heading, Image, Icon } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/avatar'
import { HiLocationMarker } from 'react-icons/hi'
import { BsPlus } from 'react-icons/all'
import useStartFarm from 'context/start-farm'

import CooperativeMemberCard from '../../Cards/CooperativeMemberCard'
import Support from '../../Support'

import useAuth from 'context/auth'
import { Button } from '../../index'

import InviteImg from 'assets/images/invite.svg'

const MotionGrid = motion(Grid)

const Acreage = ({ name, farm, order, selectedType }) => {
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
      { email: user.email, acreage: 0.1 },
      { email: '', acreage: 0.1 }
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
            <Image w='100%' src={InviteImg} />
            <Box mt={10}>
              <Support />
            </Box>
          </GridItem>
          <GridItem
            overflowY='scroll'
            css={{
              direction: 'rtl',
              scrollbarColor: 'rebeccapurple',
              scrollBehavior: 'smooth'
            }}
          >
            <Box css={{ direction: 'ltr' }} p={{ base: 4, md: 6, lg: 10 }}>
              <Flex align='center' justify='space-between'>
                <Flex align='center'>
                  <Avatar src={farm?.cropVariety?.imageUrl} />
                  <Box ml={2}>
                    <Heading as='h3' fontSize='xl' textTransform='uppercase'>
                      {order?.product?.cropVariety?.crop?.name ||
                        farm?.cropVariety?.crop?.name}
                    </Heading>
                    <Text fontSize='xs' textColor='gray.500' mt={-1}>
                      (
                      {order?.product?.cropVariety?.name ||
                        farm?.cropVariety?.name}
                      ) #{order?.product?.name || farm?.name}
                    </Text>
                  </Box>
                </Flex>
                <Flex align='center'>
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
                    <Text
                      fontWeight={700}
                      textTransform='uppercase'
                      fontSize={{ md: 'xl' }}
                    >
                      {selectedType?.name}
                    </Text>
                    <Text mt={-2}>
                      Cooperative name: <Text as='span'>{name}</Text>
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
                      {selectedType?.name} ({selectedType?.discount}% discount)
                    </Text>
                  </Text>
                </Flex>
              </Flex>
              <Box my={{ md: 10 }}>
                <Heading as='h4' fontSize={{ md: 'xl' }}>
                  Add Members and their acreage
                </Heading>
                <Text color='gray.500' fontSize='sm'>
                  Please invite cooperative members by adding their emails and
                  their respective acreages
                </Text>
                <Flex
                  align='center'
                  bg='gray.100'
                  p={3}
                  rounded='md'
                  mt={{ md: 5 }}
                >
                  <Box borderRightWidth={1} pr={8} borderRightColor='gray.300'>
                    <Text color='gray.500' fontSize='sm'>
                      Max Members :{' '}
                      {
                        <Text
                          as='span'
                          fontSize='sm'
                          fontWeight={900}
                          color='black'
                        >
                          {`${selectedCooperativeType?.maxMember}`}
                        </Text>
                      }{' '}
                      <br />
                      Min Members :{' '}
                      <Text
                        as='span'
                        fontSize='sm'
                        fontWeight={900}
                        color='black'
                      >
                        2
                      </Text>
                    </Text>
                  </Box>
                  <Box ml={{ md: 16 }}>
                    <Text
                      fontSize='sm'
                      color={
                        acres >= selectedCooperativeType?.minAcre &&
                        acres <= barrier
                          ? 'cf.400'
                          : acres > barrier
                          ? 'red.500'
                          : 'gray.500'
                      }
                    >
                      Minimum acreage :{' '}
                      <Text
                        fontSize='sm'
                        as='span'
                        fontWeight={900}
                        color={
                          acres >= selectedCooperativeType?.minAcre &&
                          acres <= barrier
                            ? 'cf.400'
                            : acres > barrier
                            ? 'red.500'
                            : 'black'
                        }
                      >
                        {selectedCooperativeType?.minAcre}
                        {/* {`(${selectedCooperativeType?.minAcre})`} */}
                      </Text>
                    </Text>
                    <Text
                      fontSize='sm'
                      color={
                        acres >= selectedCooperativeType?.minAcre &&
                        acres <= barrier
                          ? 'cf.400'
                          : acres > barrier
                          ? 'red.500'
                          : 'gray.500'
                      }
                    >
                      Maximum acreage :{' '}
                      <Text
                        fontSize='sm'
                        as='span'
                        fontWeight={900}
                        color={
                          acres >= selectedCooperativeType?.minAcre &&
                          acres <= barrier
                            ? 'cf.400'
                            : acres > barrier
                            ? 'red.500'
                            : 'black'
                        }
                      >
                        {selectedCooperativeType?.name === 'nation'
                          ? '---'
                          : barrier}
                        {/* {`(${selectedCooperativeType?.minAcre})`} */}
                      </Text>
                    </Text>
                    <Text
                      fontSize='sm'
                      color={
                        acres >= selectedCooperativeType?.minAcre &&
                        acres <= barrier
                          ? 'cf.400'
                          : acres > barrier
                          ? 'red.500'
                          : 'gray.500'
                      }
                    >
                      Cooperative total acreage :{' '}
                      <Text
                        fontSize='sm'
                        as='span'
                        fontWeight={900}
                        color={
                          acres >= selectedCooperativeType?.minAcre &&
                          acres <= barrier
                            ? 'cf.400'
                            : acres > barrier
                            ? 'red.500'
                            : 'black'
                        }
                      >
                        {acres?.toFixed(1)}{' '}
                        {/* {`(${selectedCooperativeType?.minAcre})`} */}
                      </Text>
                    </Text>
                  </Box>
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
                            onClick={() => push({ email: '', acreage: 0.1 })}
                          />
                        </Box>
                      </>
                    )}
                    validateOnChange={false}
                  />
                </form>
              </Box>
            </Box>
          </GridItem>
        </MotionGrid>
      )}
    </Formik>
  )
}

Acreage.propTypes = {
  farm: PropTypes.object,
  name: PropTypes.string,
  order: PropTypes.object,
  selectedType: PropTypes.object
}

export default Acreage
