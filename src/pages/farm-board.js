import React from 'react'
import Layout from 'container/Layout'
import FarmsEmptyState from 'components/EmptyStates/FarmsEmptyState'
import Greetings from 'components/Utils/FarmBoardGreetings'
import FarmBoardContent from 'components/FarmBoard/FarmBoard'

const FarmBoard = () => {
  return (
    <Layout showRightSideContentType='events'>
      <Greetings />
      {false && <FarmsEmptyState />}
      <FarmBoardContent />
    </Layout>
  )
}
export default FarmBoard
