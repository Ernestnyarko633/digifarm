import React, { useState } from 'react'
import { Box, Heading } from '@chakra-ui/react'

import useStartFarm from 'context/start-farm'
import useApi from 'context/api'

import useFetch from 'hooks/useFetch'

import Tabs from 'components/Tabs/Tabs'
import FetchCard from 'components/FetchCard'
import FarmDetails from './FarmDetails'

const CropSelection = () => {
  const { handleNext } = useStartFarm()

  const [reload, setReload] = useState(0)

  const { getCropCategories } = useApi()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, isLoading, error } = useFetch(
    'categories',
    getCropCategories,
    reload
  )

  let categories = []

  if (data) {
    categories = [{ _id: 'defualt', name: 'Top-selling farms' }, ...data]
  }

  return (
    <Box mt={{ md: 32 }} w='90%' mx='auto'>
      <Box textAlign='center' py={10}>
        <Heading as='h4' size='xl'>
          Which Farm is right for you.
        </Heading>
      </Box>
      <Box pos='relative'>
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
          <Tabs
            py='0'
            px='0'
            boxWidth='100%'
            direction={{ base: 'column', md: 'row' }}
            display={{ base: 'flex', md: 'block' }}
            width={{ base: '100%', md: 'initial' }}
          >
            {categories?.map(cat => (
              <Box key={cat._id} label={cat.name || cat?.title}>
                <FarmDetails
                  catName={cat.name}
                  handleNext={handleNext}
                  query={cat._id !== 'defualt' && { category: cat._id }}
                />
              </Box>
            ))}
          </Tabs>
        )}
      </Box>
    </Box>
  )
}

export default CropSelection
