import React from 'react';
import { Box, Heading, Flex, Grid, Container } from '@chakra-ui/react';
import FarmBoardCard from '../Cards/FarmBoardCard';
import YourFarmCard from '../Cards/YourFarm';
import Bitmap from 'assets/images/Bitmap.png';
import Crop from 'assets/images/crop.png';
import SoyaBeanImg from 'assets/images/soya.png';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { Fragment } from 'react';
import Fade from 'react-reveal/Fade';

const FarmBoardContent = () => {
  const farms = [
    {
      id: 1,
      avatar: SoyaBeanImg,
      timestamp: '3m ago',
      level: 'LVL 1',
      actionTitle: 'CROP HEALTH',
      status: 'farm',
      firstName: 'John',
      farmLocation: 'Agyata, Eastern Region',
      actionText:
        'Growing conditons are currently perfect. Some irrigation work is being performed over the next week, but harvest schedule will not be affected...',
    },
    {
      id: 2,
      avatar: SoyaBeanImg,
      timestamp: '3m ago',
      level: 'LVL 1',
      actionTitle: 'CROP HEALTH',
      actionTag: 'FARM UPDATE',
      headingImage: Crop,
      status: 'news',
      firstName: 'John',
      postType: 'FARM UPDATE',
      farmLocation: 'Agyata, Eastern Region',
      actionText:
        'Growing conditons are currently perfect. Some irrigation work is being performed over the next week, but harvest schedule will not be affected...',
    },
    {
      id: 3,
      avatar: SoyaBeanImg,
      timestamp: '3m ago',
      level: 'LVL 1',
      actionTitle: 'INVOICE DEPOSIT',
      actionTag: 'FINALIZE',
      status: 'action',
      btntitle: 'Payout',
      firstName: 'John',
      farmLocation: 'Agyata, Eastern Region',
      actionText:
        'Growing conditons are currently perfect. Some irrigation work is being performed over the next week, but harvest schedule will not be affected...',
    },
  ];

  return (
    <Box w='100%'>
      <Flex w='100%' align='center' direction='column'>
        <YourFarmCard />
        <Heading as='h3' fontSize={{ md: '2xl' }} my={14}>
          See what's happening in your farm(s)
        </Heading>
        <Container maxW={{ md: '4xl' }}>
          {farms.map((farm) => (
            <Fade bottom>
              <FarmBoardCard
                key={farm.id}
                firstName={farm.firstName}
                status={farm.status}
                avatar={farm.avatar}
                actionBtnTitle={farm.btntitle}
                actionTitle={farm.actionTitle}
                actionText={farm.actionText}
                location={farm.farmLocation}
                level={farm.level}
                actionTag={farm.actionTag}
              />
            </Fade>
          ))}
        </Container>
      </Flex>
    </Box>
  );
};

export default FarmBoardContent;
