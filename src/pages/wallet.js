import React, { useEffect } from 'react'
import { Box, Heading, Grid } from '@chakra-ui/react'
import Layout from 'container/Layout'
import FarmWalletEmptyState from 'components/EmptyStates/FarmWalletEmptyState'
import FundCard from 'components/Cards/FundCard'
import Individual from 'components/Dynamic/Document/Individual'
import { useLocation, useParams } from 'react-router-dom'
import FarmFinances from 'components/Cards/FarmFinances'
import useRollover from 'context/rollover'

const Wallet = () => {
  document.title = 'Complete Farmer | Farm wallet'

  const { setStep } = useRollover()
  const { id: wallet_id } = useParams()

  useEffect(() => {
    let mounted = true

    if (mounted) {
      setStep(p => p * 0)
    }

    return () => (mounted = false)
  }, [setStep])

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

    if (mounted && processing_payout) {
      setBigStepper(p => p + 4)
    }

    return () => (mounted = false)
  }, [processing_payout, setBigStepper])

  return (
    <Layout>
      <FarmWalletEmptyState>
        <Box
          // w='100%'
          px={{ base: 4, lg: 20 }}
          pt={{ base: 10, lg: 20 }}
          pb={{ base: 5, lg: 10 }}
        >
          <Heading
            as='h3'
            mb={{ base: 3, lg: 4 }}
            textAlign={{ base: 'center', md: 'left' }}
            fontSize={{ base: 'xl', md: '3xl', xl: '4xl' }}
          >
            Here's how your farm is doing
          </Heading>
          <Grid
            gap={{ base: 4, md: 8 }}
            w='100%'
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
          >
            <FundCard label='Total Funds' amount={wallet} />
            <FundCard label='Total Funds Used' amount={expense} />
            <FundCard label='Total Funds Balance' amount={balance} />
          </Grid>
        </Box>
        <Box w='100%' px={{ base: 4, lg: 20 }} mb={{ base: 20, md: 0 }}>
          <Box
            display={{ base: 'none', md: 'block' }}
            as={FarmFinances}
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
