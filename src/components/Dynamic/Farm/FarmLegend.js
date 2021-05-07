import React from 'react'
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Icon,
  Text
} from '@chakra-ui/react'
import { FaInfoCircle } from 'react-icons/fa'
// import { AiTwotoneCheckSquare } from 'react-icons/ai'

const FarmLegend = () => {
  return (
    <Popover placement='top-start' outline='none'>
      <PopoverTrigger>
        <Box>
          <Icon as={FaInfoCircle} color='cf.800' />{' '}
          <Text as='span'>Map legend</Text>
        </Box>
      </PopoverTrigger>
      <PopoverContent w={{ md: 108 }}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight={800}>Map legend</PopoverHeader>
        <PopoverBody>
          {/* <List fontSize='sm'>
            <ListItem>
              <ListIcon as={AiTwotoneCheckSquare} color='cf.800' />
              This should be describing what the color on the map to the users.
              This should be describing what the color on the map to the
              users.This should be describing what the color on the map to the
              users.
            </ListItem>
            <ListItem>
              <ListIcon as={AiTwotoneCheckSquare} color='red.dark' />
              This should be describing what the color on the map to the users.
              This should be describing what the color on the map to the users.
              This should be describing what the color on the map to the users.
            </ListItem>
            <ListItem>
              <ListIcon as={AiTwotoneCheckSquare} color='violet.dark' />
              This should be describing what the color on the map to the users.
              This should be describing what the color on the map to the users.
              This should be describing what the color on the map to the users.
            </ListItem>
            <ListItem>
              <ListIcon as={AiTwotoneCheckSquare} color='yellow.dark' />
              This should be describing what the color on the map to the users.
              This should be describing what the color on the map to the users.
              This should be describing what the color on the map to the users.
            </ListItem>
          </List>*/}
          This band combination is useful for monitoring agricultural crops. In
          the image, bright green represents vigorous, healthy vegetation while
          non-crops, such as mature trees, appear in a dull green. Coniferous
          forests appear as a dark, rich green while deciduous forests appear as
          a bright green. Sparsely vegetated and bare areas appear brown and
          mauve.
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default FarmLegend
