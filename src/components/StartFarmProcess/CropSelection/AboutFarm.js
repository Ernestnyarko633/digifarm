import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Progress,
  Text,
} from '@chakra-ui/core';
import React from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';

const AboutFarm = () => (
  <Box css={{ direction: 'ltr' }}>
    <Box>
      <Box>
        <Heading as='h5' size='md'>
          Ginger Farm
        </Heading>
        <Text fontSize='xs'>
          <Icon as={MdLocationOn} color='gray.400' /> Afram Plains, Eastern
          region <Icon as={BsInfoCircleFill} color='cf.400' />
        </Text>
        <Divider orientation='horizontal' borderColor='gray.300' my={6} />
      </Box>

      <Box w='100%' h='200px' backgroundColor='#cccc'>
        <Image
          h='100%'
          w='100%'
          objectFit='cover'
          rounded='md'
          src={require('../../../assets/images/farm.png').default}
          alt='crop'
        />
      </Box>
    </Box>

    <Box mb={{ md: 12 }}>
      <Box mt={{ md: 10 }}>
        <Heading as='h6' size='sm'>
          About crop
        </Heading>
      </Box>

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

    <Box>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
      maiores, perferendis dolores nulla iusto voluptatum earum enim esse, fuga
      ut maxime quo eaque obcaecati distinctio quisquam. Similique natus
      inventore aliquam! Corporis, asperiores! Aut, nihil illo modi nam aliquid
      odio nisi laborum vero non optio eaque fuga officiis amet nulla voluptatem
      aspernatur nemo ut commodi quasi laudantium voluptate. Dolor quam
      voluptatem nemo consectetur ea commodi ut est, quaerat sapiente! Voluptate
      corporis dolorem facere, laborum praesentium magni porro ipsum facilis
      adipisci illum expedita totam dolorum laudantium! Asperiores quas ducimus
      vel, dignissimos quod molestias culpa atque id dolore, illo consequatur,
      ea quo cupiditate praesentium cumque accusantium accusamus veritatis natus
      aperiam sunt magni! Voluptate sequi fugit nostrum.
    </Box>
  </Box>
);

export default AboutFarm;
