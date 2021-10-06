import React from 'react'
import Layout from 'container/Layout'
import Greetings from 'components/Utils/Greetings'
import FarmBoardContent from 'components/FarmBoard/FarmBoardContent'
import GetStartedNowCard from 'components/Cards/GetStartedNowCard'
import FetchCard from 'components/FetchCard'
import useApi from 'context/api'
import { Box } from '@chakra-ui/layout'
import { useQuery } from 'react-query'

const FarmBoard = () => {
  document.title = 'Complete Farmer | Farmboard'
  const { getMyFarms } = useApi()
  const {
    data: myFarms,
    isLoading: myFarmsIsLoading,
    error: myFarmsHasError,
    refetch
  } = useQuery('my_farms', () => getMyFarms())

  const triggerReload = () => refetch()
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <Box d={{ base: 'none', md: 'block' }}>
        <Greetings
          title='Welcome to your farm board'
          text="Here's where you view, share and like all <br /> the news from your farm(s)"
        />
      </Box>
      {myFarmsIsLoading || myFarmsHasError ? (
        <FetchCard
          direction='column'
          align='center'
          justify='center'
          mx='auto'
          reload={() => {
            !myFarms?.data?.length && triggerReload()
          }}
          loading={myFarmsIsLoading}
          error={myFarmsHasError}
          text='Standby as we load your current farms and pending orders'
        />
      ) : (
        <FarmBoardContent
          farms={myFarms?.data || []}
          farmLoader={myFarmsIsLoading}
        />
      )}

      {!myFarms?.data?.length && <GetStartedNowCard />}
    </Layout>
  )
}
export default FarmBoard
