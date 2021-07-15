import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, useToast } from '@chakra-ui/react'

import useStartFarm from 'context/start-farm'
import useApi from 'context/api'
import PropTypes from 'prop-types'
import useFetch from 'hooks/useFetch'
import { isMobile } from 'helpers/misc'
import Tabs from 'components/Tabs/Tabs'
import FetchCard from 'components/FetchCard'
import FarmDetails from './FarmDetails'
import { Button } from '../../index'
import useRollover from 'context/rollover'
import useComponent from 'context/component'

const CropSelection = ({ rollover }) => {
  const { handleModalClick } = useComponent()

  const gridRef = React.useRef(false)
  const { handleBack, handleNext, selectedCooperativeType, selectedFarm } =
    useStartFarm()
  const { total } = useRollover()
  const [reload, setReload] = useState(0)

  const { getCropCategories } = useApi()
  const toast = useToast()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, isLoading, error } = useFetch(
    'categories',
    getCropCategories,
    reload
  )

  let categories = []

  if (data) {
    categories = [{ _id: 'defualt', title: 'Top-selling farms' }, ...data]
  }

  const type = sessionStorage.getItem('type')

  const cooperativebool =
    type === 'cooperative'
      ? selectedCooperativeType?.minAcre > selectedFarm?.acreage
      : false

  const acreage =
    type === 'cooperative'
      ? selectedFarm?.acreage === 0
      : Math.floor(selectedFarm?.acreage) === 0

  useEffect(() => {
    let mounted = true

    if (mounted && !isLoading && cooperativebool && gridRef) {
      toast({
        title: 'Insufficient farm acres',
        description: `The number of acres available on the platform for the entire  ${selectedFarm?.cropVariety?.crop?.name} Farm is insufficient to meet the  ${selectedCooperativeType?.name}'s basic requirements`,
        status: 'error',
        duration: 10000,
        position: 'top-right'
      })
    }

    if (
      mounted &&
      !isLoading &&
      rollover &&
      total < selectedFarm?.pricePerAcre &&
      gridRef
    ) {
      toast({
        title: 'Insufficient funds in selected wallet(s)',
        description:
          'The number of sums available in your selected farm wallet(s) is insufficient to farm this crop',
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
    cooperativebool,
    rollover,
    total,
    selectedFarm?.pricePerAcre
  ])

  let disableButton =
    (rollover && total < selectedFarm?.pricePerAcre) ||
    cooperativebool ||
    acreage ||
    !selectedFarm ||
    isLoading ||
    error

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
      {rollover && (
        <Flex
          w='100%'
          mt={{ md: 0, '2xl': '15rem', '3xl': '2.5rem' }}
          px={{ base: 2 }}
          justify='flex-end'
        >
          <Flex
            align='center'
            direction='row'
            w={{ base: '100%', xl: '80%', '2xl': '73%', '3xl': '80%' }}
            justify='space-between'
          >
            <Flex justify='flex-start' w='50%' textAlign='center' py={10}>
              <Heading as='h4' fontSize={{ base: 'lg', md: '2xl' }}>
                {isMobile()
                  ? 'Choose crop'
                  : 'Choose the crop you want to farm'}
              </Heading>
            </Flex>
            <Flex justify='flex-end' w='50%'>
              <Button
                mr={{ md: 3 }}
                bg='white'
                display={{ base: 'block', lg: 'flex' }}
                textAlign='center'
                borderWidth={1}
                btntitle='View wallet'
                borderColor='gray.400'
                color='cf.400'
                fontWeight={900}
                rounded={30}
                onClick={async () => {
                  handleModalClick('rollover', {
                    wallet_id: sessionStorage.getItem('wallet'),
                    inRollover: true,
                    showButton: false
                  })
                }}
                w={{ base: '80%', md: '45%', '3xl': '30%' }}
                h={{ base: 50, '2xl': 55 }}
                fontSize={{ base: 'sm', xl: 'md' }}
              />
            </Flex>
          </Flex>
        </Flex>
      )}
      {!rollover && (
        <Box textAlign='center' py={10}>
          <Heading as='h4' fontSize={{ base: 'lg', md: '2xl' }}>
            Choose the crop you want to farm
          </Heading>
        </Box>
      )}
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
            <Button
              h={12}
              width={40}
              fontSize='md'
              btntitle='Prev'
              color='gray.700'
              colorScheme='white'
              onClick={handleBack}
              borderWidth={1}
            />
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

CropSelection.propTypes = {
  rollover: PropTypes.bool
}

export default CropSelection
