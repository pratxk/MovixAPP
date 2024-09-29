import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const searchContext = createContext();

export const SearchContextProvider = ({children}) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchState, setSearchState] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getSearchResults = async (keyword) => {
        setLoading(true);
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg'
        const config = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=false&language=en-US&page=1`, config);
            const search = res.data;
            console.log('Key-Results', search.results);
            setSearchResults(search.results);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    
    console.log('checkFunc',searchResults)

    // useEffect(() => {
    //     getPopularMovies();
    // }, []);

    return (
        <searchContext.Provider 
            value={{
                searchResults,
                error,
                getSearchResults,
                setSearchState,
                loading,
                setSearchResults
            }}
        >
            {children}
        </searchContext.Provider>
    );
}