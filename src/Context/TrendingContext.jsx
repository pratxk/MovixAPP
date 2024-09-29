import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const trendingContext = createContext();

export const TrendingContextProvider = ({ children }) => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingWeeklyMovies, setTrendingWeeklyMovies] = useState([]);
    const [state, setState] = useState(true);
    const [error, setError] = useState(null);
    // Add loading states
    const [loadingDaily, setLoadingDaily] = useState(false);
    const [loadingWeekly, setLoadingWeekly] = useState(false);

    const getTrendingWeeklyMovies = async () => {
        setLoadingWeekly(true);
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg'
        const config = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const res = await axios.get('https://api.themoviedb.org/3/trending/movie/week?language=en-US', config);
            const movie = res.data;
            console.log('Movie', movie);
            setTrendingWeeklyMovies(movie.results);
            setLoadingWeekly(false);
            setTimeout(() => {
                console.log(trendingWeeklyMovies)
            }, 5000);
        } catch (error) {
            setError(error.message);
            setLoadingWeekly(false);
        }
    }
    const getTrendingMovies = async () => {
        setLoadingDaily(true);
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg'
        const config = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const res = await axios.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US', config);
            const movie = res.data;
            console.log('Movie', movie);
            setTrendingMovies(movie.results);
            setLoadingDaily(false);
            setTimeout(() => {
                console.log(trendingMovies)
            }, 5000);
        } catch (error) {
            setError(error.message);
            setLoadingDaily(false);
        }
    }
    const handleState = (value) => {
        setState(value);
    };

    // Then pass handleState to ToggleSwitch


    // useEffect(() => {
    //     getPopularMovies();
    // }, []);

    return <trendingContext.Provider value={{ 
        trendingMovies, 
        trendingWeeklyMovies, 
        state, 
        getTrendingWeeklyMovies, 
        handleState, 
        error, 
        getTrendingMovies,
        loadingDaily,
        loadingWeekly
    }}>
        {children}
    </trendingContext.Provider>
}