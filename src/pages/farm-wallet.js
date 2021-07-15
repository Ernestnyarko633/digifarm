/* eslint-disable no-console */
import React from 'react'
import Layout from 'container/Layout'
import { Box, Grid, Heading, Flex } from '@chakra-ui/react'
import Button from 'components/Button'
//import { Link as ReachRouter } from 'react-router-dom'
import FetchCard from 'components/FetchCard'
import FarmWalletEmptyState from 'components/EmptyStates/FarmWalletEmptyState'
import NoFarmsCard from 'components/Cards/NoFarmsCard'
import GetStartedNowCard from 'components/Cards/GetStartedNowCard'
import WalletCard from 'components/Cards/WalletCard'
import { useFarmData } from 'hooks/useFarmData'
import useRollover from 'context/rollover'
import useComponent from 'context/component'

const FarmWallet = () => {
  document.title = 'Complete Farmer | Farm wallet'

  const { setType } = useRollover()
  const { handleModalClick } = useComponent()

  const { triggerReloadMyFarms, myFarms, myFarmsIsLoading, myFarmsHasError } =
    useFarmData()

  const loading = myFarmsIsLoading
  const error = myFarmsHasError

  const mapKey = index => {
    const _index = index
    return _index
  }

  const isPayRoll = myFarms?.map(item => item?.order?.product?.payoutStatus)

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
              w='100%'
            >
              <Flex
                justify={{ base: 'center', md: 'flex-start' }}
                align='center'
                w='70%'
              >
                <Heading
                  textAlign='center'
                  fontSize={{ base: 'md', md: '2xl' }}
                  mb={10}
                >
                  Your Farm Wallet(s)
                </Heading>
              </Flex>

              <Flex
                w={{ base: '100%', md: '30%' }}
                align='center'
                justify={{ base: 'center', md: 'flex-end' }}
              >
                <Button
                  btntitle='Rollover'
                  bg='white'
                  isDisabled={!myFarms.length || !isPayRoll.length}
                  fontSize={{ base: 'xs', md: 'md' }}
                  borderWidth={1}
                  borderColor='cf.green'
                  color='cf.green'
                  rounded={30}
                  mx={{ base: 3, md: 0 }}
                  my={5}
                  colorScheme='none'
                  w='50%'
                  h={50}
                  _hover={{ bg: 'white' }}
                  shadow='none'
                  mr={{ md: 5 }}
                  onClick={() => {
                    setType('asRollover')

                    //sessionStorage.setItem('wallet', wallet_id)

                    handleModalClick('rollover')
                  }}
                />
                <Button
                  btntitle='Payout'
                  borderColor='cf.green'
                  color='white'
                  rounded={30}
                  // farm.order.product.payoutStatus !== 'PAID' &&
                  //   farm.wallet <= 0 &&
                  //   !processing_payout
                  isDisabled={!myFarms.length || !isPayRoll.length}
                  mx={{ base: 3, md: 0 }}
                  my={5}
                  w='50%'
                  h={50}
                  fontSize={{ base: 'sm', xl: 'md' }}
                  onClick={() => {
                    setType('asPayout')
                    handleModalClick('payout')
                  }}
                />
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
                      price={farm?.order?.product?.pricePerAcre}
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
