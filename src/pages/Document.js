import React, {useState} from 'react'
import Layout from 'container/Layout'
import DocumentCard  from 'components/Cards/DocumentCard'
import {Box, Grid} from '@chakra-ui/core'

const Document = () => {

    const data = [
        {
            id:1,
            title: 'Receipts',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et .'
        },
        {
            id:2,
            title: 'Contracts',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et nulla mattis cursus.'
        }

    ]

    return (
            <Layout>

                <Box bg='cf.200' p={{ md: 32 }}>
                
                        <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={{ md: 8}}>
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
                        </Grid>
                </Box>

            </Layout>
    )
}

export default Document
