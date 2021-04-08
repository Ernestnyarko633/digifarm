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
import Price from '../data/price.json'

const Wallet = () => {
  document.title = 'Complete Farmer | Farm wallet'
  const [reload, setReload] = React.useState(0)
  const { id } = useParams()
  const [wallet, setWallet] = React.useState(Price.price)
  const [expenses, setExpenses] = React.useState(0)
  const {
    getAllTasks,
    getMyFarm,
    getActivities,
    getMyScheduledTasks
  } = useApi()

  const triggerReload = () => setReload(prevState => prevState + 1)
  const {
    data: yourFarm,
    isLoading: yourFarmIsLoading,
    error: yourFarmHasError
  } = useFetch(`${id}_digital_farmer_farm`, getMyFarm, reload, id)

  const {
    data: myFarmActivities,
    isLoading: myFarmActivitiesIsLoading,
    error: myFarmActivitiesHasError
  } = useFetch(
    `${yourFarm?.order?.product?.protocol?._id}_activities`,
    getActivities,
    reload,
    {
      protocol: yourFarm?.order?.product?.protocol?._id
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
    `${yourFarm?.order?.product?._id}_scheduled_tasks`,
    getMyScheduledTasks,
    reload,
    {
      farm: yourFarm?.order?.product?._id
    }
  )

  const loading =
    ScheduledTasksIsLoading ||
    yourFarmIsLoading ||
    tasksIsLoading ||
    myFarmActivitiesIsLoading
  const error =
    ScheduledTasksHasError ||
    yourFarmHasError ||
    tasksHasError ||
    myFarmActivitiesHasError

  // eslint-disable-next-line no-console
  console.log(yourFarm, 'hisfarm')

  React.useEffect(() => {
    let total = 0
    if (yourFarm && yourFarm?.order?.status === 'PAID') {
      total = 750 * yourFarm?.order?.acreage
    }
    setWallet(total)
  }, [yourFarm])
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
                  ;(!yourFarm?.length ||
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
                farm={yourFarm}
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
                digitalFarmerFarm={yourFarm}
                activities={myFarmActivities}
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
