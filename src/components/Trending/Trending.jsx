import { Box, Flex, Heading, Spinner, Center } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { trendingContext } from '../../Context/TrendingContext'
import Slider from '../Slider';
import ToggleSwitch from '../TabsSwitch/ToggleSwitch';

const Trending = () => {
    const { 
        trendingMovies, 
        getTrendingMovies, 
        state, 
        trendingWeeklyMovies, 
        handleState, 
        getTrendingWeeklyMovies,
        loadingDaily,
        loadingWeekly
    } = useContext(trendingContext);

    useEffect(() => {
        getTrendingMovies();
        getTrendingWeeklyMovies();
    }, []);

    // Check if either daily or weekly data is still loading
    const isLoading = loadingDaily || loadingWeekly;

    if (isLoading) {
        return (
            <Center h="200px">
                <Spinner size="xl" color="white" />
            </Center>
        );
    }

    return (
        <Box>
            <Flex justify='space-between' mb={6} alignItems='center' textAlign='center'>
                <Box>
                    <Heading fontWeight={500} fontSize='2xl' color='white'>Trending</Heading>
                </Box>
                <ToggleSwitch onClick={handleState} val1={'Day'} val2='Weekly' />
            </Flex>
            <Box>
                <Slider type={state ? trendingMovies : trendingWeeklyMovies} url={'/movies/'} />
            </Box>
        </Box>
    )
}

export default Trending
