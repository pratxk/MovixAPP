import React, { useContext } from 'react'
import { searchContext } from '../../Context/SearchContext/SearchContext';
import SearchCard from './SearchCard';
import { Grid, Heading, Text } from '@chakra-ui/react';

const SearchResults = () => {
    const { searchResults } = useContext(searchContext);
    console.log("searchResults------", searchResults);

    if (!searchResults || (Array.isArray(searchResults) && searchResults.length === 0)) {
        return <Text>No Items Found</Text>;
    }

    return (
        <>
            <Grid templateColumns='repeat(5, 1fr)' gap={4}>

                {searchResults.map((item) => (
                    item && <SearchCard key={item.id} item={item} />
                ))}
            </Grid>
        </>
    );
};

export default SearchResults
