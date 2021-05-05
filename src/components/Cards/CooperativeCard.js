import React from 'react'
import {
  Box,
  Heading,
  Icon,
  Image,
  List,
  ListIcon,
  ListItem,
  Text
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'

const CooperativeCard = ({ item, onClick, selected }) => {
  return (
    <Box
      css={{ mixBlendMode: 'normal' }}
      filter='drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.1))'
      borderWidth={1}
      rounded={10}
      bg='white'
      w={{ base: '100%', md: 80 }}
      overflow='hidden'
      onClick={onClick}
    >
      <Box mb={3} pos='relative'>
        <Image
          w='100%'
          h={64}
          object-fit='scale-down'
          src={require(`../../assets/images/${item.image}`).default}
          alt={item.type}
        />
        <Box pos='absolute' right={4} top={4}>
          {selected ? (
            <Icon as={FaCheckCircle} boxSize={8} color='cf.400' />
          ) : (
            <Box h={8} w={8} bg='white' rounded='100%' />
          )}
        </Box>
      </Box>

      <Box p={4}>
        <Box borderBottomWidth={1} borderBottomColor='gray.200' pb={2} mb={3}>
          <Heading as='h5' fontSize='lg'>
            {item.type}
          </Heading>
          <Text color='gray.500' fontSize='xs'>
            Up to {item.members} members
          </Text>
        </Box>

        <Box>
          <List fontSize='sm'>
            <ListItem d='flex' alignItems='center'>
              <ListIcon as={FaCheckCircle} color='cf.400' boxSize={3} />
              {item.minAcres} mininum number of acre
            </ListItem>
            <ListItem d='flex' alignItems='center' py={1}>
              <ListIcon as={FaCheckCircle} color='cf.400' boxSize={3} />
              Up to {item.discount} cooperative discount
            </ListItem>
            <ListItem d='flex' alignItems='center'>
              <ListIcon as={FaCheckCircle} color='cf.400' boxSize={3} />
              Plus all what is included in cooperative farms
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  )
}

CooperativeCard.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.string
}

export default CooperativeCard
