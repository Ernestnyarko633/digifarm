import React from 'react'
import Layout from 'container/Layout'
import Greetings from 'components/Utils/Greetings'
import FarmBoardContent from 'components/FarmBoard/FarmBoardContent'
import useFetch from 'hooks/useFetch'
import GetStartedNowCard from 'components/Cards/GetStartedNowCard'
import useApi from 'context/api'
import FetchCard from 'components/FetchCard'

const FarmBoard = () => {
  document.title = 'Complete Farmer | Farmboard'
  const [reload, setReload] = React.useState(0)
  const { getMyFarms } = useApi()
  const triggerReload = () => setReload(s => s++)
  const {
    data: myFarms,
    isLoading: myFarmsIsLoading,
    error: myFarmsHasError
  } = useFetch('my_farms', getMyFarms, reload)
  return (
    <Layout showRightSideContentType='events'>
      <Greetings
        title='Welcome to your farm board'
        text="Here's where you view, share and like all <br /> the news from your farm(s)"
      />
      {(myFarmsIsLoading || myFarmsHasError) && (
        <FetchCard
          direction='column'
          align='center'
          justify='center'
          mx='auto'
          reload={() => {
            !myFarms?.length && triggerReload()
          }}
          loading={myFarmsIsLoading}
          error={myFarmsHasError}
          text='Standby as we load your current farms and pending orders'
        />
      )}

      {!myFarmsHasError && !myFarmsIsLoading && myFarms.length > 0 && (
        <FarmBoardContent farms={myFarms} />
      )}
      {!myFarmsHasError && !myFarmsIsLoading && myFarms.length === 0 && (
        <GetStartedNowCard />
      )}
    </Layout>
  )
}
export default FarmBoard
