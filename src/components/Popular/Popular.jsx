import { Box, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Spinner, Center } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import Slider from '../Slider';
import { popularContext, PopularContextProvider } from '../../Context/PopularContext/PopularContext';
import ToggleSwitch from '../TabsSwitch/ToggleSwitch';

const Popular = () => {
    const { 
        popularMovies, 
        getPopularMovies, 
        state, 
        handleState, 
        popularTvShows, 
        getPopularTvShows,
        isLoadingMovies,
        isLoadingTvShows
    } = useContext(popularContext);

    useEffect(() => {
        getPopularMovies();
        getPopularTvShows();
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
        <Box>
            <Flex justify='space-between' mb={6} alignItems='center' textAlign='center'>
                <Box>
                    <Heading fontWeight={500} fontSize='2xl' color='white'>What's Popular</Heading>
                </Box>
                <PopularContextProvider>
                    <ToggleSwitch val1={'Movies'} val2={'TV Shows'} onClick={handleState}/>
                </PopularContextProvider>
            </Flex>
            <Box>
                <Slider type={state ? popularMovies : popularTvShows} url={state ? '/movies/' : '/tvshows/'}/>
            </Box>
        </Box>
    )
}

export default Popular
