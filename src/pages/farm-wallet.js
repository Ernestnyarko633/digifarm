import React from 'react'
import Layout from 'container/Layout'
import { Box, Grid, Heading, Flex } from '@chakra-ui/react'
import FetchCard from 'components/FetchCard'
import FarmWalletEmptyState from 'components/EmptyStates/FarmWalletEmptyState'
import NoFarmsCard from 'components/Cards/NoFarmsCard'
import GetStartedNowCard from 'components/Cards/GetStartedNowCard'
import WalletCard from 'components/Cards/WalletCard'
import { useFarmData } from 'hooks/useFarmData'

const FarmWallet = () => {
  document.title = 'Complete Farmer | Farm wallet'

  const { triggerReloadMyFarms, myFarms, myFarmsIsLoading, myFarmsHasError } =
    useFarmData()

  const loading = myFarmsIsLoading
  const error = myFarmsHasError

  const mapKey = index => {
    const _index = index
    return _index
  }

  return (
    <Layout>
      <FarmWalletEmptyState farms={myFarms || []}>
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
            align='flex-start'
            justify='center'
            w='100%'
            py={{ base: 10, md: 20 }}
            px={{ base: 6, md: 20 }}
          >
            <Flex
              justify='center'
              direction={{ base: 'column', md: 'row' }}
              align='center'
              w={{ base: '100%', '2xl': '90%', '3xl': '100%' }}
            >
              <Flex
                justify={{ base: 'center', md: 'flex-start' }}
                align='center'
                w='100%'
              >
                <Heading
                  textAlign='center'
                  fontSize={{ base: 'md', md: '2xl' }}
                  mb={10}
                >
                  Your Farm Wallet(s)
                </Heading>
              </Flex>
            </Flex>

            <Grid
              templateColumns={{
                lg: 'repeat(2, 1fr)',
                xl: 'repeat(2, 1fr)',
                '2xl': 'repeat(2, 1fr)',
                '4xl': 'repeat(3, 1fr)'
              }}
              gap={4}
              mb={{ base: 10, md: 0 }}
            >
              {myFarms.map((farm, index) => {
                return (
                  <>
                    <WalletCard
                      key={mapKey(index)}
                      farm={farm}
                      acreage={farm?.order?.acreage}
                      name={farm?.name}
                      price={
                        farm?.order?.product?.pricePerAcre *
                        farm?.order?.acreage
                      }
                    />
                  </>
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
