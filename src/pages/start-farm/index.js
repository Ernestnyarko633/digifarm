import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import FarmingTypeCard from 'components/Cards/FarmingTypeCard'

import useAuth from 'context/auth'

// json
import data from '../../data/farm.json'

const StartFarm = () => {
  const { isAuthenticated } = useAuth()

  const { user } = isAuthenticated()

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
          Welcome {user.firstName}
        </Text>
        <Heading as='h4' size='xl'>
          How would you like to farm with us
        </Heading>
      </Box>

      <Flex>
        {data.map((item, idx) => (
          <FarmingTypeCard
            state={item}
            key={item.id}
            btntitle='Select'
            title={item.name}
            options={item.benefits}
            subtitle={item.subtitle}
            path={`/start-farm/${item.id}`}
            mr={idx ? 0 : 5}
            image={require(`../../assets/images/startfarm/${item.img}`).default}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default StartFarm
