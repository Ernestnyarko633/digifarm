/* eslint-disable no-unused-vars */
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
  Link,
  useToast,
  useDisclosure
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
import Payment from 'components/Cards/CooperativeDashboard/Payment'
import CompleteOrderModal from 'components/Modals/CompleteOrderModal'
import { saveAs } from 'file-saver'
import CooperativeCard from 'components/Cards/CooperativeDashboard/CooperativeCard'

const CooperativeMain = ({ location: { state }, match: { params } }) => {
  document.title = 'Cooperative Dashboard'
  //states
  const [reload, setReload] = useState(0)
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  //hooks
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { modal, handleModalClick } = useComponent()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { getCooperativeById, downloadFile } = useApi()
  const { data, isLoading, error } = useFetch(
    null,
    getCooperativeById,
    reload,
    params.id
  )

  const downloadAgreement = async query => {
    try {
      setLoading(true)
      const res = await downloadFile('orders', query)
      toast({
        title: 'Download starting',
        status: 'success',
        duration: 2000,
        position: 'top-right'
      })
      let blob = new Blob([res.data], {
        type: 'application/pdf;charset=utf-8'
      })
      saveAs(blob, `${query.reference}-agreement.pdf`)
    } catch (error) {
      toast({
        title: 'Download failed',
        description:
          error?.message || error?.data?.message || 'Unexpected error.',
        status: 'error',
        duration: 5000,
        position: 'top-right'
      })
    } finally {
      setLoading(false)
    }
  }
  const userData = data?.users?.filter(item => {
    return item?.id === user._id
  })

  const getModal = val => {
    if (val === 'payment') {
      return (
        <Payment onOpen={onOpen} data={userData?.[0]?.order} order={data} />
      )
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
                <Text
                  fontSize='12px'
                  textAlign='center'
                  px='5px'
                  color='#31BC2E'
                >
                  Admin
                </Text>
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
            row.values.acreage * data?.product?.pricePerAcre -
              data?.product?.pricePerAcre * data?.type?.discount
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
          {row.values.status === 'PAID' || (
            <>
              {row?.original?.order?.status === 'PENDING' ? (
                <>
                  {row.original.email === user?.email && (
                    <Button
                      btntitle='Pay'
                      colorScheme='linear'
                      width='100px'
                      py='10px'
                      leftIcon={<BiCreditCard size={20} />}
                      onClick={() => {
                        handleModalClick('payment')
                      }}
                    />
                  )}
                </>
              ) : null}
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
      <Header />
      <CompleteOrderModal
        call={triggerReload}
        isOpen={isOpen}
        onClose={onClose}
      />
      {getModal(modal)}
      <Box
        pt={30}
        bg='white'
        minH={{ base: '100vh', md: 'calc(100vh - 4rem)' }}
      >
        <Grid templateColumns='repeat(5, 1fr)' bg='white'>
          <GridItem
            rowSpan={2}
            colSpan={1}
            bg='#FAFBFB'
            pt='70px'
            h='100vh'
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
              <SideMenu
                data={data}
                border={1}
                bg='#F6F6F6'
                ml='49px'
                loading={loading}
                click={() => {
                  return downloadAgreement({
                    reference: userData?.[0]?.order?.reference,
                    type: 'agreement'
                  })
                }}
              />
            )}
          </GridItem>
          <GridItem
            colSpan={{ base: 5, lg: 4 }}
            px={{ xl: 12 }}
            pt={{ base: 12, xl: 20 }}
            h={{ md: '100vh' }}
          >
            {isLoading || error ? (
              <FetchCard
                h='100vh'
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
                  px={{ base: 4 }}
                >
                  <SideBar data={data} />

                  <Heading
                    fontSize={{ base: 16, xl: 16 }}
                    ml={5}
                    pt={{ md: 2 }}
                  >
                    Cooperative Overview
                  </Heading>
                  <Spacer />
                  <Flex justify='flex-end'>
                    <Link href='/dashboard' _hover={{ textDecor: 'none' }}>
                      <Button
                        btntitle='Goto dashboard'
                        colorScheme='transparent'
                        color='gray.600'
                        width='140px'
                        py='10px'
                        ml={3}
                        borderWidth={1}
                        borderColor='gray.300'
                        leftIcon={<MdDashboard size={20} />}
                      />
                    </Link>
                  </Flex>
                </Flex>
                <Box d={{ base: 'none', md: 'block', xl: 'block' }}>
                  <CustomTable
                    variant='simple'
                    _columns={_columns}
                    _data={tableData}
                  />
                </Box>
                <Box d={{ base: 'block', md: 'none' }} px={4} pb='50px'>
                  {tableData?.map(item => (
                    <Box key={item?._id}>
                      <CooperativeCard
                        item={item}
                        // orderType={filteredProcessingOrder}
                        data={data}
                        handleClick={() => handleModalClick('payment')}
                      />
                    </Box>
                  ))}
                </Box>
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
