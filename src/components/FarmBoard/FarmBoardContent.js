/* eslint-disable no-console */
import React from 'react'
import { Heading, Flex, Box } from '@chakra-ui/react'
import Fade from 'react-reveal/Fade'
import Prismic from 'prismic-javascript'
import getConfig from 'utils/configs'

import FarmBoardCard from '../Cards/FarmBoardCard'
import YourFarmCard from '../Cards/YourFarmCard'
// import Crop from 'assets/images/crop.png'
// import SoyaBeanImg from 'assets/images/soya.png'
import PropTypes from 'prop-types'
import useAuth from 'context/auth'

const FarmBoardContent = ({ farms }) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()

  // const farmss = [
  //   // {
  //   //   id: 1,
  //   //   avatar: SoyaBeanImg,
  //   //   timepstamp: '3m ago',
  //   //   status: 'farm',
  //   //   level: 'Lvl 1',
  //   //   actionTitle: 'CROP HEALTH',
  //   //   firstName: 'John',
  //   //   location: 'Agyata, Eastern Region',
  //   //   actionText:
  //   //     'Growing conditons are currently perfect. Some irrigation work is being performed over the next week, but harvest schedule will not be affected...'
  //   // },
  //   // {
  //   //   id: 2,
  //   //   avatar: SoyaBeanImg,
  //   //   timepstamp: 'July 12, 2021',
  //   //   status: 'news',
  //   //   level: 'Lvl 1',
  //   //   actionTitle: 'CROP HEALTH',
  //   //   headingImage: Crop,
  //   //   firstName: 'John',
  //   //   location: 'Agyata, Eastern Region',
  //   //   tag: 'FARM UPDATE',
  //   //   actionText:
  //   //     'Growing conditons are currently perfect. Some irrigation work is being performed over the next week, but harvest schedule will not be affected...'
  //   // },
  //   // {
  //   //   id: 3,
  //   //   avatar: SoyaBeanImg,
  //   //   timepstamp: '3m ago',
  //   //   status: 'action',
  //   //   level: 'Lvl 1',
  //   //   actionTitle: 'INVOICE DEPOSIT',
  //   //   btntitle: 'Payout',
  //   //   firstName: 'John',
  //   //   location: 'Agyata, Eastern Region',
  //   //   tag: 'FINALIZE',
  //   //   actionText:
  //   //     'Growing conditons are currently perfect. Some irrigation work is being performed over the next week, but harvest schedule will not be affected...'
  //   // }
  // ]

  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig()

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN
  })

  const [doc, setDocData] = React.useState(null)

  React.useEffect(() => {
    let mounted = true
    if (mounted && !doc) {
      const fetchData = async () => {
        const response = await Client.query(
          Prismic.Predicates.at('document.type', 'news')
        )

        if (response) {
          setDocData(response.results)
        }
      }
      fetchData()
    }
    return () => (mounted = false)
  }, [Client, doc])

  console.log(doc, 'conse')
  return (
    <Flex w='100%' align='center' direction='column'>
      <YourFarmCard farms={farms} />
      <Box p={{ base: 4, md: 16 }}>
        <Heading as='h3' fontSize={{ md: 'xl' }} textAlign='center' mb={10}>
          See what's happening in your farm(s)
        </Heading>
        {doc?.map(farm => {
          return (
            <Fade bottom key={farm.id}>
              <FarmBoardCard
                doc={farm}
                status={farm?.type}
                level={farms[0]?.level || 'Lv 1'}
                firstName={user.firstName}
                location={`${farms[0]?.order?.product?.location?.name}, ${farms[0]?.order?.product?.location?.state}`}
                actionBtnTitle={farms[0]?.btntitle}
                actionTag={farms[0]?.tag}
                timestamp={new Date(
                  farms[0]?.order?.product?.updatedAt
                )?.toLocaleDateString()}
                avatar={farms[0]?.order?.product?.cropVariety?.imageUrl}
                actionText={farms[0].actionText}
                actionTitle={farms[0].actionTitle}
              />
            </Fade>
          )
        })}
      </Box>
    </Flex>
  )
}

FarmBoardContent.propTypes = {
  farms: PropTypes.any
}

export default FarmBoardContent
