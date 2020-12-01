import React from 'react'
import { Box, Button,Divider, Heading, Flex,ListItem, List, Avatar, Text, Image } from '@chakra-ui/core'
import PropTypes from 'prop-types'

const WarehouseCard = ({ 
    name,
    location, 
    image, 
    weight, 
    bags, 
    quantity, 
    condition,
    mr,
    ml
}) => {
    return(
        <Box >
        <Flex justify='center'> 
            <Box rounded='lg' bg='white' mr={mr}  ml={ml} p={6}>
            <Flex mb={4}>
                <Avatar bg='gray.100'>
                    <Image src={image} />
                </Avatar>
                <Box ml={2}>
                    <Heading as='h6' fontSize={{md: 'lg'}}>{name}</Heading>
                    <Text fontSize='xs' mt={{md:-2}}>{location}</Text>
                </Box>
            </Flex>
            <Divider borderColor="gray.300" />
            <Box>
                <Flex>
                    <List my={3}>
                        <ListItem fontSize='xs'>
                        Volume - <span fontSize='sm' pl={2}>{quantity}</span>
                        </ListItem>
                        <ListItem fontSize='xs' >
                        Weight - <span fontSize='sm' pl={2}>{weight}</span>
                        </ListItem>
                        <ListItem fontSize='xs'>
                        Number of Bags -<span fontSize='sm' pl={2}> {bags}</span>
                        </ListItem>

                        //TODO: truncate words
                        <ListItem fontSize='xs'>
                        Yeild conditions -<span fontSize='sm' pl={2}>{condition}</span>
                        </ListItem>
                    </List>
                <Box ml={6} my={3}>
                    <Box  rounded='40px' bg='cf.200' my={1} pt={1} px={2}>
                        <Text color='cf.400' fontSize='9px' textAlign='center'>
                            Pending Order
                        </Text>
                    </Box>
                    <Text as='h6' fontSize='9px' ml={2} fontWeight='bold'>80% Complete</Text>
                </Box>
                </Flex>
            </Box>
            <Button
            colorScheme='linear'
            rounded='30px'
            fontSize='xs'
            fontWeight='bold'
            width="100%"
            >
            Sell
            </Button>
        </Box>
        </Flex>
        </Box>
    )
}

WarehouseCard.propTypes = {
    name: PropTypes.string.isRequired,
    location:PropTypes.string.isRequired,
    image: PropTypes.any.isRequired,
    buttontitle: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    bags: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    mr: PropTypes.any

}
export default WarehouseCard