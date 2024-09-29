import { Badge, Box, Flex, Image, Square, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import CircleProgress from '../Progress_Bars/CircularProgress';
import { Link } from 'react-router-dom';
import { genres } from '../../components/Trending/genres';
import noImage from '../../assets/notAvailable.png';
const SearchCard = ({ item }) => {
    const baseUrl = 'https://image.tmdb.org/t/p/original';
    return (
        <>
            <Box>
                <Link to={''}>
                    <Square m="auto" position='relative'>
                        <Image
                            src={item.poster_path || item.profile_path ? `${baseUrl}${item.poster_path || item.profile_path}` : noImage}
                            alt={item.name}
                            boxSize={{ base: "100px" }}
                            borderRadius='3%'
                            w="100%"
                            h='300px'
                        />
                        <Flex pos='absolute' bottom='15px' bg='transparent' right='20px' gap='5px'>
                            {item.genre_ids?.slice(0, 2).map((ele) => {
                                const genreName = genres[ele];
                                return <Badge fontWeight='bold' fontSize={'10px'} key={ele} bg='hotpink' color='white'>{genreName}</Badge>;
                            })}
                        </Flex>
                        <Box pos='absolute' bottom='-5' left='0' borderRadius='100%'>
                            <CircleProgress value={item.vote_average || 0} />
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
                        {item.original_title !== undefined ? item.original_title : item.original_name}
                    </Text>
                    <Text
                        pb={5}
                        fontWeight="bold"
                        fontSize="13px"
                        color='white'
                    >
                        {item.release_date !== undefined ? item.release_date : item.first_air_date}
                    </Text>
                </VStack>
            </Box>
        </>
    )
}

export default SearchCard