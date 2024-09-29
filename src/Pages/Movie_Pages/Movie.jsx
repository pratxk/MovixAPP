import React, { useContext, useEffect } from 'react'
import { infiniteContext } from '../../Context/InfiniteScrollContext/InfiniteContext';
import MovieCard from './MovieCard';
import { Box, Flex, Grid, Heading, Center, Spinner, Select } from '@chakra-ui/react';
import SelectDrop from '../../components/Dropdown/SelectDrop';
import { genres } from '../../components/Trending/genres';
import { genresArray } from '../../components/genreArray';

const Movie = () => {
    const { infiniteMovies, getInfiniteMovies, page, setPage, setInfiniteMovies, loading } = useContext(infiniteContext);

    const increasePageNumber = () => {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000) {
            setPage((prev) => prev + 1)
        }
    }
    async function fetchGenreMovie(e) {
        const id = e.target.value;
        const filterMovie = await getInfiniteMovies(1, id);
        setInfiniteMovies([...filterMovie]);
        setPage(1);
    }

    async function fetchWithSort(e){
        const sort = e.target.value;
        const sortMovie = await getInfiniteMovies(1,'', sort);
        setInfiniteMovies([...sortMovie]);
        setPage(1);
    }
    useEffect(() => {
        async function fetchMovies(page) {
            const movies = await getInfiniteMovies(page);
            setInfiniteMovies((prev) => {
                return [...prev, ...movies]
            });
        }
        fetchMovies(page)
    }, [page])

    useEffect(() => {
        window.addEventListener('scroll', increasePageNumber);
        return () => {
            window.removeEventListener('scroll', increasePageNumber);
        }
    }, [infiniteMovies])

    console.log("infinateMovies in comp", infiniteMovies);

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
                    <Heading fontWeight={500} fontSize='2xl' color='white'>Explore Movies</Heading>
                </Box>
                <Box display='flex' gap='10px'>
                    <Select borderRadius='40px' placeholder='Select Genre' bg='#173d77' color='white' onChange={fetchGenreMovie}>
                        {genresArray.map((ele) => (
                            <option style={{ color: 'black' }} key={ele.id} value={ele.id}>{ele.genre}</option>
                        ))}
                    </Select>
                    <Select borderRadius='40px' placeholder='Sort By' bg='#173d77' color='white' onChange={fetchWithSort}>
                        <option style={{ color: 'black' }} value="asc">Ascending</option>
                        <option style={{ color: 'black' }} value="desc">Descending</option>
                    </Select>
                </Box>
                {/* <TabSwitch tabs={tabs}/> */}
            </Flex>
            <Box>
                <Grid templateColumns='repeat(5,1fr)' gap={5}>
                    {infiniteMovies && infiniteMovies.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default Movie