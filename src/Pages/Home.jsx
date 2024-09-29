import { Box, Button, Center, Heading, Input, Spinner } from '@chakra-ui/react'
import React, { useContext } from 'react'
import Trending from '../components/Trending/Trending'
import { TrendingContextProvider } from '../Context/TrendingContext'
import { PopularContextProvider } from '../Context/PopularContext/PopularContext'
import Popular from '../components/Popular/Popular'
import { TopRatedContextProvider } from '../Context/TopRatedContext/TopRatedContext'
import TopRated from '../components/TopRated/TopRated'
import SearchForm from '../components/Forms/SearchForm'
import { searchContext } from '../Context/SearchContext/SearchContext'
import SearchResults from '../components/Search_Components/SearchResults'

const Home = () => {
    const {searchState, loading,searchResults} = useContext(searchContext);
    console.log("Home------",searchResults);
    if(loading){
        return (
            <Center h="100vh">
                <Spinner size="xl" color="white" />
            </Center>
        );
    }
    if(searchResults?.length>0){
        return (
            <Box px='12em' mt={5} mb={5}>
                <SearchResults/>
            </Box>
        );
    }
    return (
        <>
            <Box px='12em'>
                <Center m='auto' color='white' p='0' display='flex' flexDir='column' h='600px'>
                    <Box display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                        <Box>
                            <Heading fontSize='6em' fontWeight='650'>
                                Welcome.
                            </Heading>
                        </Box>
                        <Box>
                            <Heading fontSize='1em'>
                                Millions of movies, TV shows and people to discover. Explore now.
                            </Heading>
                        </Box>
                    </Box>
                    <Box>
                        <SearchForm />
                    </Box>
                </Center >
                <br />
                <Box>
                    <TrendingContextProvider>
                        <Trending />
                    </TrendingContextProvider>
                </Box>
                <br />
                <br />
                <Box>
                    <PopularContextProvider>
                        <Popular />
                    </PopularContextProvider>
                </Box>
                <br />
                <br />
                <Box>
                    <TopRatedContextProvider>
                        <TopRated />
                    </TopRatedContextProvider>
                </Box>

            </Box >
        </>
    )
}

export default Home
