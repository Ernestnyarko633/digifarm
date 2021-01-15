import React, { Fragment } from 'react'
import { Box, Heading, Flex } from '@chakra-ui/react'
import Fade from 'react-reveal/Fade'
import { AiOutlineCreditCard } from 'react-icons/ai'

import FarmBoardCard from '../Cards/FarmBoardCard'
import YourFarmCard from '../Cards/YourFarmCard'
import Bitmap from 'assets/images/Bitmap.png'
import Crop from 'assets/images/crop.png'
import SoyaBeanImg from 'assets/images/soya.png'

const FarmBoardContent = () => {
  const farms = [
    {
      avatar: SoyaBeanImg,
      datePosted: '3m ago',
      likeCount: 20,
      postImage: Bitmap,
      postImageAlt: 'bitmap',
      headingText: 'CROP HEALTH',
      headingImage: Crop,
      headingImageAlt: 'crop',
      whoseFarm: "John's Farm",
      farmLocation: 'Agyata, Eastern Region',
      postContentText:
        'Growing conditons are currently perfect. Some irrigation work is being performed over the next week, but harvest schedule will not be affected...'
    },
    {
      avatarSrc: SoyaBeanImg,
      datePosted: '3m ago',
      likeCount: 20,
      headingText: 'CROP HEALTH',
      headingImage: Crop,
      headingImageAlt: 'crop',
      whoseFarm: "John's Farm",
      postType: 'FARM UPDATE',
      farmLocation: 'Agyata, Eastern Region',
      postContentText:
        'Growing conditons are currently perfect. Some irrigation work is being performed over the next week, but harvest schedule will not be affected...'
    },
    {
      avatarSrc: SoyaBeanImg,
      datePosted: '5m ago',
      likeCount: 20,
      headingText: 'INVOICE DEPOSIT',
      btntitle: 'Payout',
      buttonWidth: '120px',
      buttonColor: '#fff',
      whoseFarm: "John's Farm",
      farmLocation: 'Agyata, Eastern Region',
      headingIcon: AiOutlineCreditCard,
      postContentText:
        'Growing conditons are currently perfect. Some irrigation work is being performed over the next week.'
    }
  ]

  return (
    <Box p={10} w='100%'>
      <Flex w='100%' align='center' direction='column'>
        <YourFarmCard />
        <Heading as='h3' fontSize={{ md: 'xl' }} mb={5}>
          See what's happening in your farm(s)
        </Heading>
        <Fragment>
          {farms.map(farm => {
            return (
              <Fade bottom key={farm.id}>
                <FarmBoardCard
                  datePosted={farm.datePosted}
                  AvatarSRC={farm.avatarSrc}
                  likeCount={farm.likeCount}
                  postImage={farm.postImage}
                  postImageAlt={farm.postImageAlt}
                  headingText={farm.headingText}
                  headingIcon={farm.headingIcon ? farm.headingIcon : null}
                  headingImage={farm.headingImage}
                  headingImageAlt={farm.headingImageAlt}
                  whoseFarm={farm.whoseFarm}
                  farmLocation={farm.farmLocation}
                  level={farm.level ? farm.level : null}
                  mb={5}
                  btntitle={farm.btntitle ? farm.btntitle : null}
                  levelColor={farm.levelColor ? farm.levelColor : null}
                  buttonWidth={farm.buttonWidth ? farm.buttonWidth : null}
                  postContentText={farm.postContentText}
                />
              </Fade>
            )
          })}
        </Fragment>
      </Flex>
    </Box>
  )
}

export default FarmBoardContent
