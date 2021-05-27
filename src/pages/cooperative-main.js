/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  Checkbox,
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

const CooperativeMain = ({ location: { state } }) => {
  document.title = 'Dashboard | The GCU Application Portal'
  const [checkedItems, setCheckedItems] = useState(null)
  //   const [filterKey] = useState('')
  const [reload, setReload] = useState(0)
  const [, setInitialTableData] = useState([])
  const [tableData, setTableData] = useState([])

  const { getCooperativeById } = useApi()
  const { data, isLoading, error } = useFetch(
    null,
    getCooperativeById,
    reload,
    state._id
  )

  const triggerReload = () => setReload(prevState => prevState + 1)

  const allChecked = checkedItems?.every(e => e?.checked === true)
  const isIndeterminate =
    checkedItems?.some(e => e.checked === true) && !allChecked

  //   const handleSearch = event => {
  //     let value = event.target.value ? event.target.value : ''
  //     value = value.trim().toLowerCase()
  //     let filtered = []
  //     if (value) {
  //       filtered = initialTableData.filter(item => {
  //         const columnData = item[filterKey]?.toLowerCase()
  //         return !!columnData?.match(new RegExp(value, 'i'))
  //       })
  //     } else {
  //       filtered = JSON.parse(JSON.stringify(initialTableData))
  //     }
  //     setTableData(filtered)
  //   }

  //   const selectedItems = checkedItems?.filter(e => e.checked === true)

  const _columns = [
    {
      Header: ({ data }) => (
        <Flex w='100%' justify='center'>
          <Checkbox
            colorScheme='gcuButton'
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={event => {
              const checked = data.map(e => ({
                _id: e._id,
                checked: event.target.checked
              }))
              setCheckedItems(checked)
            }}
          />
        </Flex>
      ),
      accessor: '_id',
      Cell: ({ row }) => (
        <Flex w='100%' justify='center'>
          <Checkbox
            colorScheme='gcuButton'
            isChecked={
              checkedItems?.find(e => e._id === row.original._id)?.checked ||
              false
            }
            id={row.original._id}
            onChange={event => {
              let newCheckItems = []
              if (checkedItems) {
                newCheckItems = checkedItems.filter(
                  e => e._id !== row.original._id
                )
              }
              setCheckedItems([
                ...newCheckItems,
                { _id: row.original._id, checked: event.target.checked }
              ])
            }}
          />
        </Flex>
      )
    },
    {
      Header: 'Full Name',
      id: 'fullName',
      accessor: row => row.firstName + ' ' + row.lastName
    },
    {
      Header: 'Email address',
      accessor: 'email'
    }
  ]

  //   const filterOpts = [
  //     { name: 'Application Code', value: 'code' },
  //     { name: 'Phone Number', value: 'phoneNumber' },
  //     { name: 'Email', value: 'email' },
  //     { name: 'First Name', value: 'firstName' },
  //     { name: 'Last Name', value: 'lastName' }
  //   ]

  React.useEffect(() => {
    if (data?.length) {
      const checked = data.map(e => ({
        _id: e._id,
        checked: false
      }))
      setCheckedItems(checked)
      setInitialTableData(data || [])
      setTableData(data || [])
    }
  }, [data])

  const date = () => {
    const date = new Date(data?.product?.startDate)
    return date.toLocaleDateString('en-GB')
  }

  const Details = ({ title, subtitle, image, name, variety, cropCode }) => {
    return (
      <Box borderBottomWidth={1} borderColor='gray.300'>
        {image ? (
          <Flex p={3}>
            <Avatar name={image} size='sm' mt={2} />
            <Box px={3}>
              <Text fontWeight='bold'>{name}</Text>
              <Text fontSize='12px'>
                ( {variety} ) <Text as='span'> #{cropCode}</Text>
              </Text>
            </Box>
          </Flex>
        ) : (
          <Box>
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
    <Box>
      {isLoading || error ? (
        <Box my={60}>
          <FetchCard
            direction='column'
            align='center'
            justify='center'
            reload={triggerReload}
            loading={isLoading}
            error={error}
            text='loading cooperative...'
          />
        </Box>
      ) : (
        <Box bg='white'>
          <Header />
          <Box mt={36}>
            <Grid
              templateRows='repeat(2, 1fr)'
              templateColumns='repeat(5, 1fr)'
              gap={4}
              p='41px'
            >
              <GridItem
                rowSpan={2}
                colSpan={1}
                w='294px'
                borderRadius='3px'
                borderWidth={1}
                borderColor='gray.400'
              >
                <Box bg='#F8F8F8' p='5px'>
                  <Text color='red.200' textAlign='center'>
                    Farm starts:
                    <Text as='span' color='#D0021B' fontWeight='bold' ml={2}>
                      {date()}
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
                    <Avatar name={data?.name} size='xl' />
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
                  <Details title='Price' />
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
              </GridItem>
              <GridItem colSpan={4}>
                <Box w='100%' bg='white' rounded='md'>
                  {isLoading || error ? (
                    <FetchCard
                      h='60vh'
                      align='center'
                      justify='center'
                      direction='column'
                      error={error}
                      loading={isLoading}
                      reload={triggerReload}
                      text='Loading'
                    />
                  ) : (
                    <>
                      <Flex
                        ml='88px'
                        borderBottomWidth={1}
                        borderColor='gray.300'
                        py={2}
                      >
                        <Heading fontSize='24px'>Cooperative Overview</Heading>
                        <Spacer />
                        <Flex justify='flex-end'>
                          <Button
                            btntitle='Pay'
                            colorScheme='linear'
                            width='140px'
                            py='10px'
                            leftIcon={<BiCreditCard size={20} />}
                          />
                          <Link href='/dahboard' _hover={{ textDecor: 'none' }}>
                            <Button
                              btntitle='Goto dashboard'
                              colorScheme='transparent'
                              color='gray.400'
                              width='180px'
                              py='10px'
                              ml={3}
                              borderWidth={1}
                              borderColor='gray.400'
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
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  )
}

CooperativeMain.propTypes = {
  history: PropTypes.any.isRequired
}

export default CooperativeMain
