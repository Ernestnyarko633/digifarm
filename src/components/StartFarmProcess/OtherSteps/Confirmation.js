import {
    Box,
    Flex,
    Grid,
    GridItem,
    Icon,
    Image,
    Text,
    VStack,
} from '@chakra-ui/core';
import { Button } from 'components';
import React from 'react';
import { BsQuestionCircleFill } from 'react-icons/bs';

const saved = true

const Confirmation = () => {
    return (
        <Flex>
            <Box width='80vh' textAlign='center' overflow='hidden'>
                <Flex>
                    <Image src={require('../../../assets/images/payment.svg').default} w={300} mt='25%' ml='25%' />
                </Flex>
            </Box>
            <Box py={10} borderLeftWidth={1} borderLeftColor='gray.200' width='80vh'>
                <Box textAlign='center' m='auto' mt={10}>
                    <Text
                        mb={1}
                        fontSize={22}
                        fontWeight='bold'
                    >
                        Confirmation
                    </Text>
                    <Text color='gray.400' mb={8} fontSize={20}>Hurray! you have successfully<br /> made payment to your new farm</Text>
                </Box>
                <Box my='0' mx={8}>
                    {/* <Grid templateColumns="repeat(2, 2fr)" gap={0}>
                        <GridItem colSpan={2} fontWeight="bold" fontSize={21}>Ginger Farm</GridItem>
                        <GridItem colStart={4} colEnd={3}>$750.00</GridItem>

                        <GridItem colSpan={2} borderBottomWidth={1} >Farm management fee</GridItem>
                        <GridItem colStart={4} colEnd={3}>$100.00</GridItem>

                        <GridItem colSpan={2} borderBottomWidth={1}>VAT</GridItem>
                        <GridItem colStart={4} colEnd={3}>$20.5</GridItem>

                        <GridItem colSpan={2} fontWeight="bold">Total</GridItem>
                        <GridItem colStart={4} colEnd={3}>$870.00</GridItem>
                    </Grid> */}

                    <VStack spacing="0px">
                        <Flex borderBottom='1px solid #efefef' pb={1}>
                            <Box w="400px" h="8" fontWeight="bold" fontSize={22}>Ginger Farm</Box>
                            <Box w="100px" h="8">$ 750.00</Box>
                        </Flex>
                        <Flex borderBottom='1px solid #efefef' pt='1'>
                            <Box w="400px" h="8" color='gray.400'>
                                Farm management fee <Icon as={BsQuestionCircleFill} color='cf.400' ml={2} />
                            </Box>
                            <Box w="100px" h="8" >$ 20.50</Box>
                        </Flex>
                        <Flex borderBottom='1px solid #efefef' pt='1'>
                            <Box w="400px" h="8" color='gray.400'>VAT</Box>
                            <Box w="100px" h="8" >$ 100.00</Box>
                        </Flex>
                        <Flex fontWeight="bold">
                            <Box w="400px" h="8" pt='1'>Total</Box>
                            <Box w="100px" h="8" pt='1'>$ 870.00</Box>
                        </Flex>
                    </VStack>
                    <Box ml={330} mt={10} >
                        {saved ? <Button btntitle='Continue to my dashboard' fontSize='md' px='130px' py='26px' /> : <Button btntitle='Save and view receipt' fontSize='md' px='130px' py='26px' variant='outline' />}
                    </Box>
                </Box>
            </Box>
        </Flex>
    )
}

export default Confirmation