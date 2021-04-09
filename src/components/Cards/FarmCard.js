/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';
import { Link as ReachRouter, useHistory } from 'react-router-dom';

import Step from 'components/Form/Step';
import Button from 'components/Button';
import FetchCard from 'components/FetchCard';
import ImageLoader from 'components/ImageLoader';

import useFetch from 'hooks/useFetch';
import useApi from 'context/api';

const FarmCard = ({ farm, _small }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [reload, setReload] = React.useState(0);
  const { getActivities } = useApi();
  const history = useHistory();

  const triggerReload = () => setReload((prevState) => prevState + 1);

  const { data, isLoading, error } = useFetch(null, getActivities, reload, {
    farm: farm?._id,
  });

  return (
    <ReachRouter to={`/farms/${farm?._id}`}>
      <Link _focus={{ textDecor: 'none' }}>
        <Box
          rounded='xl'
          shadow='md'
          p={10}
          bg='white'
          minW={{ base: 82, md: _small ? 85 : 130 }}
          minH={{ md:!_small? '34rem': 'auto' }}
          mr={{ md: 6 }}
        >
          <Flex align='center' justify='space-between'>
            <Flex align='center'>
              <Box mr={4}>
                <Avatar src={farm?.order?.product?.cropVariety?.imageUrl} />
              </Box>

              <Box>
                <Heading as='h4' fontSize={{ md: '2xl' }}>
                  {farm.name}
                </Heading>
                <Text color='gray.500' mt={-1}>
                  {farm?.order?.product?.location?.name},{' '}
                  {farm?.order?.product?.location?.state}
                </Text>
              </Box>
            </Flex>

            <Box d={{ base: 'none', md: 'block' }}>
              <Button
                btntitle='View Farm'
                rounded='30px'
                w={{ md: '190px' }}
                h={{ md: '55px' }}
                fontSize={{ md: 'lg' }}
                onClick={() => history.push(`/farms/${farm._id}`)}
              />
            </Box>
          </Flex>
          {!_small && (
            <>
              <Divider orientation='horizontal' borderColor='gray.300' my={6} />

              <Flex
                justifyContent='space-between'
                alignItems='center'
                pos='relative'
              >
                <Box w={{ md: '40%' }}>
                  <Heading as='h4' fontSize={{ md: '2xl' }}>
                    Progress on farm
                  </Heading>
                  <Divider
                    orientation='horizontal'
                    borderColor='gray.300'
                    my={3}
                  />
                  {isLoading || error ? (
                    <FetchCard
                      m='auto'
                      align='center'
                      justify='center'
                      reload={triggerReload}
                      loading={isLoading}
                      error={error}
                      text='fetching progress'
                    />
                  ) : (
                    <Box>
                      {data.length > 0 ? (
                        data.map((activity, index) => (
                          <Step
                            activity={activity}
                            key={activity.title}
                            cutThread={data.length - 1 === index}
                          />
                        ))
                      ) : (
                        <Box textAlign='center'>Data Unavailable</Box>
                      )}
                    </Box>
                  )}
                </Box>
                <Box
                  w={{ md: '50%' }}
                  pos='absolute'
                  top={{ md: 14 }}
                  right={{ md: 0 }}
                >
                  <ImageLoader
                    isLoaded={imageLoaded}
                    setLoading={setImageLoaded}
                    height='300'
                    rounded='3xl'
                    src={farm?.order?.product?.cropVariety?.imageUrl}
                  />
                </Box>
              </Flex>
            </>
          )}

          <Box d={{ base: 'block', md: 'none' }} mt={{ base: 4, md: 0 }}>
            <Button
              btntitle='View Farm'
              rounded='30px'
              w={{ base: '100%', md: '190px' }}
              h={{ base: 12, md: '55px' }}
              fontSize={{ md: 'lg' }}
              onClick={() => history.push(`/farms/${farm._id}`)}
            />
          </Box>
        </Box>
      </Link>
    </ReachRouter>
  );
};

FarmCard.propTypes = {
  farm: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    order: PropTypes.object,
  }),
  _small: PropTypes.bool,
};

export default FarmCard;
