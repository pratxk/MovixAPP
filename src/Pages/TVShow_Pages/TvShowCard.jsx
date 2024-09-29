import { Badge, Box, Flex, Image, Square, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import CircleProgress from '../../components/Progress_Bars/CircularProgress'
import { genres } from '../../components/Trending/genres';
import noImage from '../../assets/notAvailable.png';

function TvShowCard({tvshow}) {
    const baseUrl = 'https://image.tmdb.org/t/p/original/';
    return (
        <>
            <Box>
                <Link to={'/tvshows/'+tvshow.id}>
                    <Square m="auto" position='relative'>
                        <Image
                            src={tvshow.poster_path ? `${baseUrl + tvshow.poster_path}` : noImage}
                            alt={tvshow.name}
                            boxSize={{ base: "100px" }}
                            borderRadius='3%'
                            w="100%"
                            h='300px'
                        />
                        <Flex pos='absolute' bottom='15px' bg='transparent' right='20px' gap='5px'>
                            {tvshow.genre_ids.slice(0, 2).map((ele) => {
                                const genreName = genres[ele];
                                return <Badge fontWeight='bold' fontSize={'10px'} key={ele} bg='hotpink' color='white'>{genreName}</Badge>;
                            })}
                        </Flex>
                        <Box pos='absolute' bottom='-5' left='0' borderRadius='100%'>
                            <CircleProgress value={tvshow.vote_average} />
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
                        {tvshow.original_name}
                    </Text>
                    <Text
                        pb={5}
                        fontWeight="bold"
                        fontSize="13px"
                        color='white'
                    >
                        {tvshow.first_air_date}
                    </Text>
                </VStack>
            </Box>
        </>
    )
}

export default TvShowCard