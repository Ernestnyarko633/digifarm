import React, {useState, useEffect} from 'react'
import Layout from 'container/Layout'
import DocumentCard  from 'components/Cards/DocumentCard'
import Tabs from 'components/Tabs/Tabs'
import {Box, Grid, Flex} from '@chakra-ui/core'

const data = [
    {
        id:1,
        title: 'Receipts',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et .'
    },
    {
        id:2,
        title: 'Invoice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et .'
    },
    {
        id:3,
        title: 'Contracts',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et nulla mattis cursus.'
    }

]

const Document = () => {

    return (
        
            <Layout>
                <Box pb={10}> 
                    <Tabs display='flex' mt={12} >
                        {
                            data.map((item)=> {
                                const filteredDocument = data.filter(e => e.title === item.title)
                                return (
                                    <Box label={item.title} >
                                       <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={{ md: 8}}>
                                            {
                                            filteredDocument.map((item) => (
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
                                )
                            })
                        }
                       
                       
                    </Tabs>
                </Box>
        </Layout>
            
    )
}

export default Document
