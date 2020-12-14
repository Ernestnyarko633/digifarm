import React from 'react'
import { Box, Heading, Flex } from '@chakra-ui/react'
import FarmBoardCard from '../Cards/FarmBoardCard'
import Bitmap from 'assets/images/Bitmap.png'
import Crop from 'assets/images/crop.png'
import SoyaBeanImg from 'assets/images/soya.png'
import { AiOutlineCreditCard } from 'react-icons/ai'

const FarmBoardContent = () => {
  return (
    <Box p={10} w='100%'>
      <Flex w='100%' align='center' direction='column'>
        <Heading as='h3' fontSize={{ md: 'xl' }} mb={5}>
          See what's happening in your farm(s)
        </Heading>
        <FarmBoardCard datePosted='3m ago'
          AvatarSRC={SoyaBeanImg}
          likeCount={20}
          postImage={Bitmap}
          postImageAlt='bitmap'
          headingText='CROP HEALTH'
          headingImage={Crop}
          headingImageAlt='crop'
          whoseFarm="John's Farm"
          farmLocation='Agyata, Eastern Region'
          level={1}
          mb={5}
          postContentText='Growing conditons are currently perfect. Some irrigation work is being performed over the next week, but harvest schedule will not be affected...' />
        <FarmBoardCard datePosted='3m ago'
          levelColor='#ff0000'
          AvatarSRC={SoyaBeanImg}
          likeCount={123}
          headingText='CROP HEALTH'
          headingImage={Crop}
          headingImageAlt='crop'
          whoseFarm="John's Farm"
          postType='FARM UPDATE'
          farmLocation='Agyata, Eastern Region'
          level={1}
          mb={5}
          postContentText='Growing conditons are currently perfect. Some irrigation work is being performed over the next week, but harvest schedule will not be affected...' />

        <FarmBoardCard datePosted='3m ago'
          AvatarSRC={SoyaBeanImg}
          levelColor='#ff0000'
          likeCount={123}
          headingText='INVOICE DEPOSIT'
          headingIcon={AiOutlineCreditCard}
          whoseFarm="John's Farm"
          postType='FINALIZE'
          btntitle='Payout'
          buttonWidth='120px'
          farmLocation='Agyata, Eastern Region'
          level={1}
          buttonColor='#fff'
          postContentText='Growing conditons are currently perfect. Some irrigation work is being performed over the next week, but harvest schedule will not be affected...' />
      </Flex>
    </Box>
  )
}

export default FarmBoardContent
