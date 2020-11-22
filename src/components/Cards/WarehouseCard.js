import React from 'react'
import { Box, Button,Divider, Heading, Flex,ListItem, List, Grid, Text, Image } from '@chakra-ui/core'
import PropTypes from 'prop-types'

const WarehouseCard = ({ 
    name,
    location, 
    image, 
    btntitle, 
    weight, 
    bags, 
    quantity, 
    condition,
    ml,
    mr
}) => {
    return(
        <Box rounded='lg' bg='white' mr={mr} ml={ml} p={6}>
            <Flex mb={4}>
                <Box >
                    <Image src={image} />
                </Box>
                <Box>
                    <Heading as='h6' fontSize={{md: 'lg'}}>{name}</Heading>
                    <Text fontSize='xs' mt={-2}>{location}</Text>
                </Box>
            </Flex>
            <Divider borderColor="grey.200" />
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
                    <Box  rounded='lg' bg='cf.200' my={1} p={1}>
                        <Text color='black' fontSize='xs'>
                            Pending Order
                        </Text>
                    </Box>
                    <Text as='h6' fontSize='xs' >80% Complete</Text>
                </Box>
                </Flex>
            </Box>
            <Button
            colorScheme='linear'
            rounded='30px'
            fontSize='xs'
            w={32}
            fontWeight={400}
            width="200px"
            >
                {btntitle}
            </Button>
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