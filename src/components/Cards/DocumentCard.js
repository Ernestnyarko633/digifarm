import React from 'react'
import PropTypes from 'prop-types'
import {Box,Text,Flex,Icon, Link, Image} from '@chakra-ui/core'
import Receipt from 'assets/images/Receipt.svg'
import Contract from 'assets/images/Contract.svg'
import {arrowDown} from 'theme/Icons'

const DocumentCard = ({ title,description, link}) => {

    const images = (image) => {
        switch(image){
            case 'Receipts' :
                return Receipt
            case 'Contracts' :
                return Contract
            default : 
            return null
        }
    }

    return(
            <Box w={64}>
              
                <Flex 
                  align='center'
                  justify='center'
                  direction='column'
                  bg='cf.400'
                  rounded='md'
                  w={64}
                  h={64}
                  p={6}
                  shadow='sm'
                  pos='relative'
                >
                    <Link  href={link} target='_blank'>
                        <Flex 
                        as='button'
                        align='center'
                        justify='center'
                        pos='absolute'
                        right={4}
                        top={4}
                        w={5}
                        h={5}
                        rounded='100%'
                        bg='cf.400'
                        color='white'
                        boxShadow='lg'
                        aria-labelledby='download button'
                        >
                            <Icon as={arrowDown}/>
                        </Flex>
                    </Link>
                    
                    <Image src={images(title)} />
                    <Text fontSize='sm' mt={2} textAlign='center'>
                    {description}
                    </Text>
                </Flex>
            </Box>
    )
}

DocumentCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string
}


export default DocumentCard