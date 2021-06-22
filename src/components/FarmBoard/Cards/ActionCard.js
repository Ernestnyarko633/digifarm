import React from 'react'
import PropTypes from 'prop-types'
import FarmBoardCardWrapper from './FarmBoardCardWrapper'
import { Box, Flex, Text, Icon, Heading, Tag, Avatar } from '@chakra-ui/react'
import { CreditCard } from 'theme/Icons'
import Button from 'components/Button'
import useAuth from 'context/auth'

const ActionCard = ({
  activeFarm,
  farms,
  status,
  timestamp,
  title,
  tag,
  buttonTitle,
  text
}) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()

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
          <Avatar
            size='md'
            src={activeFarm?.order?.product?.cropVariety?.imageUrl}
          />
          <Box ml={{ base: 2, md: 4 }}>
            <Heading
              as='h4'
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight={700}
            >
              {user?.firstName}’s Farm
            </Heading>
            <Text color='gray.600' fontSize={{ base: 'sm', md: 'md' }}>
              {`${activeFarm?.order?.product?.location?.name}, ${activeFarm?.order?.product?.location?.state}`}
            </Text>
          </Box>
          {/* {status !== 'news' && (
                // <Box ml={{ base: 5, md: 12 }} d={{ base: 'none', md: 'block' }}>
                //   <Tag
                //     bg='cf.200'
                //     color='cf.green'
                //     rounded='xl'
                //     px={{ base: 4, md: 6 }}
                //     fontWeight='bold'
                //     fontSize={{ base: 'sm', md: 'md' }}
                //   >
                //     {level}
                //   </Tag>
                // </Box>
              )} */}
        </Flex>

        <Box>
          <Text fontSize={{ base: 'sm', md: 'md' }} color='gray.500'>
            {timestamp}
          </Text>
        </Box>
      </Flex>
    )
  }
  return (
    <FarmBoardCardWrapper status={status}>
      <Box py={{ base: 4, md: 8 }} px={{ base: 4, md: 16 }}>
        <Detail />
        <Box mt={6}>
          <Flex>
            <Text textTransform='uppercase' fontWeight='bold'>
              <Icon as={CreditCard} /> {title}
            </Text>

            <Box ml={12}>
              <Tag
                bg='cf.200'
                color='cf.green'
                rounded='xl'
                px={6}
                fontWeight='bold'
                textTransform='uppercase'
              >
                {tag}
              </Tag>
            </Box>
          </Flex>
          <Flex align='center'>
            <Box w={{ md: '60%' }} mr={{ md: '10%' }}>
              <Text color='gray.500' mt={3} fontSize={{ base: 'sm', md: 'md' }}>
                {text}
              </Text>
            </Box>

            <Box d={{ base: 'none', md: 'block' }}>
              <Button btntitle={buttonTitle} rounded='30px' />
            </Box>
          </Flex>

          <Box d={{ base: 'block', md: 'none' }} mt={{ base: 4 }}>
            <Button width='100%' btntitle={buttonTitle} rounded='30px' />
          </Box>
        </Box>
      </Box>
    </FarmBoardCardWrapper>
  )
}

ActionCard.propTypes = {
  activeFarm: PropTypes.object,
  farms: PropTypes.array,
  status: PropTypes.any,
  timestamp: PropTypes.any,
  buttonTitle: PropTypes.any,
  title: PropTypes.string,
  tag: PropTypes.any,
  text: PropTypes.string
}

export default ActionCard
