import { Badge, Box, Flex, Image, Square, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import CircleProgress from '../../components/Progress_Bars/CircularProgress'
import { genres } from '../../components/Trending/genres';
import noImage from '../../assets/notAvailable.png';

function MovieCard({movie}) {
    const baseUrl = 'https://image.tmdb.org/t/p/original/';
    return (
        <>
            <Box>
                <Link to={'/movies/'+movie.id}>
                    <Square m="auto" position='relative'>
                        <Image
                            src={movie.poster_path ? `${baseUrl}${movie.poster_path}` : noImage}
                            alt={movie.name}
                            boxSize={{ base: "100px" }}
                            borderRadius='3%'
                            w="100%"
                            h='300px'
                        />
                        <Flex pos='absolute' bottom='15px' bg='transparent' right='20px' gap='5px'>
                            {movie.genre_ids.slice(0, 2).map((ele) => {
                                const genreName = genres[ele];
                                return <Badge fontWeight='bold' fontSize={'10px'} key={ele} bg='hotpink' color='white'>{genreName}</Badge>;
                            })}
                        </Flex>
                        <Box pos='absolute' bottom='-5' left='0' borderRadius='100%'>
                            <CircleProgress value={movie.vote_average} />
                        </Box>
                    </Square>
                </Link>
                <VStack pl={1} mt={3} textAlign='left' align="left">

                    <Text
                        pt={5}
                        fontWeight="bold"
                        fontSize="16px"
                        color='white'
                    >
                        {movie.original_title}
                    </Text>
                    <Text
                        pb={5}
                        fontWeight="bold"
                        fontSize="13px"
                        color='white'
                    >
                        {movie.release_date}
                    </Text>
                </VStack>
            </Box>
        </>
    )
}

export default MovieCard