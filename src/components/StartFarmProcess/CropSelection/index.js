import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Progress,
  Text,
} from '@chakra-ui/core';
import { Button } from 'components';
import React from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';

const CropSelection = ({ handleNext }) => {
  return (
    <Box mt={{ md: 48 }} w='90%' mx='auto'>
      <Box textAlign='center' mb={10}>
        <Heading as='h4' size='xl'>
          Which Farm is right for you.
        </Heading>
      </Box>
      <Grid templateColumns={{ md: '20% 80%' }}>
        <GridItem bg='gray.50'>
          <Box bg='cf.400' color='white' p={6} w={{ md: 48 }} h={{ md: 16 }}>
            <Text>Top-selling farm</Text>
          </Box>
        </GridItem>

        <GridItem
          py={6}
          px={{ md: 10 }}
          borderWidth={1}
          borderColor='gray.300'
          rounded='md'
        >
          <Grid templateColumns={{ md: '40% 50%' }} gap={{ md: '10%' }}>
            <Box>
              <Box>
                <Heading as='h5' size='md' mb={4}>
                  Ginger Farm
                </Heading>
              </Box>

              <Box>
                <Image
                  src={require('../../../assets/images/farm.png').default}
                />
              </Box>
            </Box>

            <Box pos='relative'>
              <Box>
                <Heading as='h5' size='md'>
                  Ginger
                </Heading>
                <Text fontSize='xs'>
                  <Icon as={MdLocationOn} color='gray.400' /> Afram Plains,
                  Eastern region <Icon as={BsInfoCircleFill} color='cf.400' />
                </Text>
              </Box>
              <Divider
                orientation='horizontal'
                borderColor='gray.300'
                w={90}
                my={6}
              />
              <Box>
                <Heading as='h6' size='sm'>
                  Here’s your farm manager
                </Heading>

                <Box
                  borderWidth={1}
                  borderColor='gray.300'
                  rounded='md'
                  p={{ md: 6 }}
                  color='gray.700'
                  mt={4}
                >
                  <Flex align='center' justify='space-between' fontSize='sm'>
                    <Text>Farm starts: 12/12/2020 </Text>
                    <Text>Farm duration: 10 months </Text>
                  </Flex>
                  <Divider orientation='horizontal' mt={4} />
                  <Progress
                    colorScheme='cfButton'
                    value={30}
                    rounded='30px'
                    borderWidth={1}
                    borderColor='gray.300'
                    bg='transparent'
                    height='22px'
                    my={{ md: 8 }}
                  />
                  <Flex align='center' justify='center' fontSize='sm'>
                    <Text>0 Acres left</Text>
                    <Divider
                      orientation='vertical'
                      height={4}
                      mx={4}
                      borderColor='gray.400'
                    />
                    <Text>0 Acres available</Text>
                    <Divider
                      orientation='vertical'
                      height={4}
                      mx={4}
                      borderColor='gray.400'
                    />
                    <Text>0 Acres bought</Text>
                  </Flex>
                </Box>
              </Box>

              <Box right={0} pos='absolute' bottom={0}>
                <Button
                  btntitle='Stat this farm'
                  w={80}
                  h={14}
                  fontSize='md'
                  onClick={handleNext}
                />
              </Box>
            </Box>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CropSelection;
