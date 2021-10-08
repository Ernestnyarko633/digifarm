import React, { useEffect } from 'react'
import { Box, Flex, Heading, Link, useToast } from '@chakra-ui/react'
import { Link as ReachRouter } from 'react-router-dom'
import useStartFarm from 'context/start-farm'
import useApi from 'context/api'
import Tabs from 'components/Tabs/Tabs'
import FetchCard from 'components/FetchCard'
import FarmDetails from './FarmDetails'
import { Button } from '../../index'
import { useQuery } from 'react-query'

const CropSelection = () => {
  const gridRef = React.useRef(false)
  const { handleNext, selectedCooperativeType, selectedFarm } = useStartFarm()

  const { getCropCategories } = useApi()
  const toast = useToast()

  const { data, isLoading, error, refetch } = useQuery('categories', () =>
    getCropCategories()
  )
  const triggerReload = () => refetch()

  let categories = []

  if (data?.data) {
    categories = [{ _id: 'defualt', title: 'Top-selling farms' }, ...data?.data]
  }

  const type = sessionStorage.getItem('type')

  const cooperativeBoolean =
    type === 'cooperative'
      ? selectedCooperativeType?.minAcre > selectedFarm?.acreage
      : false

  const acreage =
    type === 'cooperative'
      ? selectedFarm?.acreage === 0
      : Math.floor(selectedFarm?.acreage) === 0

  useEffect(() => {
    let mounted = true

    if (mounted && !isLoading && cooperativeBoolean && gridRef) {
      toast({
        title: 'Insufficient farm acres',
        description: `The number of acres available on the platform for the entire  ${selectedFarm?.cropVariety?.crop?.name} Farm is insufficient to meet the  ${selectedCooperativeType?.name}'s basic requirements`,
        status: 'error',
        duration: 10000,
        position: 'top-right'
      })
    }

    return () => (mounted = false)
  }, [
    isLoading,
    selectedCooperativeType?.name,
    selectedFarm?.cropVariety?.crop?.name,
    toast,
    cooperativeBoolean,
    selectedFarm?.pricePerAcre
  ])

  let disableButton =
    cooperativeBoolean || acreage || !selectedFarm || isLoading || error

  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      w={{ base: '100%', md: '80%' }}
      mx='auto'
      h={{ base: '100%', sm: 'calc(100vh - 5rem)' }}
      pb={{ base: 0 }}
      px={{ base: 0, md: 0 }}
    >
      {
        <Box textAlign='center' py={10}>
          <Heading as='h4' fontSize={{ base: 'lg', md: '2xl' }}>
            Choose the crop you want to farm
          </Heading>
        </Box>
      }
      {isLoading || error ? (
        <FetchCard
          w='100%'
          mx='auto'
          align='center'
          justify='center'
          direction='column'
          error={error}
          loading={isLoading}
          reload={triggerReload}
        />
      ) : (
        <>
          <Box pos='relative'>
            <Tabs
              py='0'
              px='0'
              boxWidth='100%'
              direction={{ base: 'column', md: 'row' }}
              display={{ base: 'flex', md: 'block' }}
              width={{ base: 85, md: 'initial' }}
            >
              {categories?.map(cat => (
                <Box key={cat._id} label={cat.title}>
                  <FarmDetails
                    gridRef={gridRef}
                    catName={cat.title}
                    query={
                      cat._id !== 'defualt' && { category: cat._id, status: 1 }
                    }
                  />
                </Box>
              ))}
            </Tabs>
          </Box>
          <Flex w='full' justify='flex-end' my={6}>
            <Link as={ReachRouter} to='/dashboard'>
              <Button
                h={12}
                width={40}
                fontSize='md'
                btntitle='Dashboard'
                color='gray.700'
                colorScheme='white'
                borderWidth={1}
                _hover={{ textDecor: 'none' }}
              />
            </Link>
            <Box mx={2} />
            <Button
              btntitle='Continue'
              disabled={disableButton}
              w={{ base: 70, md: 40 }}
              h={12}
              fontSize='md'
              onClick={handleNext}
            />
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default CropSelection
