import React, { useRef } from "react";
import {
    Box,
    Image,
    Square,
    Text,
    VStack,
    Button,
    useBreakpointValue,
    Flex,
    Badge
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Link } from 'react-router-dom'
import { genres } from "./Trending/genres";
import CircularProgress from "./Progress_Bars/CircularProgress";
import noImage from '../assets/notAvailable.png';
import CircleProgress from "./Progress_Bars/CircularProgress";

const Slider = ({ type, url = '' }) => {
    const baseUrl = 'https://image.tmdb.org/t/p/original/';
    const swiperRef = useRef(null);


    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideNext();
        }
    };

    return (
        <Box position="relative" overflow="hidden">
            <Swiper
                ref={swiperRef}
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 4000 }}
                navigation={false} // Disable default navigation buttons
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    660: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    749: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1240: {
                        slidesPerView: 5,
                        spaceBetween: 12,
                    },
                }}
            >
                {type.map((i) => (
                    <SwiperSlide key={i.id}>
                        <Link to={url + i.id}>
                            <Square m="auto" position='relative'>
                                <Image
                                    src={i.poster_path ? `${baseUrl + i.poster_path}` : noImage}
                                    alt={i.name}
                                    boxSize={{ base: "100px" }}
                                    borderRadius='3%'
                                    w="100%"
                                    transition="transform 0.3s ease"
                                    _hover={{ transform: 'scale(1.05)' }}
                                    h='300px'
                                />
                                <Flex pos='absolute' bottom='15px' bg='transparent' right='20px' gap='5px'>
                                    {i.genre_ids.slice(0, 2).map((ele) => {
                                        const genreName = genres[ele];
                                        return <Badge fontWeight='bold' fontSize={'10px'} key={ele} bg='hotpink' color='white'>{genreName}</Badge>;
                                    })}
                                </Flex>
                                <Box pos='absolute' bottom='-5' left='0' borderRadius='100%'>
                                    <CircleProgress value={i.vote_average} />
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
                                {i.original_title !== undefined ? i.original_title : i.original_name}
                            </Text>
                            <Text
                                pb={5}
                                fontWeight="bold"
                                fontSize="13px"
                                color='white'
                            >
                                {i.release_date !== undefined ? i.release_date : i.first_air_date}
                            </Text>
                        </VStack>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Button
                position="absolute"
                left="-2"
                top="35%"
                transform="translateY(-50%)"
                onClick={handlePrev}
                zIndex={1}
                border="none"
                bg="transparent"
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                boxShadow="xl"
            >
                <ChevronLeftIcon w='fit-content' bg='transparent' _hover={{ bg: "white" }} border='1px solid black' fontSize='30px' borderRadius="50%" />
            </Button>

            <Button
                position="absolute"
                right="-2"
                top="35%"
                transform="translateY(-50%)"
                onClick={handleNext}
                zIndex={1}
                border="none"
                bg="transparent"
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                boxShadow="xl"

            >
                <ChevronRightIcon w='fit-content' bg='transparent' _hover={{ bg: "white" }} border='1px solid black' fontSize='30px' borderRadius="50%" />
            </Button>
        </Box>
    );
};

export default Slider;
