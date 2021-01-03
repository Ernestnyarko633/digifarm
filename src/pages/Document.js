import React from 'react'
import Layout from 'container/Layout'
import DocumentCard  from 'components/Cards/Document/DocumentCard'
import { Box, Grid } from '@chakra-ui/react'
import UploadDocument from 'components/Modals/UploadDocument'
import ConfirmReceiptDelete from 'components/Modals/ConfirmReceiptDelete'


const data = [
    {
        id         : 1,
        title      : 'Receipt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et .',
        link       : 'https://completefarmer.s3.us-east-2.amazonaws.com/app/test/user/docs/CF-1587062346517.pdf'
    },
    {
        id         : 2,
        title      : 'Invoice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et .',
        link       : 'https://completefarmer.s3.us-east-2.amazonaws.com/app/test/user/docs/CF-1587062346517.pdf'
    },
    {
        id         : 3,
        title      : 'Contract',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et nulla mattis cursus.',
        link       : 'https://completefarmer.s3.us-east-2.amazonaws.com/app/test/user/docs/CF-1587062346517.pdf'
    },

]

const Document = () => {
  document.title = 'Complete Farmer | Documents'
    return (
      <Layout>
        <Box mt='200px' mx='80px'>
          <UploadDocument />
          {/* <ConfirmDocUpload/> */}
          <ConfirmReceiptDelete />
        </Box>
        <Box pb={10} mx={6}> 
          <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={{ md: 1 }} mt={10}>
            {
                            data.map((item) => (
                              <DocumentCard key={item.id}
                                mt={{ md: '100px' }}
                                title={item.title}
                                link={item.link}
                                description={item.description}
                                img={require('assets/images/Receipt.svg')} />
                            ))
                            }
          </Grid>
        </Box>
      </Layout>
    )
}

export default Document
