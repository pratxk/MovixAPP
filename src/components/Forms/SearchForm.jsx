import { Box, Button, Input } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { searchContext } from '../../Context/SearchContext/SearchContext'

const SearchForm = () => {
    const { getSearchResults, setSearchState } = useContext(searchContext);
    const [query, setQuery] = useState('')
    const handleChange = (e) => {
        setQuery(e.target.value.trim())
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchState(true);
        getSearchResults(query);
    }
    return (
        <>
            <Box display='flex' mt={6} borderRadius='60px 0px 0px 60px' w='45em' >
                <form onSubmit={handleSubmit} style={{ width: 'inherit', display: 'flex' }}>
                    <Input borderRadius='60px 0px 0px 60px' bg='white' h='60px' value={query} required onChange={handleChange} color='black' placeholder='Enter Your movie name' />
                    <Button
                        color='white'
                        h='60px'
                        w='10em'
                        borderRadius='0px 60px 60px 0px'
                        _hover='none'
                        bg={`linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%)`}
                        type='submit'>
                        Search
                    </Button>
                </form>
            </Box>
        </>
    )
}

export default SearchForm
