import React from 'react'
import {
  Box,
  Text,
  Icon,
  Image,
  List,
  Heading,
  ListIcon,
  ListItem
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import converter from 'number-to-words'
const CooperativeCard = ({ item, onClick, selected }) => {
  const { name, maxMember, minAcre, discount } = item

  return (
    <Box
      css={{ mixBlendMode: 'normal' }}
      filter='drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.1))'
      borderWidth={1}
      rounded={10}
      bg='white'
      w={{ base: '100%', md: 80 }}
      onClick={onClick}
      cursor='pointer'
    >
      <Box mb={3} pos='relative'>
        <Box h={56} w='100%' bg='#EDEDED' pos='relative'>
          <Image
            w='100%'
            h={48}
            pos='absolute'
            bottom={0}
            object-fit='contain'
            src={require(`../../assets/images/cooperative/${name}.png`).default}
            alt={name + '-image'}
          />
        </Box>
        <Box pos='absolute' right={4} top={4}>
          {selected ? (
            <Icon as={FaCheckCircle} boxSize={8} color='cf.800' />
          ) : (
            <Box h={8} w={8} bg='white' rounded='100%' />
          )}
        </Box>
      </Box>

      <Box p={4}>
        <Box borderBottomWidth={1} borderBottomColor='gray.200' pb={2} mb={3}>
          <Heading as='h5' fontSize='lg'>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Heading>
          <Text color='gray.500' fontSize='xs'>
            Up to {`${converter.toWords(maxMember)} (${maxMember})`} members
          </Text>
        </Box>

        <Box>
          <List fontSize='sm'>
            <ListItem d='flex' alignItems='center'>
              <ListIcon as={FaCheckCircle} color='cf.800' boxSize={4} />
              {minAcre === 0 ? 1 : minAcre} mininum number of acre
            </ListItem>
            <ListItem d='flex' alignItems='center' py={1}>
              <ListIcon as={FaCheckCircle} color='cf.800' boxSize={4} />
              Up to {discount * 100}% cooperative discount
            </ListItem>
            <ListItem d='flex' alignItems='center'>
              <ListIcon as={FaCheckCircle} color='cf.800' boxSize={4} />
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
