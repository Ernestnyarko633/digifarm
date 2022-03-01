/* eslint-disable no-console */
import React from 'react'
import { Box, Flex, Heading, Grid } from '@chakra-ui/react'
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
          pt={{ base: 10, lg: 0 }}
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
                w='100%'
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
            </Flex>
          </Flex>
          <Grid
            gap={{ base: 2, md: 8 }}
            w='100%'
            templateColumns={{
              base: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
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
            {/* <FundCard
              bg='blue.400'
              label='Total amount payable'
              description='Total amount you’ll be earning after the produce are sold to a buyer'
              amount={farm?.wallet}
            /> */}
          </Grid>
        </Box>
        <Box w='100%' px={{ base: 4, lg: 20 }} mb={{ base: 20, md: 0 }}>
          <Box
            display={{ base: 'none', md: 'block' }}
            as={FarmFinances}
            farm={farm}
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
