import { Box, Center, Heading, Spinner } from '@chakra-ui/react';
import React, { useContext, useState, useEffect } from 'react';
import Trending from '../components/Trending/Trending';
import { TrendingContextProvider } from '../Context/TrendingContext';
import { PopularContextProvider } from '../Context/PopularContext/PopularContext';
import Popular from '../components/Popular/Popular';
import { TopRatedContextProvider } from '../Context/TopRatedContext/TopRatedContext';
import TopRated from '../components/TopRated/TopRated';
import SearchForm from '../components/Forms/SearchForm';
import { searchContext } from '../Context/SearchContext/SearchContext';
import SearchResults from '../components/Search_Components/SearchResults';

const HeroImage = [
    "https://image.tmdb.org/t/p/original/yHzyPJrVqlTySQ9mc379yxrLBYQ.jpg",
    "https://image.tmdb.org/t/p/original/en3GU5uGkKaYmSyetHV4csHHiH3.jpg",
    "https://image.tmdb.org/t/p/original/blqiNjJefmY10Wx6y2vgJJWljJj.jpg",
    "https://image.tmdb.org/t/p/original/sjC29cgm4qZAnpOJQbYKCxDCcra.jpg",
    "https://image.tmdb.org/t/p/original/h9YlRHAZWOWtGonllmj6JJg1FrE.jpg",
    "https://image.tmdb.org/t/p/original/tAwfoDyKiYa4KQdUp3DTMrEs4En.jpg",
    "https://image.tmdb.org/t/p/original/9juRmk8QjcsUcbrevVu5t8VZy5G.jpg",
    "https://image.tmdb.org/t/p/original/wkPPRIducGfsbaUPsWfw0MCQdX7.jpg",
    "https://image.tmdb.org/t/p/original/hdFIdXwS8FSN2wIsuotjW1mshI0.jpg",
    "https://image.tmdb.org/t/p/original/62zw627mH74rng9zc4tFfaR54KW.jpg",
    "https://image.tmdb.org/t/p/original/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
    "https://image.tmdb.org/t/p/original/sjC29cgm4qZAnpOJQbYKCxDCcra.jpg",
];

const Home = () => {
    const { searchState, loading, searchResults } = useContext(searchContext);
    const [backgroundImages, setBackgroundImages] = useState([getRandomImage(), getRandomImage()]);
    const [activeIndex, setActiveIndex] = useState(0);

    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * HeroImage.length);
        return HeroImage[randomIndex];
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundImages(prevImages => [prevImages[1], getRandomImage()]);
            setActiveIndex(prevIndex => (prevIndex === 0 ? 1 : 0));
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" color="white" />
            </Center>
        );
    }

    if (searchResults?.length > 0) {
        return (
            <Box px='12em' mt={5} mb={5}>
                <SearchResults />
            </Box>
        );
    }

    return (
        <>
            <Box position="relative" overflow="hidden" height="100vh">
                {backgroundImages.map((image, index) => (
                    <Box
                        key={index}
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        height="100%"
                        backgroundImage={`url(${image})`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                        filter="brightness(0.7) blur(2px) contrast(0.9)"
                        opacity={index === activeIndex ? 1 : 0}
                        transition="opacity 1.5s ease-in-out"
                        zIndex={1}
                    />
                ))}
                {/* Top gradient */}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    height="100px"
                    background="linear-gradient(to bottom, rgba(0, 30, 60, 0.7) 0%, rgba(0, 30, 60, 0) 100%)" // Dark blue gradient
                    zIndex={2}
                />
                {/* Bottom gradient */}
                <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    height="100px"
                    background="linear-gradient(to top, rgba(0, 30, 60, 0.7) 0%, rgba(0, 30, 60, 0) 100%)" // Dark blue gradient
                    zIndex={2}
                />
                <Center
                    position="relative"
                    color='white'
                    flexDirection='column'
                    height="100%"
                    px='12em'
                    zIndex={3}
                >
                    <Box textAlign="center">
                        <Heading fontSize={['4xl', '5xl', '6xl']} fontWeight='650' mb={4}>
                            Welcome.
                        </Heading>
                        <Heading fontSize={['sm', 'md', 'lg']}>
                            Millions of movies, TV shows and people to discover. Explore now.
                        </Heading>
                    </Box>
                    <Box width={['90%', '80%', '70%', '60%']}>
                        <SearchForm />
                    </Box>
                </Center>
            </Box>
            <Box px={['4em', '8em', '12em']} position='relative'>
                <Box pt={20}>
                    <TrendingContextProvider>
                        <Trending />
                    </TrendingContextProvider>
                </Box>
                <Box mt={16}>
                    <PopularContextProvider>
                        <Popular />
                    </PopularContextProvider>
                </Box>
                <Box mt={16} mb={8}>
                    <TopRatedContextProvider>
                        <TopRated />
                    </TopRatedContextProvider>
                </Box>
            </Box>
        </>
    );
};

export default Home;
