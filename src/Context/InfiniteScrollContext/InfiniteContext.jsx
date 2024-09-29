import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const infiniteContext = createContext();

export const InfiniteContextProvider = ({children}) => {
    const [infiniteMovies, setInfiniteMovies] = useState([]);
    const [infiniteTvShows, setInfiniteTvShows] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const getInfiniteTvShows= async (p,genre_id='', sort='') => {
        setLoading(true);
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg'
        const config = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${p}&sort_by=popularity.${sort}&with_genres=${genre_id}`, config);
            const tvshows = res.data;
            console.log('Movie-infinite', tvshows.results);
            const mainData = tvshows.results;
            setLoading(false);
            return mainData;
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    const getInfiniteMovies = async (p,genre_id='', sort='') => {
        setLoading(true);
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg'
        const config = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${p}&sort_by=popularity.${sort}&with_genres=${genre_id}`, config);
            const movie = res.data;
            console.log('Movie-infinite', movie.results);
            const movies = movie.results;
            setLoading(false);
            return movies;
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    console.log({infiniteMovies});

    // useEffect(() => {
    //     getPopularMovies();
    // }, []);

    return (
        <infiniteContext.Provider 
            value={{
                infiniteMovies, 
                error,
                page,
                setPage, 
                setInfiniteMovies, 
                getInfiniteMovies,
                loading,
                infiniteTvShows,
                setInfiniteTvShows,
                getInfiniteTvShows,
            }}
        >
            {children}
        </infiniteContext.Provider>
    );
}