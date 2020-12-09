import React, {useState, useEffect} from 'react'
import Layout from 'container/Layout'
import DocumentCard  from 'components/Cards/Document/DocumentCard'
import {Box, Grid, Flex, Button} from '@chakra-ui/core'
import Upload from 'components/Form/upload'
import {Formik,Field} from 'formik'

const data = [
    {
        id:1,
        title: 'Receipt',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et .',
        link: 'https://completefarmer.s3.us-east-2.amazonaws.com/app/test/user/docs/CF-1587062346517.pdf'
    },
    {
        id:2,
        title: 'Invoice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et .',
        link: 'https://completefarmer.s3.us-east-2.amazonaws.com/app/test/user/docs/CF-1587062346517.pdf'
    },
    {
        id:3,
        title: 'Contract',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor tellus et nulla mattis cursus.',
        link: 'https://completefarmer.s3.us-east-2.amazonaws.com/app/test/user/docs/CF-1587062346517.pdf'
    },

]

const Document = () => {

    const initialValues = {
        order_id: '5fcd57463ea90617aa45ae10',
        bank_transfer_receipt:''
    }

    const onSubmit = async (values)=> {
        try {
            console.log('hiii')
            console.log(values)
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
            <Layout>
                <Box mt='120px' w={{md: '400px'}} ml={10}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    >
                        {({handleSubmit,values,...rest})=> (
                            <form onSubmit={handleSubmit}>
                                <Field
                                    component={Upload}
                                    label='You can upload payment details'
                                    accept='image/jpeg, image/jpg, application/pdf'
                                    values={values.bank_transfer_receipt}
                                    name='bank_transfer_receipt'
                                />
                
                            </form>
                        )}
                    </Formik>
                </Box>
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
