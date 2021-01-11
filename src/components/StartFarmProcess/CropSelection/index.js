import React, { useState } from 'react'
import { Box, Heading } from '@chakra-ui/react'

import useApi from 'context/api'
import useFetch from 'hooks/useFetch'

import useComponent from 'context/component'

import Tabs from 'components/Tabs/Tabs'
import FetchCard from 'components/FetchCard'
import FarmDetails from './FarmDetails'

const CropSelection = () => {
  const { handleNext } = useComponent()
  const [reload, setReload] = useState(0)

  const { getCropCategories } = useApi()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, isLoading, error } = useFetch('categories', getCropCategories, reload)

  let categories = []

  if (data) {
    categories = [{ _id: 'defualt', name: 'Top Selling' }, ...data]
  }

  return (
    <Box mt={{ md: 32 }} w='90%' mx='auto'>
      <Box textAlign='center' mb={10}>
        <Heading as='h4' size='xl'>
          Which Farm is right for you.
        </Heading>
      </Box>

      <Box pos='relative'>
        {isLoading || error ? (
          <FetchCard
            direction='column'
            align='center'
            justify='center'
            mx='auto'
            w={90}
            reload={triggerReload}
            loading={isLoading}
            error={error}
          />
        ) : (
          <Tabs direction='row' py='0' px='0' boxWidth='100%'>
            {categories?.map(cat => (
              <Box key={cat._id} label={cat.name}>
                <FarmDetails
                  handleNext={handleNext}
                  query={cat._id === 'defualt' ? {} : { category: cat._id }}
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
