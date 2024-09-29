import React, { useContext, useEffect } from 'react'
import { Box, Flex, Heading, Spinner, Center } from '@chakra-ui/react';
import Slider from '../Slider';
import { topRatedContext, TopRatedContextProvider } from '../../Context/TopRatedContext/TopRatedContext';
import ToggleSwitch from '../TabsSwitch/ToggleSwitch';

const TopRated = () => {
    const { 
        topRatedMovies, 
        error, 
        getTopRatedMovies, 
        state, 
        handleState, 
        topRatedTvShows, 
        getTopRatedTvShows,
        isLoadingMovies,
        isLoadingTvShows
    } = useContext(topRatedContext);

    useEffect(() => {
        getTopRatedMovies();
        getTopRatedTvShows();
    }, [])

    const isLoading = state ? isLoadingMovies : isLoadingTvShows;

    if (isLoading) {
        return (
            <Center h="200px">
                <Spinner size="xl" color="white" />
            </Center>
        );
    }

    return (
        <Box mb={4}>
            <Flex mb={6} justifyContent='space-between' alignItems='center' textAlign='center'>
                <Box>
                    <Heading fontWeight={500} fontSize='2xl' color='white'>Top Rated</Heading>
                </Box>
                <TopRatedContextProvider>
                    <ToggleSwitch onClick={handleState} val1={'Movies'} val2={'TV Shows'}/>
                </TopRatedContextProvider>
            </Flex>
            <Box>
                <Slider type={state ? topRatedMovies : topRatedTvShows} url={state ? '/movies/' : '/tvshows/'} />
            </Box>
        </Box>
    )
}

export default TopRated
