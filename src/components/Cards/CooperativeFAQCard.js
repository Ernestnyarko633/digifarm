import React from 'react'
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { shuffle } from 'helpers/misc'

const CooperativeFAQCard = ({ cooperativeFaqs }) => {
  const randomArray = shuffle(cooperativeFaqs, 4, 'uid')

  return (
    <Box mt={16}>
      <Box>
        {randomArray.map(item => (
          <Accordion
            allowToggle
            my={{ md: 6 }}
            key={item?.data.questions?.[0].text}
            w={{ base: '95%', lg: '60%' }}
            mx={{ base: 'auto' }}
            mb={{ base: 4 }}
          >
            <AccordionItem bg='cf.100' border='1px solid #979797' rounded={20}>
              <AccordionButton
                _expanded={{
                  color: 'cf.400',
                  border: '1px solid #3c9130'
                }}
                rounded={20}
                _hover={{ bg: 'none' }}
                _focus={{ outline: 'none' }}
                px={{ md: 4 }}
              >
                <Box
                  flex='1'
                  textAlign='left'
                  fontSize={{ base: 'sm', lg: 'xl' }}
                  fontWeight='bold'
                  py={1}
                  px={{ base: 4 }}
                >
                  {item?.data.questions?.[0].text}
                </Box>
                <Box pr={{ md: 4 }}>
                  <AccordionIcon />
                </Box>
              </AccordionButton>

              <AccordionPanel
                py={6}
                px={10}
                bg='cf.300'
                fontSize={{ base: 'sm', lg: 'lg' }}
              >
                {item?.data.responses?.[0].text}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}

CooperativeFAQCard.propTypes = {
  cooperativeFaqs: PropTypes.array.isRequired
}

export default CooperativeFAQCard
