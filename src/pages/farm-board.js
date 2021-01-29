import React from 'react'
import Layout from 'container/Layout'
import Greetings from 'components/Utils/Greetings'
import FarmBoardContent from 'components/FarmBoard/FarmBoardContent'
import GetStartedNowCard from 'components/Cards/GetStartedNowCard'

const FarmBoard = () => {
  document.title = 'Complete Farmer | Farmboard'
  return (
    <Layout showRightSideContentType='events'>
      <Greetings
        title='Welcome to your farm board'
        text="Here's where you view, share and like all <br /> the news from your farm(s)"
      />
      {false && <GetStartedNowCard />}
      <FarmBoardContent />
    </Layout>
  )
}
export default FarmBoard
