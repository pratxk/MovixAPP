import { Box } from '@chakra-ui/react'
import React from 'react'
import { InfiniteContextProvider } from '../../Context/InfiniteScrollContext/InfiniteContext'
import Movie from './Movie'

const MoviesList = () => {
    return (
        <>
            <Box px='12em'>
                <Box>
                    <InfiniteContextProvider>
                        <Movie />
                    </InfiniteContextProvider>
                </Box>

            </Box >
        </>
    )
}

export default MoviesList