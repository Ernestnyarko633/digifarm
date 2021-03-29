import GuideCard from 'components/Cards/GuideCard'
import Greetings from 'components/Utils/Greetings'
import Layout from 'container/Layout'
import React from 'react'

const Guide = () => {
  document.title = 'Complete Farmer | GUIDE'
  return (
    <Layout>
      <Greetings
        title='This is your dashboard guide'
        text="Here's where you watch tutorials on how to <br /> navigate through your dashboard."
      />
      <GuideCard />
    </Layout>
  )
}

export default Guide
