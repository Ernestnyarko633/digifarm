import React from 'react'
import Layout from 'container/Layout'
import { Box, Grid, Link, Heading, Flex, Text, Button } from '@chakra-ui/react'
import { Link as ReachRouter } from 'react-router-dom'
import FetchCard from 'components/FetchCard'
import FarmWalletEmptyState from 'components/EmptyStates/FarmWalletEmptyState'
import NoFarmsCard from 'components/Cards/NoFarmsCard'
import useFetch from 'hooks/useFetch'
import useApi from 'context/api'
import FarmCard from 'components/Cards/FarmCard'
import GetStartedNowCard from 'components/Cards/GetStartedNowCard'

const FarmWallet = () => {
  document.title = 'Complete Farmer | Farm wallet'

  const { getMyFarms } = useApi()
  const [reloadMyFarms, setReloadMyFarms] = React.useState(0)

  const triggerReloadMyFarms = () =>
    setReloadMyFarms(prevState => prevState + 1)

  const {
    data: myFarms,
    isLoading: myFarmsIsLoading,
    error: myFarmsHasError
  } = useFetch('my_farms', getMyFarms, reloadMyFarms)

  const loading = myFarmsIsLoading
  const error = myFarmsHasError

  const mapKey = index => {
    const _index = index
    return _index
  }
  return (
    <Layout>
      <FarmWalletEmptyState>
        {!error && !loading && !myFarms && <NoFarmsCard />}
        {(loading || error) && (
          <Box p={16}>
            <FetchCard
              direction='column'
              align='center'
              justify='center'
              mx='auto'
              reload={() => {
                !myFarms?.length && triggerReloadMyFarms()
              }}
              loading={loading}
              error={error}
              text='Standby as we load your current farms'
            />
          </Box>
        )}
        {!loading && myFarms?.length > 0 && !error && (
          <Flex
            direction='column'
            align='center'
            w='100%'
            py={{ md: 20 }}
            px={{ md: 20 }}
          >
            <Heading mb={{ md: 2 }}>Click on farm to view wallet</Heading>
            <Text
              mb={{ md: 6 }}
            >{`You currently have ${myFarms.length} farm wallet(s)`}</Text>
            <Grid
              templateColumns={{ md: 'repeat(2, 1fr)' }}
              w='100%'
              gap={{ md: 12 }}
            >
              {myFarms.map((farm, index) => {
                // eslint-disable-next-line no-console
                return (
                  <Link
                    to={`/wallets/${farm._id}`}
                    as={ReachRouter}
                    key={mapKey(index)}
                  >
                    <Button as={FarmCard} _small={true} farm={farm} />
                  </Link>
                )
              })}
            </Grid>
          </Flex>
        )}
        {!loading && !error && myFarms?.length === 0 && <GetStartedNowCard />}
      </FarmWalletEmptyState>
    </Layout>
  )
}

export default FarmWallet
