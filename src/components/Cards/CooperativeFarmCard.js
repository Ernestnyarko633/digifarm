import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text
} from '@chakra-ui/react'
import Button from 'components/Button'
import React from 'react'

const CooperativeFarmCard = () => {
  return (
    <Box rounded='xl' bg='white' overflow='hidden' shadow='sm'>
      <Image
        src={require('../../assets/images/Bitmap.png').default}
        rounded='xl'
      />
      <Box p={{ md: 6 }}>
        <Flex justify='space-between'>
          <Box>
            <Heading as='h4' fontSize={{ md: '2xl' }}>
              Soy bean
            </Heading>
            <Text color='gray.500' fontSize='sm'>
              From $ 150/acre each for 5 users
            </Text>
          </Box>

          <Flex align='center'>
            <Text color='gray.500' fontSize='xs'>
              +2 more
            </Text>
            <AvatarGroup size='sm' max={4}>
              <Avatar
                pos='relative'
                name='Ryan Florence'
                src='https://bit.ly/ryan-florence'
              >
                <AvatarBadge
                  pos='absolute'
                  top={-2}
                  right={0}
                  boxSize='1.25em'
                  bg='green.500'
                />
              </Avatar>
              <Avatar
                pos='relative'
                name='Segun Adebayo'
                src='https://bit.ly/sage-adebayo'
              >
                <AvatarBadge
                  pos='absolute'
                  top={-2}
                  right={0}
                  boxSize='1.25em'
                  bg='green.500'
                />
              </Avatar>
              <Avatar
                pos='relative'
                name='Kent Dodds'
                src='https://bit.ly/kent-c-dodds'
              >
                <AvatarBadge
                  pos='absolute'
                  top={-2}
                  right={0}
                  boxSize='1.25em'
                  bg='green.500'
                />
              </Avatar>
              <Avatar
                pos='relative'
                name='Prosper Otemuyiwa'
                src='https://bit.ly/prosper-baba'
              >
                <AvatarBadge
                  pos='absolute'
                  top={-2}
                  right={0}
                  boxSize='1.25em'
                  bg='green.500'
                />
              </Avatar>
            </AvatarGroup>
          </Flex>
        </Flex>

        <Divider orientation='horizontal' my={6} />

        <List listStyleType='none' color='gray.500' fontSize='sm'>
          <ListItem>
            Members -{' '}
            <Text as='span' color='gray.700'>
              4
            </Text>{' '}
          </ListItem>
          <ListItem>
            Acres -{' '}
            <Text as='span' color='gray.700'>
              1,200
            </Text>
          </ListItem>
          <ListItem>
            Location -{' '}
            <Text as='span' color='gray.700'>
              Agyata, Eastern region-Ghana
            </Text>
          </ListItem>
          <ListItem>
            Expected yield -{' '}
            <Text as='span' color='gray.700'>
              Up to 25%
            </Text>
          </ListItem>
          <ListItem>
            Projected market value -{' '}
            <Text as='span' color='gray.700'>
              $ 150 ROI
            </Text>
          </ListItem>
          <ListItem>
            Crop duration -{' '}
            <Text as='span' color='gray.700'>
              8 months
            </Text>
          </ListItem>
        </List>

        <Box mt={6}>
          <Button btntitle='Request to join' w='100%' rounded='30px' py={6} />
        </Box>
      </Box>
    </Box>
  )
}

export default CooperativeFarmCard
