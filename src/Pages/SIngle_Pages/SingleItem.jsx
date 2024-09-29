import React from 'react';
import { Box, Flex, Image, Text, Heading, Button, Badge, VStack, Icon, Container, SimpleGrid } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import CircleProgress from '../../components/Progress_Bars/CircularProgress';

const convertRuntime = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h : ${minutes}m`;
}

const SingleItem = () => {
  const { singleMovie, castData } = useLoaderData();
  const baseURL = 'https://image.tmdb.org/t/p/original';

  return (
    <Box position="relative" width="99vw">
      {/* Backdrop Section */}
      <Box
        filter="brightness(0.8)"
        bgPosition="center" 
        
        bgImage={`url(${baseURL}${singleMovie.backdrop_path})`} 
        bgRepeat="no-repeat"
        bgSize="cover" // Ensures the image covers the full width and height without zooming
        width="99vw"
        height="100vh"
        position="absolute"
        top="0"
        left="0"
        zIndex="0"
      />

      <Container maxW="container.xl" py={8} zIndex="1" color="white">
        {/* Movie Details Section */}
        <Flex direction={{ base: 'column', md: 'row' }} bg="rgba(0, 0, 0, 0.8)" borderRadius="lg" overflow="hidden"
          h={{ base: 'auto', md: '600px' }} gap={4} opacity='0.9' alignItems='start' p={4} boxShadow="xl">
          <Box h="500px" flex="1">
            <Image
              src={`${baseURL}${singleMovie.poster_path}`}
              alt={singleMovie.title}
              w="100%"
              h="100%"
              objectFit="cover"
              borderRadius="md"
              boxShadow="2xl"
              transition="transform 0.3s ease"
              _hover={{ transform: 'scale(1.05)' }}
            />
          </Box>
          <VStack
            align="start"
            spacing={5}
            flex="2"
            color="white"
            maxH="100%"
            overflowY="auto"
          >
            <Heading size="2xl" lineHeight="1.2">{singleMovie.original_title}</Heading>
            <Text fontSize="lg" fontStyle="italic" color="gray.400">{singleMovie.tagline}</Text>
            <Flex wrap="wrap" gap={3}>
              {singleMovie.genres.map((genre) => (
                <Badge key={genre.id} fontSize="12px" bg="pink.500" color="white" px={3} py={1} borderRadius="md">{genre.name}</Badge>
              ))}
            </Flex>
            <Flex spacing={4} alignItems="center" gap={2}>
              <CircleProgress value={singleMovie.vote_average} />
              <Button leftIcon={<Icon as={FaPlay} />} colorScheme="pink" variant="solid" size="md" boxShadow="lg">
                Watch Trailer
              </Button>
            </Flex>
            <Box>
              <Heading size="sm" mb={2}>Overview</Heading>
              <Text fontSize="md" color="gray.300">{singleMovie.overview}</Text>
            </Box>
            <Flex wrap="wrap" justify="space-between" w="100%">
              <Box mb={2}>
                <Text fontSize="xs" fontWeight="bold" color="gray.400">Status:</Text>
                <Text fontSize="sm">{singleMovie.status}</Text>
              </Box>
              <Box mb={2}>
                <Text fontSize="xs" fontWeight="bold" color="gray.400">Release Date:</Text>
                <Text fontSize="sm">{singleMovie.release_date}</Text>
              </Box>
              <Box mb={2}>
                <Text fontSize="xs" fontWeight="bold" color="gray.400">Runtime:</Text>
                <Text fontSize="sm">{convertRuntime(singleMovie.runtime)}</Text>
              </Box>
            </Flex>
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400">Director:</Text>
              <Text fontSize="sm">''</Text>
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400">Writer:</Text>
              <Text fontSize="sm">Zach Baylin, Will Schneider</Text>
            </Box>
          </VStack>
        </Flex>

        {/* Cast Section */}
        <Box mt='160px'>
          <Heading size="lg" mb={4} color="white">Caste</Heading>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={6} py={4}>
            {castData.cast.map((cast) => (
              <VStack
                key={cast.id}
                spacing={3}
                align="center"
                bg="rgba(255, 255, 255, 0.1)"
                borderRadius="md"
                p={4}
                boxShadow="lg"
                transition="all 0.3s ease"
                _hover={{
                  boxShadow: '2xl',
                  transform: 'scale(1.1)',
                  bg: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <Image
                  src={`${baseURL}${cast.profile_path}`}
                  alt={cast.name}
                  borderRadius="full"
                  boxSize="120px"  // Fixed size for the images
                  objectFit="cover"
                  boxShadow="md"
                />
                <Text fontSize="md" fontWeight="bold" textAlign="center">{cast.name}</Text>
                <Text fontSize="xs" color="gray.300">{cast.character}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}

export default SingleItem;
