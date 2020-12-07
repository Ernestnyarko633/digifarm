import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import CropCard from 'components/Cards/CropCard';
import React from 'react';

// json
import data from '../../data/farm.json';

const StartFarm = () => {
  const [farms, setFarms] = React.useState(data);

  return (
    <Flex
      align='center'
      justify='center'
      direction='column'
      w={{ md: '100vw' }}
      h={{ md: '100vh' }}
      overflow='hidden'
    >
      <Box textAlign='center' mb={{ md: 12 }}>
        <Text fontFamily='light' fontSize={{ md: '3xl' }}>
          Welcome Louisa
        </Text>
        <Heading as='h4' size='xl'>
          How would you like to farm with us
        </Heading>
      </Box>

      <Flex>
        {farms.farms.map((item) => (
          <CropCard
            key={item.id}
            title={item.name}
            subtitle={item.subtitle}
            btntitle='Select'
            options={item.benefits}
            image={require(`../../assets/images/startfarm/${item.img}`).default}
            path={`/startfarm/${item.id}`}
            state={item}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default StartFarm;
