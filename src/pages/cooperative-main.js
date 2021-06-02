/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  Text,
  Avatar,
  GridItem,
  Grid,
  Heading,
  Spacer,
  Link
} from '@chakra-ui/react'

import CustomTable from 'components/Form/CustomTable'
import FetchCard from 'components/FetchCard'

import useApi from 'context/api'
import useFetch from 'hooks/useFetch'
import Header from 'container/Header'
import { Button } from 'components'
import { MdDashboard } from 'react-icons/md'
import { BiCreditCard } from 'react-icons/bi'
import { getformattedDate, getFormattedMoney } from 'helpers/misc'
import useAuth from 'context/auth'

const CooperativeMain = ({ location: { state } }) => {
  document.title = 'Dashboard | The GCU Application Portal'
  const [reload, setReload] = useState(0)
  const [tableData, setTableData] = useState([])
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { getCooperativeById } = useApi()
  const { data, isLoading, error } = useFetch(
    null,
    getCooperativeById,
    reload,
    state._id
  )

  const _columns = [
    {
      Header: () => (
        <Text fontSize='16px' fontWeight='bold' color='black'>
          Names
        </Text>
      ),
      accessor: 'info',
      Cell: ({ row }) => (
        <Flex>
          <Avatar
            name={
              row.values.info?.firstName ||
              row.values.info.avatar ||
              'Annonymous'
            }
            size='md'
          />
          <Box pl='12px' pt={1}>
            <Flex>
              <Text fontSize='16px' fontWeight='semibold'>
                {row.values.info?.firstName
                  ? `${
                      row.values.info?.firstName +
                      ' ' +
                      row.values.info?.lastName
                    }`
                  : 'Annonymous'}
              </Text>
              {row.index === 0 && (
                <Box bg='#D6F2D5' rounded='4px' ml='7px'>
                  <Text
                    fontSize='10px'
                    textAlign='center'
                    color='#004C46'
                    py='4px'
                    px='5.5px'
                  >
                    Admin
                  </Text>
                </Box>
              )}
            </Flex>
            <Text fontSize='12px' color='gray.600'>
              {row.values.info?.email || row.original.email}
            </Text>
          </Box>
        </Flex>
      )
    },

    {
      Header: () => (
        <Text fontSize='16px' fontWeight='bold' color='black'>
          Cost
        </Text>
      ),
      accessor: 'cost',
      Cell: ({ row }) => (
        <Text fontWeight='semibold'>
          $
          {getFormattedMoney(
            row.values.acreage *
              data?.product?.pricePerAcre *
              data?.type?.discount
          )}
        </Text>
      )
    },
    {
      Header: () => (
        <Text fontSize='16px' fontWeight='bold' color='black'>
          Acres assigned
        </Text>
      ),
      accessor: 'acreage',
      Cell: ({ row }) => <Text fontWeight='semibold'>{row.values.acreage}</Text>
    },
    {
      Header: () => (
        <Text fontSize='16px' fontWeight='bold' color='black'>
          Status
        </Text>
      ),
      accessor: 'status',
      Cell: ({ row }) => (
        <Box>
          {row.values.status === 'PAID' ? (
            <Box bg='#D6F2D5' w='99px' rounded='4px'>
              <Text fontSize='14px' color='#004C46' textAlign='center' py='4px'>
                {row.values.status}
              </Text>
            </Box>
          ) : (
            <Box bg='#F2F2F2' w='99px' rounded='4px'>
              <Text fontSize='14px' color='#828282' textAlign='center' py='4px'>
                {row.values.status}
              </Text>
            </Box>
          )}
        </Box>
      )
    }
  ]

  React.useEffect(() => {
    if (data?.users?.length) {
      setTableData(data.users || [])
    }
  }, [data])

  const Details = ({ title, subtitle, image, name, variety, cropCode }) => {
    return (
      <Box>
        {image ? (
          <Flex p={3}>
            <Avatar name={name} src={image} size='sm' mt={2} />
            <Box px={3}>
              <Text fontWeight='bold'>{name}</Text>
              <Text fontSize='12px'>
                ( {variety} ) <Text as='span'> #{cropCode}</Text>
              </Text>
            </Box>
          </Flex>
        ) : (
          <Box borderTopWidth={1} borderColor='gray.300'>
            <Flex p={3}>
              <Text fontSize='16px'>{title}: </Text>
              <Text fontSize='16px' fontWeight='bold' ml={2}>
                {subtitle}
              </Text>
            </Flex>
          </Box>
        )}
      </Box>
    )
  }

  Details.propTypes = {
    title: PropTypes.any,
    subtitle: PropTypes.any,
    image: PropTypes.any,
    name: PropTypes.any,
    variety: PropTypes.any,
    cropCode: PropTypes.any
  }

  return (
    <>
      <Header />
      <Box mt={30}>
        <Grid
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(5, 1fr)'
          bg='white'
        >
          <GridItem
            rowSpan={2}
            colSpan={1}
            borderRadius='3px'
            bg='#FAFBFB'
            pt='70px'
            pb='100px'
            h='100%'
          >
            {isLoading || error ? (
              <Box my={60}>
                <FetchCard
                  direction='column'
                  align='center'
                  justify='center'
                  reload={triggerReload}
                  loading={isLoading}
                  error={error}
                  text='loading cooperative info'
                />
              </Box>
            ) : (
              <Box
                w='292px'
                ml='49px'
                mr='25px'
                borderWidth={1}
                borderColor='gray.300'
                rounded='4px'
              >
                <Box bg='#F6F6F6' p='5px'>
                  <Text color='red.300' textAlign='center'>
                    Farm starts:
                    <Text as='span' color='#D0021B' fontWeight='bold' ml={2}>
                      {getformattedDate(data?.product?.startDate)}
                    </Text>
                  </Text>
                </Box>
                <Box
                  p={6}
                  justifyContent='center'
                  borderBottomWidth={1}
                  borderColor='gray.300'
                >
                  <Flex justify='center'>
                    <Box>
                      <Avatar
                        name={data?.name}
                        src={data?.imageUrl}
                        size='xl'
                      />
                    </Box>
                  </Flex>
                  <Text fontWeight='bold' fontSize='24px' textAlign='center'>
                    {data?.name}
                  </Text>
                </Box>
                <Box>
                  <Details
                    image={data?.product?.cropVariety?.crop?.imageUrl}
                    name={data?.product?.cropVariety?.crop?.name}
                    variety={data?.product?.cropVariety?.crop?.sciName}
                    cropCode={data?.product?.name}
                  />
                  <Details
                    title='Location'
                    subtitle={
                      data?.product?.location?.name +
                      ' , ' +
                      data?.product?.location?.state
                    }
                  />
                  <Details
                    title='Cooperative type'
                    subtitle={data?.type?.name?.toUpperCase()}
                  />
                  <Details title='Members' subtitle={data?.users?.length} />
                  <Details title='Acreage' subtitle={data?.product?.acreage} />
                  <Details
                    title='Farm Manager'
                    subtitle={
                      data?.product?.managers[0]?.firstName +
                      ' ' +
                      data?.product?.managers[0]?.lastName
                    }
                  />
                  <Details title='Farm Contract' />
                </Box>
              </Box>
            )}
          </GridItem>
          <GridItem colSpan={4} px='61px' bg='white' pt='70px' h='100%'>
            {isLoading || error ? (
              <FetchCard
                h='60vh'
                align='center'
                justify='center'
                direction='column'
                error={error}
                loading={isLoading}
                reload={triggerReload}
                text='loading cooperative'
              />
            ) : (
              <>
                <Flex borderBottomWidth={1} borderColor='gray.200' py='16px'>
                  <Heading fontSize='24px' ml={5}>
                    Cooperative Overview
                  </Heading>
                  <Spacer />
                  <Flex justify='flex-end'>
                    {/* Not showing payment button for admins */}
                    {user?.email === data?.users[0].email ? null : (
                      <Button
                        btntitle='Pay'
                        colorScheme='linear'
                        width='120px'
                        py='10px'
                        leftIcon={<BiCreditCard size={20} />}
                      />
                    )}
                    <Link href='/dashboard' _hover={{ textDecor: 'none' }}>
                      <Button
                        btntitle='Goto dashboard'
                        colorScheme='transparent'
                        color='gray.600'
                        width='160px'
                        py='10px'
                        ml={3}
                        borderWidth={1}
                        borderColor='gray.300'
                        leftIcon={<MdDashboard size={20} />}
                      />
                    </Link>
                  </Flex>
                </Flex>

                <CustomTable
                  variant='simple'
                  _columns={_columns}
                  _data={tableData}
                />
              </>
            )}
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}

CooperativeMain.propTypes = {
  history: PropTypes.any.isRequired
}

export default CooperativeMain
