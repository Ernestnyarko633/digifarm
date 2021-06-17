/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { Box, Flex, Image, Link, Heading, Text, Icon } from '@chakra-ui/react'
import df_logo from 'assets/images/df_logo.png'
import coopIntroImage from 'assets/images/coopIntroImage.png'
import PropTypes from 'prop-types'

import { IoDocumentTextOutline } from 'react-icons/io5'
import { BiDollar } from 'react-icons/bi'
import { FiGift } from 'react-icons/fi'
import CooperativeSignUp from 'components/Cooperative/CooperativeSignUp'
import { FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa'
import CooperativeFAQ from 'components/Cooperative/CooperativeFAQ'
import Prismic from 'prismic-javascript'
import getConfig from 'utils/configs'
import CustomerStories from 'components/Cooperative/CustomerStories'

const cooperativeIntro = ({ location: { state } }) => {
  const _data = [
    {
      benefit: 'Split Cost',
      description:
        'Split the cost of your desired farm with friends and family. Pay less for the same rich experience.',
      icon: BiDollar,
      color: '#31BC2E',
      bg: 'rgba(49,188,46,.2)'
    },

    {
      benefit: 'Share assets',
      description:
        'Get full access to monitor and view all co-owned assets including farm updates, transaction reports and resources.',
      icon: IoDocumentTextOutline,
      color: '#E08D0A',
      bg: 'rgba(224,141,10,.2)'
    },

    {
      benefit: 'Share rewards',
      description:
        'Get paid your share of the proceeds when the products are sold to trusted verified buyers on the marketplace.',
      icon: FiGift,
      color: '#004C46',
      bg: 'rgba(0,76,70,.2)'
    }
  ]

  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig()

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN
  })

  const [faqs, SetFaqs] = useState(null)
  const [stories, setStories] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      const faq = await Client.query(
        Prismic.Predicates.at('document.type', 'faqs_cooperative')
      )
      const stories_ = await Client.query(
        Prismic.Predicates.at('document.type', 'customer_story')
      )

      if (faq) {
        SetFaqs(faq?.results)
      }
      if (stories_) {
        setStories(stories_?.results)
      }
    }
    if (mounted && !faqs && !stories) {
      fetchData()
    }
    return () => (mounted = false)
  }, [Client, faqs, stories])

  return (
    <Box bg='white'>
      <Flex
        top={0}
        w='100%'
        as='header'
        pos='fixed'
        zIndex={100}
        align='center'
        bgColor='white'
        h={{ base: 10, md: 16 }}
        gridArea='header'
        justify='space-between'
        borderBottomWidth={1}
        borderBottomColor='gray.300'
        px={{ base: 4, xl: 20 }}
        overflowX={{ base: 'hidden', md: 'visible' }}
      >
        <Box as='picture'>
          <Image h={{ base: 5, md: 8 }} src={df_logo} />
        </Box>
        <Link
          color='#31BC2E'
          fontSize={{ base: 10, md: 16 }}
          _hover={{ textDecor: 'none' }}
          my={{ base: '0.2rem', md: 2 }}
          href='https://www.completefarmer.com/support/contact/'
        >
          Contact Support
        </Link>
      </Flex>
      <Box pos='relative' pt={{ base: 10 }}>
        <Image w='full' src={coopIntroImage} />
        <CooperativeSignUp state={state} />
      </Box>
      <Flex
        justify='space-between'
        wrap='wrap'
        mt={{ base: '44rem', md: '40rem', lg: '28rem', '5xl': '20rem' }}
        w={{ md: '80%' }}
        mx={{ base: 6, md: 10, lg: 48 }}
      >
        {_data.map(item => (
          <Box w={{ md: 64 }} key={item.benefit} mb={{ base: 10 }}>
            <Flex
              justify='center'
              align='center'
              h={{ base: '60px', md: 16 }}
              w={{ base: '60px', md: 16 }}
              rounded={16}
              bg={item.bg}
            >
              <Icon
                as={item.icon}
                w={{ base: 8, lg: 12 }}
                h={12}
                color={item.color}
              />
            </Flex>

            <Heading as='h5' fontSize='xl' my={6}>
              {item.benefit}
            </Heading>
            <Text fontSize='sm'>{item.description}</Text>
          </Box>
        ))}
      </Flex>
      <CustomerStories stories={stories} />

      <CooperativeFAQ cooperativeFaqs={faqs} />
      <Box
        bg='#E5E5E5'
        h={{ base: 8, md: 12 }}
        w='full'
        py={{ base: 2, md: 4 }}
        px={{ base: 4, md: 24 }}
      >
        <Flex justify='space-between'>
          <Text fontWeight='bold' fontSize={{ base: 7, md: 12 }}>
            &copy; Complete Farmer Limited, 2021
          </Text>
          <Flex color='#5AA250' fontSize={{ base: 8, md: 12 }}>
            <Link
              href='https://www.completefarmer.com/terms-and-conditions/'
              _hover={{ textDecor: 'none' }}
              isExternal
            >
              Terms and Conditions
            </Link>
            <Link
              ml={{ base: 1, md: 3 }}
              href='https://www.completefarmer.com/privacy-policy/'
              isExternal
              _hover={{ textDecor: 'none' }}
            >
              Privacy Policy
            </Link>
            <Flex color='black'>
              <Link
                isExternal
                href='https://www.facebook.com/completefarmer'
                ml={3}
              >
                <Icon as={FaFacebookSquare} boxSize={4} />
              </Link>
              <Link
                isExternal
                href='https://www.twitter.com/completefarmer'
                ml={3}
              >
                <Icon as={FaTwitter} boxSize={4} />
              </Link>
              <Link
                isExternal
                href='https://www.instagram.com/completefarmer'
                ml={3}
              >
                <Icon as={FaInstagram} boxSize={4} />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

cooperativeIntro.propTypes = {
  location: PropTypes.object.isRequired
}

export default cooperativeIntro
