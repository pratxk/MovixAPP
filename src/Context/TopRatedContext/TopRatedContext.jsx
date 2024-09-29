import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const topRatedContext = createContext();

export const TopRatedContextProvider = ({children}) =>{
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedTvShows, setTopRatedTvShows] = useState([]);
    const [state, setState] = useState(true);
    const [error, setError] = useState(null);
    // Add loading states
    const [isLoadingMovies, setIsLoadingMovies] = useState(true);
    const [isLoadingTvShows, setIsLoadingTvShows] = useState(true);

    const getTopRatedTvShows = async () =>{
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg'
        const config = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const res =  await axios.get('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', config);
            const tvshows = res.data;
            setTopRatedTvShows(tvshows.results);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoadingTvShows(false);
        }
    }

    const getTopRatedMovies = async () =>{
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg'
        const config = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const res =  await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', config);
            const movie = res.data;
            setTopRatedMovies(movie.results);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoadingMovies(false);
        }
    }

    const handleState = (value) => {
        setState(value);
    };

    // useEffect(() => {
    //     getPopularMovies();
    // }, []);

    return <topRatedContext.Provider value={{
        topRatedMovies, 
        error, 
        state, 
        topRatedTvShows, 
        getTopRatedTvShows, 
        handleState, 
        getTopRatedMovies,
        isLoadingMovies,
        isLoadingTvShows
    }}>
        {children}
    </topRatedContext.Provider>
}