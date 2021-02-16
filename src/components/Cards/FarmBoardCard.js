import React from 'react'
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Icon,
  Image,
  Tag
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { Flower, CreditCard } from 'theme/Icons'
import { BsHeart } from 'react-icons/bs'
import { RiShareForwardLine } from 'react-icons/ri'
import Button from 'components/Button'

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
  actionBtnTitle
}) => {
  const Detail = () => {
    return (
      <Flex
        pb={5}
        align='center'
        borderBottomWidth={1}
        justify='space-between'
        borderBottomColor='gray.200'
      >
        <Flex align='center'>
          <Avatar size='lg' src={avatar} />
          <Box ml={4}>
            <Heading as='h4' fontSize={{ md: '2xl' }} fontWeight={700}>
              {firstName}’s Farm
            </Heading>
            <Text color='gray.600'>{location}</Text>
          </Box>
          <Box ml={12}>
            <Tag
              bg='cf.200'
              color='cf.400'
              rounded='xl'
              px={6}
              fontWeight='bold'
            >
              {level}
            </Tag>
          </Box>
        </Flex>

        <Box>
          <Text color='gray.500'>{timestamp}</Text>
        </Box>
      </Flex>
    )
  }

  return (
    <Box rounded='xl' w='100%' bg='white' mb={{ md: 10 }} shadow='md'>
      {status === 'farm' && (
        <>
          <Box py={{ md: 10 }} px={{ md: 16 }}>
            <Detail />
            <Box mt={6}>
              <Text textTransform='uppercase' fontWeight='bold'>
                <Icon as={Flower} /> {actionTitle}
              </Text>
              <Text color='gray.500' mt={3}>
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

      {status === 'news' && (
        <Box py={{ md: 8 }} px={{ md: 16 }}>
          <Detail />
          <Box mt={6}>
            <Flex>
              <Text textTransform='uppercase' fontWeight='bold'>
                <Icon as={Flower} /> {actionTitle}
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
            <Text color='gray.500' mt={3}>
              {actionText}
            </Text>
          </Box>
        </Box>
      )}

      {status === 'action' && (
        <Box py={{ md: 8 }} px={{ md: 16 }}>
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
                <Text color='gray.500' mt={3}>
                  {actionText}
                </Text>
              </Box>

              <Box>
                <Button btntitle={actionBtnTitle} rounded='30px' />
              </Box>
            </Flex>
          </Box>
        </Box>
      )}

      <Flex
        align='center'
        py={{ md: status === 'farm' && 6 }}
        pb={{ md: status === 'news' || status === 'action' ? 6 : 8 }}
        px={{ md: 16 }}
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
  )
}

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
  actionBtnTitle: PropTypes.string
}

export default FarmBoardCard
