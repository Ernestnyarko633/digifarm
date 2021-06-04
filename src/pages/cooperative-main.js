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
import { getFormattedMoney } from 'helpers/misc'
import SideBar from 'components/Cards/CooperativeDashboard/SideBar'
import SideMenu from 'components/Cards/CooperativeDashboard/SideMenu'
import useAuth from 'context/auth'
import useComponent from 'context/component'
// import FarmCard from 'components/Cards/FarmCard'
import Payment from 'components/Cards/CooperativeDashboard/Payment'

const CooperativeMain = ({ location: { state } }) => {
  document.title = 'Cooperative Dashboard'
  const [reload, setReload] = useState(0)

  const [tableData, setTableData] = useState([])

  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { modal, handleModalClick, onOpen } = useComponent()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { getCooperativeById } = useApi()
  const { data, isLoading, error } = useFetch(
    null,
    getCooperativeById,
    reload,
    state._id
  )

  const getModal = val => {
    if (val === 'farmCard') {
      return <Payment data={data} onOpen={onOpen} />
    } else return null
  }

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
    },
    {
      Header: '',
      accessor: 'payment',
      Cell: ({ row }) => (
        <>
          {row.values.status === 'PENDING' && (
            <>
              {row.original.email === user?.email && (
                <Button
                  btntitle='Pay'
                  colorScheme='linear'
                  width='120px'
                  py='10px'
                  disabled
                  leftIcon={<BiCreditCard size={20} />}
                  onClick={() => {
                    handleModalClick('farmCard')
                  }}
                />
              )}
            </>
          )}
        </>
      )
    }
  ]

  React.useEffect(() => {
    if (data?.users?.length) {
      setTableData(data.users || [])
    }
  }, [data])

  return (
    <>
      {getModal(modal)}
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
            bg='#FAFBFB'
            pt='70px'
            display={{ base: 'none', lg: 'block' }}
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
              <SideMenu data={data} border={1} bg='#F6F6F6' ml='49px' />
            )}
          </GridItem>
          <GridItem
            colSpan={{ base: 5, lg: 4 }}
            px='30px'
            bg='white'
            pt='70px'
            h='100%'
          >
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
                <Flex
                  borderBottomWidth={1}
                  borderColor='gray.200'
                  py='16px'
                  w='100%'
                >
                  <SideBar data={data} />

                  <Heading fontSize='24px' ml={5}>
                    Cooperative Overview
                  </Heading>
                  <Spacer />
                  <Flex justify='flex-end'>
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
  location: PropTypes.any.isRequired
}

export default CooperativeMain
