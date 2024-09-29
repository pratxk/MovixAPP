import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const popularContext = createContext();

export const PopularContextProvider = ({children}) =>{
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTvShows, setPopularTvShows] = useState([]);
    const [error, setError] = useState(null);
    const [state, setState] = useState(true);
    // Add loading states
    const [isLoadingMovies, setIsLoadingMovies] = useState(true);
    const [isLoadingTvShows, setIsLoadingTvShows] = useState(true);

    const getPopularTvShows = async () =>{
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg'
        const config = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const res =  await axios.get('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', config);
            const tvshow = res.data;
            console.log('tvShow',tvshow);
            setPopularTvShows(tvshow.results);
            setTimeout(()=>{
                console.log(popularTvShows)
            },5000);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoadingTvShows(false);
        }
    }
    const getPopularMovies = async () =>{
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg'
        const config = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const res =  await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', config);
            const movie = res.data;
            console.log('Movie',movie);
            setPopularMovies(movie.results);
            setTimeout(()=>{
                console.log(popularMovies)
            },5000);
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

    return <popularContext.Provider value={{
        popularMovies, 
        error, 
        popularTvShows, 
        getPopularTvShows,
        state, 
        handleState,
        getPopularMovies,
        isLoadingMovies,
        isLoadingTvShows
    }}>
        {children}
    </popularContext.Provider>
}