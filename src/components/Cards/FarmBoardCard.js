/* eslint-disable */
import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Icon,
  Image,
  Tag,
  Collapse,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
// import { RichText } from 'prismic-reactjs'
import { Flower, CreditCard } from 'theme/Icons';
import { BsHeart } from 'react-icons/bs';
import { RiShareForwardLine } from 'react-icons/ri';
import Button from 'components/Button';

const FarmBoardCard = ({
  status,
  avatar,
  firstName,
  location,
  level,
  timestamp,
  actionTitle,
  actionTag,
  actionText,
  actionBtnTitle,
  news,
}) => {
  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);

  const Detail = () => {
    return (
      <Flex
        align='center'
        borderBottomWidth={1}
        justify='space-between'
        borderBottomColor='gray.200'
        px={{ base: 4, md: 0 }}
        py={{ base: 4, md: 0 }}
        pb={5}
      >
        <Flex align='center'>
          <Avatar size='md' src={avatar} />
          <Box ml={{ base: 2, md: 4 }}>
            <Heading
              as='h4'
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight={700}
            >
              {firstName}’s Farm
            </Heading>
            <Text color='gray.600' fontSize={{ base: 'sm', md: 'md' }}>
              {location}
            </Text>
          </Box>
          {status !== 'news' && (
            <Box ml={{ base: 5, md: 12 }} d={{ base: 'none', md: 'block' }}>
              <Tag
                bg='cf.200'
                color='cf.400'
                rounded='xl'
                px={{ base: 4, md: 6 }}
                fontWeight='bold'
                fontSize={{ base: 'sm', md: 'md' }}
              >
                {level}
              </Tag>
            </Box>
          )}
        </Flex>

        <Box>
          <Text fontSize={{ base: 'sm', md: 'md' }} color='gray.500'>
            {timestamp}
          </Text>
        </Box>
      </Flex>
    );
  };

  const NewHead = () => (
    <Flex align='center' justify='space-between'>
      <Flex align='center'>
        <Avatar size='md' src={avatar} />
        <Box ml={4}>
          <Heading as='h4' fontSize={{ md: 'xl' }} fontWeight={700}>
            {firstName}
          </Heading>
        </Box>
      </Flex>

      <Box>
        <Text color='gray.500'>{timestamp}</Text>
      </Box>
    </Flex>
  );

  return (
    <Box
      rounded='xl'
      w={{ base: 82, md: '80%' }}
      mx='auto'
      bg='white'
      mb={10}
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
    >
      {status === 'farm' && (
        <>
          <Box py={{ base: 4, md: 10 }} px={{ base: 4, md: 16 }}>
            <Detail />
            <Box mt={6}>
              <Text textTransform='uppercase' fontWeight='bold'>
                <Icon as={Flower} /> {actionTitle}
              </Text>
              <Text color='gray.500' mt={3} fontSize={{ base: 'sm', md: 'md' }}>
                {actionText}
              </Text>
            </Box>
          </Box>

          <Box>
            <Image
              w='100%'
              src={require('../../assets/images/Bitmap.png').default}
            />
          </Box>
        </>
      )}

      {status === 'news' &&
        news?.map((data) => (
          <Box key={data?.id}>
            <Box pt={{ base: 4, md: 8 }} pb={2} px={{ base: 4, md: 16 }}>
              <NewHead />
            </Box>
            <Box>
              <Image
                w='100%'
                h={{ md: 90 }}
                objectFit='cover'
                src={data.data.body[0].primary.image.url}
              />
            </Box>
            <Box py={4} px={{ base: 4, md: 10 }}>
              <Box mt={6}>
                <Heading as='h5' fontSize={{ md: 'lg' }}>
                  {data.data.headline[0].text}
                </Heading>
                <Collapse
                  startingHeight={85}
                  in={show}
                  onClick={handleToggle}
                  cursor='pointer'
                >
                  {data.data.body[0].primary.description.map((item) => (
                    <Text
                      color='gray.500'
                      mt={3}
                      key={item.text}
                      fontSize={{ base: 'sm', md: 'md' }}
                    >
                      {item.text}
                    </Text>
                  ))}
                </Collapse>
              </Box>
            </Box>
          </Box>
        ))}

      {status === 'action' && (
        <Box py={{ base: 4, md: 8 }} px={{ base: 4, md: 16 }}>
          <Detail />
          <Box mt={6}>
            <Flex>
              <Text textTransform='uppercase' fontWeight='bold'>
                <Icon as={CreditCard} /> {actionTitle}
              </Text>

              <Box ml={12}>
                <Tag
                  bg='cf.200'
                  color='cf.400'
                  rounded='xl'
                  px={6}
                  fontWeight='bold'
                  textTransform='uppercase'
                >
                  {actionTag}
                </Tag>
              </Box>
            </Flex>
            <Flex align='center'>
              <Box w={{ md: '60%' }} mr={{ md: '10%' }}>
                <Text
                  color='gray.500'
                  mt={3}
                  fontSize={{ base: 'sm', md: 'md' }}
                >
                  {actionText}
                </Text>
              </Box>

              <Box d={{ base: 'none', md: 'block' }}>
                <Button btntitle={actionBtnTitle} rounded='30px' />
              </Box>
            </Flex>

            <Box d={{ base: 'block', md: 'none' }} mt={{ base: 4 }}>
              <Button width='100%' btntitle={actionBtnTitle} rounded='30px' />
            </Box>
          </Box>
        </Box>
      )}

      <Flex
        align='center'
        py={{ base: 4, md: status === 'farm' && 6 }}
        pb={{ base: 4, md: status === 'news' || status === 'action' ? 6 : 8 }}
        px={{ base: 4, md: 16 }}
      >
        <Flex>
          <Box>
            <Icon as={BsHeart} mr={2} boxSize={5} />
          </Box>
          <Text>123</Text>
        </Flex>

        <Box ml={{ md: 6 }}>
          <Icon boxSize={6} as={RiShareForwardLine} />
        </Box>
      </Flex>
    </Box>
  );
};

FarmBoardCard.propTypes = {
  status: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  level: PropTypes.string,
  timestamp: PropTypes.string.isRequired,
  actionTitle: PropTypes.string.isRequired,
  actionTag: PropTypes.string,
  actionText: PropTypes.string,
  actionBtnTitle: PropTypes.string,
  news: PropTypes.array,
};

export default FarmBoardCard;
