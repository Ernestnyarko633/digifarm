import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  List,
  ListIcon,
  ListItem,
  Text
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'
import React from 'react'
import PropTypes from 'prop-types'

const FarmingTypeCard = ({
  subtitle,
  options,
  image,
  title,
  selected,
  onClick,
  mr,
  id,
  disabled
}) => {
  // const { handleModalClick } = useComponent();

  return (
    <Box
      w={{ md: 85 }}
      borderWidth={selected ? 2 : 1}
      borderColor={selected ? 'cf.green' : 'gray.300'}
      rounded='lg'
      textAlign='left'
      mr={mr}
      mb={{ base: 6, md: 0 }}
      onClick={onClick}
      pos='relative'
      filter={disabled && 'grayScale(100%)'}
    >
      <Box pos='absolute' top={2} right={2}>
        {selected ? (
          <Icon as={FaCheckCircle} color='cf.green' boxSize={6} />
        ) : (
          <Box
            borderWidth={1}
            borderColor='gray.200'
            rounded='100%'
            w={6}
            h={6}
          />
        )}
      </Box>
      <Box pos='absolute' top={1} left={2}>
        {id === 'cooperative' && (
          <Heading fontSize='2xl' color='cf.green'>
            Coming Soon
          </Heading>
        )}
      </Box>
      <Box mb={3}>
        <Image w='100%' h={{ base: '100%', sm: 64 }} src={image} />
      </Box>
      <Box px={8} py={5}>
        <Flex
          align='center'
          justify='space-between'
          borderBottomWidth={1}
          borderBottomColor='gray.200'
          pb={2}
        >
          <Box>
            <Heading as='h5' fontSize={{ md: 'xl' }}>
              {title}
            </Heading>
            <Text fontSize='sm' mt={-1} color='gray.500'>
              {subtitle}
            </Text>
          </Box>
        </Flex>
        <List fontSize='sm' textAlign='left' my={3} fontFamily='body'>
          {options.map(item => (
            <ListItem key={item} py={1} fontWeight={700}>
              <ListIcon as={FaCheckCircle} color='cf.green' boxSize={5} />
              {item}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

FarmingTypeCard.propTypes = {
  btntitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  subtitle: PropTypes.string,
  options: PropTypes.array,
  state: PropTypes.object,
  mr: PropTypes.any,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.any,
  disabled: PropTypes.any
}

export default FarmingTypeCard
