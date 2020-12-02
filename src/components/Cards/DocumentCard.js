import React from 'react'
import PropTypes from 'prop-types'
import {Box,Text,Flex,Icon, Link, Image} from '@chakra-ui/core'
import Receipt from 'assets/images/Receipt.svg'
import Contract from 'assets/images/Contract.svg'
import {arrowDown} from 'theme/Icons'

const DocumentCard = ({ title,description, link, mt }) => {

    const images = (image) => {
        switch(image){
            case 'Receipt' :
                return Receipt
            case 'Contract' :
                return Contract
            case 'Invoice':
                return Contract
            default : 
            return null
        }
    }

    return(
            <Box w={60} mt={mt} p={5}>
              <Box>
              <Text textAlign='center' mb={4} fontWeight={900} fontFamily='heading' fontSize='lg'>
                {title} 
            </Text>
              </Box>
                <Flex 
                  align='center'
                  justify='center'
                  direction='column'
                  bg='cf.400'
                  rounded='md'
                  w={60}
                  h={60}
                  p={1}
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
                            <Icon as={arrowDown} bg='white' rounded='lg' color='cf.400' pl='1'/>
                        </Flex>
                    </Link>
                    
                    <Image src={images(title)} />
                    <Text fontSize='sm' mt={2} color='white' textAlign='center'>
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