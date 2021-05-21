import React from 'react'
import PropTypes from 'prop-types'

import {
  Box,
  Grid,
  Text,
  Avatar,
  Divider,
  ListItem,
  UnorderedList
} from '@chakra-ui/react'

function ManagerProfile({ item }) {
  return (
    <Box>
      <Box borderColor='gray.400' p={{ md: 5 }} borderWidth={1} rounded='md'>
        <Grid key={item?.id} templateColumns={{ md: 'repeat(2, 1fr)' }}>
          <Box py={{ base: 4, md: 10 }} px={2}>
            <Avatar
              src={item?.manager_image?.url}
              size='xl'
              justify='space-around'
            />
          </Box>
          <Box m={{ base: 3, md: 5 }}>
            <Text fontSize='md' fontWeight='800'>
              {item?.full_name}
            </Text>
            <Text fontSize='sm'>Farm Manager</Text>
            <Divider
              orientation='horizontal'
              borderColor='gray.200'
              w={60}
              my={5}
            />
            <Text>Manager Profile</Text>
            {item ? (
              <UnorderedList>
                {item?.manager_profile?.map(item_ => (
                  <ListItem key={item_.text} fontSize='xs' textColor='gray.500'>
                    {item_.text}
                  </ListItem>
                ))}
              </UnorderedList>
            ) : (
              <Text className='loading-text loading-text-b' fontSize='xs'>
                loading farm manager profile
              </Text>
            )}
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

ManagerProfile.propTypes = {
  item: PropTypes.any
}
export default ManagerProfile
