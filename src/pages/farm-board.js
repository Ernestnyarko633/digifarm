import React from 'react'
import Layout from 'container/Layout'
import Greetings from 'components/Utils/Greetings'
import FarmBoardContent from 'components/FarmBoard/FarmBoardContent'
import GetStartedNowCard from 'components/Cards/GetStartedNowCard'
import FetchCard from 'components/FetchCard'
import useFetch from 'hooks/useFetch'
import useApi from 'context/api'

const FarmBoard = () => {
  document.title = 'Complete Farmer | Farmboard'
  const { getMyFarms } = useApi()
  const [reload, setReload] = React.useState(0)
  const triggerReload = () => setReload(s => s + 1)
  const {
    data: myFarms,
    isLoading: myFarmsIsLoading,
    error: myFarmsHasError
  } = useFetch('my_farms', getMyFarms, reload)

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <Greetings
        title='Welcome to your farm board'
        text="Here's where you view, share and like all <br /> the news from your farm(s)"
      />
      {myFarmsIsLoading || myFarmsHasError ? (
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
      ) : (
        <FarmBoardContent farms={myFarms || []} />
      )}

      {!myFarms?.length && <GetStartedNowCard />}
    </Layout>
  )
}
export default FarmBoard
