import React from 'react'
import { Heading, Flex, Box } from '@chakra-ui/react'
import Fade from 'react-reveal/Fade'

import FarmBoardCard from '../Cards/FarmBoardCard'
import YourFarmCard from '../Cards/YourFarmCard'
import Crop from 'assets/images/crop.png'
import SoyaBeanImg from 'assets/images/soya.png'

const FarmBoardContent = () => {
  const farms = [
    {
      id: 1,
      avatar: SoyaBeanImg,
      timepstamp: '3m ago',
      status: 'farm',
      level: 'Lvl 1',
      actionTitle: 'CROP HEALTH',
      firstName: 'John',
      location: 'Agyata, Eastern Region',
      actionText:
        'Growing conditons are currently perfect. Some irrigation work is being performed over the next week, but harvest schedule will not be affected...'
    },
    {
      id: 2,
      avatar: SoyaBeanImg,
      timepstamp: '3m ago',
      status: 'news',
      level: 'Lvl 1',
      actionTitle: 'CROP HEALTH',
      headingImage: Crop,
      firstName: 'John',
      location: 'Agyata, Eastern Region',
      tag: 'FARM UPDATE',
      actionText:
        'Growing conditons are currently perfect. Some irrigation work is being performed over the next week, but harvest schedule will not be affected...'
    },
    {
      id: 3,
      avatar: SoyaBeanImg,
      timepstamp: '3m ago',
      status: 'action',
      level: 'Lvl 1',
      actionTitle: 'INVOICE DEPOSIT',
      btntitle: 'Payout',
      firstName: 'John',
      location: 'Agyata, Eastern Region',
      tag: 'FINALIZE',
      actionText:
        'Growing conditons are currently perfect. Some irrigation work is being performed over the next week, but harvest schedule will not be affected...'
    }
  ]

  return (
    <Flex w='100%' align='center' direction='column'>
      <YourFarmCard />
      <Box p={16}>
        <Heading as='h3' fontSize={{ md: 'xl' }} mb={10}>
          See what's happening in your farm(s)
        </Heading>
        {farms.map(farm => {
          return (
            <Fade bottom key={farm.id}>
              <FarmBoardCard
                status={farm.status}
                level={farm.level}
                firstName={farm.firstName}
                location={farm.location}
                actionBtnTitle={farm.btntitle}
                actionTag={farm.tag}
                timestamp={farm.timepstamp}
                avatar={farm.avatar}
                actionText={farm.actionText}
                actionTitle={farm.actionTitle}
              />
            </Fade>
          )
        })}
      </Box>
    </Flex>
  )
}

export default FarmBoardContent
