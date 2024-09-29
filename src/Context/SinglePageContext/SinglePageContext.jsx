import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const singlePageContext = createContext();

export const SingleContextProvider = ({ children }) => {
    const [singleMovie, setSingleMovie] = useState({});
    const [error, setError] = useState(null);
    // Add loading states
    const [loadingSingleMovie, setLoadingSingleMovie] = useState(false);

    // const getTrendingWeeklyMovies = async () => {
    //     setLoadingWeekly(true);
    //     const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg'
    //     const config = {
    //         headers: {
    //             accept: 'application/json',
    //             Authorization: `Bearer ${token}`,
    //         },
    //     };
    //     try {
    //         const res = await axios.get('https://api.themoviedb.org/3/trending/movie/week?language=en-US', config);
    //         const movie = res.data;
    //         console.log('Movie', movie);
    //         setTrendingWeeklyMovies(movie.results);
    //         setLoadingWeekly(false);
    //         setTimeout(() => {
    //             console.log(trendingWeeklyMovies)
    //         }, 5000);
    //     } catch (error) {
    //         setError(error.message);
    //         setLoadingWeekly(false);
    //     }
    // }
    const getSingleMovie = async (id) => {
        setLoadingSingleMovie(true);
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg'
        const config = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, config);
            const movie = res.data;
            console.log(movie)
            console.log('Movie', movie);
            setSingleMovie(movie);
            setLoadingSingleMovie(false);
        } catch (error) {
            setError(error.message);
            setLoadingSingleMovie(false);
        }
    }

    // Then pass handleState to ToggleSwitch


    // useEffect(() => {
    //     getPopularMovies();
    // }, []);

    return <singlePageContext.Provider value={{ 
        singleMovie,
        error, 
        getSingleMovie,
        loadingSingleMovie
    }}>
        {children}
    </singlePageContext.Provider>
}