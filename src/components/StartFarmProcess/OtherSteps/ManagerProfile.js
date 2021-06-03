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

function ManagerProfile({ item, width, height, size, py, px }) {
  return (
    <Box>
      <Box
        borderColor='gray.400'
        p={{ md: 5 }}
        borderWidth={1}
        rounded='md'
        w={width}
        h={height}
      >
        <Grid key={item?.id} templateColumns={{ md: 'repeat(2, 1fr)' }} py={py}>
          <Box py={{ base: 2, md: 5 }} px={px}>
            <Avatar
              src={item?.manager_image?.url}
              size={size ? size : 'xl'}
              justify='space-around'
            />
          </Box>
          <Box m={{ base: 3, md: 5 }}>
            <Text fontSize='22px' fontWeight='800'>
              {item?.full_name}
            </Text>
            <Text fontSize='sm'>Farm Manager</Text>
            <Divider
              orientation='horizontal'
              borderColor='gray.200'
              w={60}
              my={3}
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
  item: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  size: PropTypes.any,
  py: PropTypes.any,
  px: PropTypes.any
}
export default ManagerProfile
