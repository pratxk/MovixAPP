import React, { useContext, useEffect } from 'react'
import { infiniteContext } from '../../Context/InfiniteScrollContext/InfiniteContext';
import { Box, Flex, Grid, Heading, Center, Spinner, Select } from '@chakra-ui/react';
import TvShowCard from './TvShowCard';
import { genresArray } from '../../components/genreArray';

const TvShow = () => {
    const { infiniteTvShows, getInfiniteTvShows, page, setPage, setInfiniteTvShows, loading } = useContext(infiniteContext);

    const increasePageNumber = () => {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000) {
            setPage((prev) => prev + 1)
        }
    }
    async function fetchGenreTvShow(e) {
        const id = e.target.value;
        const filterTvShow = await getInfiniteTvShows(1, id);
        setInfiniteTvShows([...filterTvShow]);
        setPage(1);
    }

    async function fetchWithSortTvShow(e){
        const sort = e.target.value;
        const sortTvShow = await getInfiniteTvShows(1,'', sort);
        setInfiniteTvShows([...sortTvShow]);
        setPage(1);
    }
    useEffect(() => {
        async function fetchTvShows(page) {
            const tvshows = await getInfiniteTvShows(page);
            setInfiniteTvShows((prev) => {
                return [...prev, ...tvshows]
            });
        }
        fetchTvShows(page)
    }, [page])

    useEffect(() => {
        window.addEventListener('scroll', increasePageNumber);
        return () => {
            window.removeEventListener('scroll', increasePageNumber);
        }
    }, [infiniteTvShows])

    console.log("infinateMovies in comp", infiniteTvShows);

    if (loading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" color="white" />
            </Center>
        );
    }

    return (
        <Box mt={4}>
            <Flex justify='space-between' mb={6} alignItems='center' textAlign='center'>
                <Box>
                    <Heading fontWeight={500} fontSize='2xl' color='white'>Explore TV Shows</Heading>
                </Box>
                <Box display='flex' gap='10px'>
                    <Select borderRadius='40px' placeholder='Select Genre' bg='#173d77' color='white' onChange={fetchGenreTvShow}>
                        {genresArray.map((ele) => (
                            <option style={{ color: 'black' }} key={ele.id} value={ele.id}>{ele.genre}</option>
                        ))}
                    </Select>
                    <Select borderRadius='40px' placeholder='Sort By' bg='#173d77' color='white' onChange={fetchWithSortTvShow}>
                        <option style={{ color: 'black' }} value="asc">Ascending</option>
                        <option style={{ color: 'black' }} value="desc">Descending</option>
                    </Select>
                </Box>
                {/* <TabSwitch tabs={tabs}/> */}
            </Flex>
            <Box>
                <Grid templateColumns='repeat(5,1fr)' gap={5}>
                    {infiniteTvShows && infiniteTvShows.map((tvshow, index) => (
                        <TvShowCard key={index} tvshow={tvshow} />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default TvShow