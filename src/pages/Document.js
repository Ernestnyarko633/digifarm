import React, {useState, useEffect} from 'react'
import Layout from 'container/Layout'
import DocumentCard  from 'components/Cards/DocumentCard'
import {Box, Grid, Flex} from '@chakra-ui/core'

const data = [
    {
        id:1,
        title: 'Receipt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et .'
    },
    {
        id:2,
        title: 'Invoice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et .'
    },
    {
        id:3,
        title: 'Contract',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et nulla mattis cursus.',
        link: 'https://completefarmer.s3.us-east-2.amazonaws.com/app/test/user/docs/CF-1587062346517.pdf'
    },

]

const Document = () => {
    return (
        
            <Layout>
                <Box pb={10} mx={6} > 
                        <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={{ md: 1}} mt={10}>
                            {
                            data.map((item) => (
                                <DocumentCard
                                key={item.id}
                                mt = {{md: '100px'}}
                                title={item.title}
                                link={item.link}
                                description={item.description}
                                img={require('assets/images/Receipt.svg')}
                                />
                            ))
                            }
                        </Grid>
                    </Box>
        </Layout>
            
    )
}

export default Document
