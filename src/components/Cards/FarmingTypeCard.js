import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  List,
  ListItem,
  Text
} from '@chakra-ui/react'
import { Link as ReachRouter } from 'react-router-dom'
import { MdKeyboardArrowRight } from 'react-icons/md'
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'components'
import useComponent from 'context/component'

const FarmingTypeCard = ({
  btntitle,
  subtitle,
  options,
  image,
  title,
  state,
  path,
  mr
}) => {
  const { handleModalClick } = useComponent()

  return (
    <Box
      w={{ md: 85 }}
      p={8}
      borderWidth={1}
      borderColor='gray.300'
      rounded='lg'
      textAlign='left'
      mr={mr}
    >
      <Box mb={3}>
        <Image src={image} />
      </Box>

      <Flex align='center' justify='space-between'>
        <Box>
          <Heading as='h5' fontSize={{ md: 'lg' }}>
            {title}
          </Heading>
          <Text fontSize='xs' mt={-2}>
            {subtitle}
          </Text>
        </Box>
      </Flex>

      <List fontSize='sm' textAlign='left' my={3} fontFamily='body'>
        {options.map(item => (
          <ListItem key={item} py={1}>
            {item}
          </ListItem>
        ))}
      </List>

      <Box>
        <Link
          as={ReachRouter}
          to={{ pathname: path, state }}
          _hover={{ textDecor: 'none' }}
        >
          <Button btntitle={btntitle} />
        </Link>
        <Box
          d='block'
          fontSize='xs'
          color='cf.400'
          mt={1}
          fontFamily='body'
          as='button'
          role='button'
          aria-label='learn more button'
          onClick={() => handleModalClick('learnmore')}
        >
          Learn more <Icon as={MdKeyboardArrowRight} />
        </Box>
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
  mr: PropTypes.any
}

export default FarmingTypeCard
