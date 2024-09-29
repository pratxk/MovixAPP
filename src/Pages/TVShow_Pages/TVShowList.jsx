import { Box } from '@chakra-ui/react'
import React from 'react'
import { InfiniteContextProvider } from '../../Context/InfiniteScrollContext/InfiniteContext'
import TvShow from './TvShow'


const TvShowList = () => {
    return (
        <>
            <Box px='12em'>
                <Box>
                    <InfiniteContextProvider>
                        <TvShow />
                    </InfiniteContextProvider>
                </Box>

            </Box >
        </>
    )
}

export default TvShowList