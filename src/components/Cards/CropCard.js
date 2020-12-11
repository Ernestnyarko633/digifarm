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
import useComponents from 'context/ComponentContext'

const CropCard = ({
  image,
  title,
  subtitle,
  extra,
  options,
  btntitle,
  path,
  state,
  mr,
}) => {
  const { handleModalClick } = useComponents()

  return (
    <Box w={{ md: 85 }}
      p={8}
      borderWidth={1}
      borderColor='gray.300'
      rounded='lg'
      textAlign='left'
      mr={mr}>
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

        {extra && <Text fontSize='sm'>{extra}</Text>}
      </Flex>

      <List fontSize='sm' textAlign='left' my={3} fontFamily='body'>
        {options.map((item) => (
          <ListItem key={item} py={1}>
            {item}
          </ListItem>
        ))}
      </List>

      <Box>
        <Link as={ReachRouter}
          to={{ pathname: path, state }}
          _hover={{ textDecor: 'none' }}>
          <Button btntitle={btntitle} />
        </Link>
        <Box d='block'
          fontSize='xs'
          color='cf.400'
          mt={1}
          fontFamily='body'
          as='button'
          role='button'
          aria-label='learn more button'
          onClick={() => handleModalClick('learnmore')}>
          Learn more <Icon as={MdKeyboardArrowRight} />
        </Box>
      </Box>
    </Box>
  )
}

CropCard.propTypes = {
  image   : PropTypes.any.isRequired,
  title   : PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  extra   : PropTypes.string,
  options : PropTypes.array,
  btntitle: PropTypes.string.isRequired,
  path    : PropTypes.string.isRequired,
  state   : PropTypes.object,
  mr      : PropTypes.any,
}

export default CropCard
