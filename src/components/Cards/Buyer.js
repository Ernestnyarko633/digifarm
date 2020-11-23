import React from 'react'
import {Box, Button, Divider, Progress,Heading, Spacer ,Flex, Avatar, Text ,Image} from '@chakra-ui/core'
import PropTypes from 'prop-types'

const BuyerCard = ({ 
    image, 
    name, 
    address, 
    amtLeft, 
    amtBought, 
    amtNeeded, 
    price, 
    btntitle
}) => {
    return(
        <Flex justify='center'>
            <Box py='6' my={6} w='800px' bg='white' px={8}>
            <Flex>
                <Box my={4} >
                    <Flex>
                        <Avatar>
                            <Image src={image}/>
                        </Avatar>
                        <Box ml={4}>
                            <Heading as='h6' mt={-2} fontSize={{md: 'md'}}>{name}</Heading>
                            <Text fontSize='xs' mt={-1}>{address}</Text>
                        </Box>
                    </Flex>
                </Box>
                <Spacer/>
                <Button mt={4} colorScheme='linear' rounded='30px' fontSize='xs' w='150px'>{btntitle}</Button>
            </Flex>
            <Box my={2}>
                <Flex>
                    <Box rounded='20px' bg='cf.200' p={1}>
                        <Text color='black' fontSize='xs' textAlign='center'>
                            Offer 
                        </Text>
                    </Box>
                    <Text as='h6' fontSize='xs' mt={1} ml={3}>{price} per tonne</Text>
                </Flex>
            </Box>
            <Progress value={60} rounded='lg' colorScheme='green' size='lg'/>
            <Box mt={3}>
                <Flex>
                    <Text as='h6' fontWeight='bold'fontSize='sm' >Need {amtNeeded} tonnes</Text>
                    <Divider orientation='vertical' h={5} borderColor="gray.600" mx={4}/>
                    <Text as='h6' fontWeight='bold'fontSize='sm' >{amtBought} tonnes bought</Text>
                    <Divider orientation='vertical' h={5} borderColor="gray.600" mx={4}/>
                    <Text as='h6' fontWeight='bold'fontSize='sm' >{amtLeft} tonnes left</Text>
                </Flex>
            </Box>
        </Box>
        </Flex>
    )
}

    BuyerCard.propTypes = {
    name: PropTypes.string.isRequired,
    address:PropTypes.string.isRequired,
    image: PropTypes.any.isRequired,
    btntitle: PropTypes.string.isRequired,
    amtNeeded: PropTypes.string.isRequired,
    amtBought: PropTypes.string.isRequired,
    amtLeft: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired

}

export default BuyerCard