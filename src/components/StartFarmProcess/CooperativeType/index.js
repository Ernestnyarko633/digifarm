import React from 'react'
import { Box, Flex, Grid, Heading, Link, Text } from '@chakra-ui/layout'
import { NavLink } from 'react-router-dom'
import CooperativeCard from 'components/Cards/CooperativeCard'
import { Button } from 'components'
import useAuth from 'context/auth'
import useFetch from 'hooks/useFetch'
import useApi from 'context/api'
import FetchCard from 'components/FetchCard'
import useStartFarm from 'context/start-farm'

const CooperativeType = () => {
  const [reload, setReload] = React.useState(0)
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const {
    handleNext,
    selectedType,
    setSelectedType,
    setSelectedCooperativeType
  } = useStartFarm()
  const { getCooperativeTypes } = useApi()

  const triggerReload = () => setReload(p => p + 1)
  const { data, loading, error } = useFetch(
    'cooperative-types',
    getCooperativeTypes,
    reload
  )

  return (
    <Flex
      as='main'
      w='100vw'
      bg='white'
      align='center'
      justify='center'
      direction='column'
      mt={{ base: 14, md: 20, xl: 16 }}
    >
      {loading || error ? (
        <FetchCard
          direction='column'
          align='center'
          justify='center'
          w='100%'
          mx='auto'
          reload={() => triggerReload()}
          loading={loading}
          error={error}
          text='Standby as we load cooperative types'
        />
      ) : (
        <>
          <Box textAlign='center' my={20}>
            <Text>Welcome {user?.firstName}</Text>
            <Heading as='h4' fontSize={{ base: 'xl', md: '2xl' }}>
              Select your cooperative type
            </Heading>
          </Box>

          <Grid
            templateColumns={{
              md: 'repeat(2, 1fr)',
              xl: 'repeat(3, 1fr)',
              '2xl': 'repeat(4, 1fr)'
            }}
            px={{ base: 4, md: 0 }}
            gap={6}
          >
            {data?.map(item => (
              <CooperativeCard
                key={item?.name}
                item={item}
                selected={selectedType?.name === item?.name}
                onClick={() => {
                  setSelectedCooperativeType(item)
                  return setSelectedType(item)
                }}
              />
            ))}
          </Grid>

          <Flex mt={{ base: 14, md: 20 }} mb={{ base: 10, md: 0 }}>
            <Link as={NavLink} to='/start-farm' _hover={{ textDecor: 'none' }}>
              <Button
                btntitle='Back'
                px={{ base: 10, md: 20 }}
                h={{ base: 10, md: 12 }}
                fontSize={{ base: 'sm', md: 'md' }}
                bg='transparent'
                borderWidth={1}
                borderColor='gray.300'
                color='gray.500'
                mr={{ base: 6, md: 10 }}
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
              />
            </Link>

            <Button
              btntitle='Continue'
              px={{ base: 10, md: 20 }}
              h={{ base: 10, md: 12 }}
              fontSize={{ base: 'sm', md: 'md' }}
              onClick={handleNext}
              disabled={!selectedType}
            />
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default CooperativeType
