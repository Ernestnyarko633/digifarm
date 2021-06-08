import React from 'react'
import { Box, Heading, Grid } from '@chakra-ui/react'
import Layout from 'container/Layout'
import FarmWalletEmptyState from 'components/EmptyStates/FarmWalletEmptyState'
import FundCard from 'components/Cards/FundCard'
import Individual from 'components/Dynamic/Document/Individual'
import { useLocation } from 'react-router-dom'
import FarmFinances from 'components/Cards/FarmFinances'

const Wallet = () => {
  document.title = 'Complete Farmer | Farm wallet'

  const { state } = useLocation()

  const {
    wallet,
    balance,
    expense,
    farm,
    ScheduledTasks,
    farmfeeds,
    tasks,
    activities
  } = state

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
