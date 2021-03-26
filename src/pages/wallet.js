import React from 'react'
import { Box, Heading, Flex } from '@chakra-ui/react'
import Layout from 'container/Layout'
import FarmWalletEmptyState from 'components/EmptyStates/FarmWalletEmptyState'
import FundCard from 'components/Cards/FundCard'
import Individual from 'components/Dynamic/Document/Individual'
import useFetch from 'hooks/useFetch'
import { useParams } from 'react-router-dom'
import useApi from 'context/api'
import FetchCard from 'components/FetchCard'
import FarmFinances from 'components/Cards/FarmFinances'

const Wallet = () => {
  document.title = 'Complete Farmer | Farm wallet'
  const [reload, setReload] = React.useState(0)
  const { id } = useParams()
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

  return (
    <Layout>
      <FarmWalletEmptyState>
        {!loading && !error && (
          <Box w='100%' px={{ md: 20 }} py={{ md: 55 }}>
            <Heading as='h3' fontSize={{ md: '3xl' }} mt={{ md: 6 }}>
              Here's how your farm is doing
            </Heading>
            <Flex direction='row' py={{ md: 10 }} w='100%'>
              <Box w='30.33%' mx={{ md: 5 }}>
                <FundCard label='Total funds' amount={750.0} />
              </Box>
              <Box w='30.33%' mx={{ md: 5 }}>
                <FundCard label='Total funds used' amount={150.0} />
              </Box>
              <Box w='30.33%' mx={{ md: 5 }}>
                <FundCard label='Total funds balance' amount={750.0 - 150.0} />
              </Box>
            </Flex>
          </Box>
        )}
        <Box w='100%' px={{ md: 20 }} py={{ md: 55 }}>
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
            <FarmFinances
              activities={myFarmActivities}
              tasks={tasks}
              scheduledTasks={ScheduledTasks}
            />
          )}
          {!loading && !error && (
            <React.Fragment>
              <Heading as='h3' fontSize={{ md: '3xl' }} py={{ md: 20 }}>
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
