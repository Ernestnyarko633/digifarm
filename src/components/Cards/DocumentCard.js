import React from 'react'
import PropTypes from 'prop-types'
import {Box,Text,Flex, Link, Image} from '@chakra-ui/core'
import Receipt from 'assets/images/Receipt.svg'
import Contract from 'assets/images/Contract.svg'
import {arrowDown} from 'theme/Icons'

const DocumentCard = ({ title,description, link}) => {

    const images = (image) => {
        switch(image){
            case 'Receipt' :
                return Receipt
            case 'Contract' :
                return Contract
            default : 
            return null
        }
    }

    return(
        <Box>
            <Box w={64}>
                <Text textAlign='center' mb={4} fontFamily='heading' fontWeight={200} fontSize='lg'>
                    {title} 
                </Text>

                <Flex align='center' justify='center' pos='relative' bg='white' p={6} w={64} h={64}>
                    <Link href='{link}' target='_blank'>
                        <Flex 
                        as='button' 
                        align='center' 
                        pos='absolute' 
                        justify='center' 
                        right={4} 
                        w={5}
                        h={5}
                        color='white'
                        bg='cf.400'
                        aria-labelledby='download button'
                        >
                            <Icon as={arrowDown}/>
                        </Flex>
                    </Link>
                    
                    <Image src={images(title)}/>
                    <Text fontSize='sm' mt={2} textAlign='center'>
                        {description}
                    </Text>
                </Flex>

            </Box>
        </Box>
    )
}

DocumentCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string
}


export default DocumentCard