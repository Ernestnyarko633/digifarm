import React, { useEffect } from 'react'
import { Box, Flex, Heading, Grid } from '@chakra-ui/react'
import Button from 'components/Button'
import Layout from 'container/Layout'
import FarmWalletEmptyState from 'components/EmptyStates/FarmWalletEmptyState'
import FundCard from 'components/Cards/FundCard'
import Individual from 'components/Dynamic/Document/Individual'
import { useLocation, useParams } from 'react-router-dom'
import FarmFinances from 'components/Cards/FarmFinances'
import useRollover from 'context/rollover'
import useComponent from 'context/component'

const Wallet = () => {
  document.title = 'Complete Farmer | Farm wallet'

  const { setStep, setType, setListening } = useRollover()
  const { id: wallet_id } = useParams()
  const { handleModalClick } = useComponent()

  const { state } = useLocation()

  const {
    processing_payout,
    wallet,
    balance,
    expense,
    farm,
    ScheduledTasks,
    farmfeeds,
    tasks,
    activities
  } = state

  const { setBigStepper } = useRollover()

  useEffect(() => {
    let mounted = true

    if (mounted && processing_payout && wallet_id) {
      setBigStepper(p => (p = 3))
    } else {
      setBigStepper(p => p * 0)
    }

    if (mounted && wallet_id) setStep(p => p * 0)
    return () => (mounted = false)
  }, [processing_payout, setBigStepper, setStep, wallet_id])

  return (
    <Layout>
      <FarmWalletEmptyState>
        <Box
          // w='100%'
          px={{ base: 4, lg: 20 }}
          pt={{ base: 10, lg: 20 }}
          pb={{ base: 5, lg: 10 }}
        >
          <Flex
            direction='column'
            align='flex-start'
            justify='center'
            w='100%'
            py={{ base: 10, md: 20 }}
            px={{ base: 6, md: 0 }}
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
                  as='h3'
                  mb={{ base: 3, lg: 4 }}
                  textAlign={{ base: 'center', md: 'left' }}
                  fontSize={{ base: 'xl', md: '3xl', xl: '4xl' }}
                >
                  Wallet Details
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
                  isDisabled={
                    farm?.order?.product?.payoutStatus !== 'PAID' &&
                    farm?.wallet <= 0
                  }
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
                  fontSize={{ base: 'sm', xl: 'md' }}
                  mr={{ md: 5 }}
                  onClick={() => {
                    if (processing_payout) {
                      setListening(false)
                      setType('asRollover')
                    } else {
                      setListening(true)
                      setType('asRollover')
                    }

                    sessionStorage.setItem('wallet', wallet_id)

                    handleModalClick('rollover', { wallet_id })
                  }}
                />
                <Button
                  btntitle='Payout'
                  borderColor='cf.green'
                  color='white'
                  rounded={30}
                  isDisabled={
                    farm.order.product.payoutStatus !== 'PAID' &&
                    farm.wallet <= 0 &&
                    !processing_payout
                  }
                  mx={{ base: 3, md: 0 }}
                  my={5}
                  w='50%'
                  h={50}
                  fontSize={{ base: 'sm', xl: 'md' }}
                  onClick={() => {
                    setListening(true)
                    setType('asPayout')
                    handleModalClick('payout', { wallet_id })
                  }}
                />
              </Flex>
            </Flex>
          </Flex>
          <Grid
            gap={{ base: 2, md: 4 }}
            w='100%'
            templateColumns={{
              base: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              '2xl': 'repeat(4, 1fr)'
            }}
          >
            <FundCard
              label='Total funds'
              description='Total funds in the beginning of the farm cycle'
              bg='#004c46'
              amount={wallet}
            />
            <FundCard
              label='Total amount spent'
              description='Total amount spent on the farm from the start of this cycle'
              bg='#E08D0A'
              amount={expense}
            />
            <FundCard
              label='Total funds available'
              description='Total amount remaining since the start of this farm cycle'
              bg='cf.green'
              amount={balance}
            />
            <FundCard
              bg='blue.400'
              label='Total amount payable'
              description='Total amount you’ll be earning after the produce are sold to a buyer'
              amount={farm?.wallet}
            />
          </Grid>
        </Box>
        <Box w='100%' px={{ base: 4, lg: 20 }} mb={{ base: 20, md: 0 }}>
          <Box
            display={{ base: 'none', md: 'block' }}
            as={FarmFinances}
            processing_payout={processing_payout}
            farm={farm}
            activities={activities}
            wallet_id={wallet_id}
            tasks={tasks}
            scheduledTasks={ScheduledTasks}
          />
          <Heading
            textAlign={{ base: 'center', md: 'left' }}
            as='h3'
            fontSize={{ base: 'xl', md: '3xl' }}
            pt={{ base: 5, xl: 20 }}
            pb={{ base: 5, xl: 10 }}
          >
            See and view your receipts to funds usage
          </Heading>
          <Individual
            digitalFarmerFarm={farm}
            activities={activities}
            farmfeeds={farmfeeds}
            tasks={tasks}
            ScheduledTasks={ScheduledTasks}
          />
        </Box>
      </FarmWalletEmptyState>
    </Layout>
  )
}

export default Wallet
