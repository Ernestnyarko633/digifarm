/*eslint-disable */
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Tag,
  Text,
} from '@chakra-ui/react';
import Button from 'components/Button';
import React from 'react';
import PropTypes from 'prop-types';
import useApi from 'context/api';

const OrderCard = ({ order, onOpen }) => {
  const { getPaymentDetails } = useApi();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('order_id', order);
        const res = await getPaymentDetails(order?._id);
        console.log('result', res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      bg='white'
      minW={{ base: 82, md: 115 }}
      p={{ base: 4, md: 8 }}
      rounded={{ base: '15px', md: '30px' }}
      filter='drop-shadow(0px 2px 50px rgba(0, 0, 0, 0.1))'
      mr={6}
    >
      <Flex>
        <Avatar src={require('../../assets/images/soya.png').default} />
        <Box ml={4}>
          <Heading as='h4' fontSize={{ md: 'lg' }}>
            {order.name}
          </Heading>
          <Text color='gray.600'>{order.location}</Text>
        </Box>
      </Flex>
      <Divider orientation='horizontal' borderColor='gray.300' my={5} />

      <Flex justify='space-between'>
        <List fontWeight='800'>
          <ListItem>Order number: #12019</ListItem>
          <ListItem>10 Acres</ListItem>
          <ListItem>GH 10,000 </ListItem>
        </List>

        <Box textAlign='center'>
          <Tag
            bg='cf.300'
            color='cf.400'
            px={{ md: 6 }}
            py={{ md: 2 }}
            rounded='30px'
          >
            Pending Order
          </Tag>
          <Text fontSize='sm'>{order.progress} Complete</Text>
        </Box>
      </Flex>

      <Box mt={6} w='90%' mx='auto'>
        <Button
          btntitle='Complete order'
          rounded='30px'
          w='100%'
          h={{ base: 12, md: 16 }}
          fontSize={{ md: 'lg' }}
          onClick={onOpen}
        />
      </Box>
    </Box>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    progress: PropTypes.string,
  }),
  onOpen: PropTypes.bool,
};

export default OrderCard;
