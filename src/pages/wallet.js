import React from 'react'
import { Box, Heading, Grid } from '@chakra-ui/react'
import Layout from 'container/Layout'
import FarmWalletEmptyState from 'components/EmptyStates/FarmWalletEmptyState'
import FundCard from 'components/Cards/FundCard'
import Individual from 'components/Dynamic/Document/Individual'
import useFetch from 'hooks/useFetch'
import { useParams } from 'react-router-dom'
import useApi from 'context/api'
import FetchCard from 'components/FetchCard'
import FarmFinances from 'components/Cards/FarmFinances'
//import Price from '../data/price.json'

const Wallet = () => {
  document.title = 'Complete Farmer | Farm wallet'
  const [reload, setReload] = React.useState(0)
  const { id } = useParams()
  const [wallet, setWallet] = React.useState(0)
  const [expenses, setExpenses] = React.useState(0)
  const {
    getAllTasks,
    getMyFarm,
    getActivities,
    getMyScheduledTasks,
    getMyFarmFeeds
  } = useApi()

  const triggerReload = () => setReload(prevState => prevState + 1)
  const {
    data: farm,
    isLoading: farmIsLoading,
    error: farmHasError
  } = useFetch(`${id}_digital_farmer_farm`, getMyFarm, reload, id)

  const {
    data: myFarmActivities,
    isLoading: myFarmActivitiesIsLoading,
    error: myFarmActivitiesHasError
  } = useFetch(
    `${farm?.order?.product?.protocol?._id}_activities`,
    getActivities,
    reload,
    {
      protocol: farm?.order?.product?.protocol?._id
    }
  )

  const {
    data: tasks,
    isLoading: tasksIsLoading,
    error: tasksHasError
  } = useFetch('tasks', getAllTasks, reload)

  const {
    data: ScheduledTasks,
    isLoading: ScheduledTasksIsLoading,
    error: ScheduledTasksHasError
  } = useFetch(
    `${farm?.order?.product?._id}_scheduled_tasks`,
    getMyScheduledTasks,
    reload,
    {
      farm: farm?.order?.product?._id
    }
  )

  const {
    data: farmFeeds,
    isLoading: farmFeedsIsLoading,
    error: farmFeedsHasError
  } = useFetch(
    `${farm?.order?.product?._id}_farm_feeds`,
    farm?.order?.product?._id ? getMyFarmFeeds : null,
    reload,
    {
      farm: farm?.order?.product?._id
    }
  )

  const loading =
    ScheduledTasksIsLoading ||
    farmIsLoading ||
    tasksIsLoading ||
    myFarmActivitiesIsLoading ||
    farmFeedsIsLoading
  const error =
    ScheduledTasksHasError ||
    farmHasError ||
    tasksHasError ||
    myFarmActivitiesHasError ||
    farmFeedsHasError

  // eslint-disable-next-line no-console
  console.log(farm, 'hisfarm')

  React.useEffect(() => {
    let total = 0
    if (farm && farm?.order?.status === 'PAID') {
      total = farm?.order?.cost * farm?.order?.acreage
    }
    setWallet(total)
  }, [farm])
  return (
    <Layout>
      <FarmWalletEmptyState>
        {!loading && !error && (
          <Box w='100%' px={{ md: 20 }} pt={{ md: 20 }} pb={{ md: 10 }}>
            <Heading as='h3' fontSize={{ md: '4xl' }} mt={{ md: 6 }}>
              Here's how your farm is doing
            </Heading>
            <Grid
              gap={8}
              templateColumns={{ md: 'repeat(3, 1fr)' }}
              py={{ md: 5 }}
              w='100%'
            >
              <FundCard label='Total funds' amount={wallet} />

              <FundCard label='Total funds used' amount={expenses} />

              <FundCard
                label='Total funds balance'
                amount={wallet - expenses}
              />
            </Grid>
          </Box>
        )}
        <Box w='100%' px={{ md: 20 }}>
          {(loading || error) && (
            <Box p={16}>
              <FetchCard
                direction='column'
                align='center'
                justify='center'
                mx='auto'
                reload={() => {
                  ;(!farm?.length ||
                    !tasks?.length ||
                    !myFarmActivities?.length ||
                    !ScheduledTasks?.length) &&
                    triggerReload()
                }}
                loading={loading}
                error={error}
                text='Standby as we load your wallet and receipts'
              />
            </Box>
          )}
          {!loading && !error && (
            <Box>
              <FarmFinances
                farm={farm}
                activities={myFarmActivities}
                tasks={tasks}
                scheduledTasks={ScheduledTasks}
                setExpenses={setExpenses}
              />
            </Box>
          )}
          {!loading && !error && (
            <React.Fragment>
              <Heading
                as='h3'
                fontSize={{ md: '3xl' }}
                pt={{ md: 20 }}
                pb={{ md: 10 }}
              >
                See and view your receipts to funds usage
              </Heading>
              <Individual
                digitalFarmerFarm={farm}
                activities={myFarmActivities}
                farmfeeds={farmFeeds}
                tasks={tasks}
                ScheduledTasks={ScheduledTasks}
              />
            </React.Fragment>
          )}
        </Box>
      </FarmWalletEmptyState>
    </Layout>
  )
}

export default Wallet
