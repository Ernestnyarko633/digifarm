import React, {useState} from 'react'
import Layout from 'container/Layout';
import DocumentCard  from 'components/Cards/DocumentCard'
import {Box} from '@chakra-ui/core'
import Tabs from 'components/Tabs/Tabs'

const Document = () => {

    const [activeStep, setActiveStep] = useState(0)

    const handleStep = () => {
        setActiveStep((activeStep)=> activeStep + 1)
    }
    
    const getContent = ( step) ? <DocumentCard handleStep={handleStep}/> : null

    const data = [
        {
            id:1,
            title: 'Receipt',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et nulla mattis cursus.'
        },
        {
            id:2,
            title: 'Contract',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et nulla mattis cursus.'
        }

    ]

    return (
      <Layout>
          <Box>
              {
                  data.map((item) => (
                      <DocumentCard
                      key={item.id}
                        title={item.title}
                        description={item.description}
                        img={require('assets/images/Receipt.svg')}
                      />
                  ))
              }
          </Box>
          {getContent(activeStep)}
      </Layout>
    )
}

export default Document
