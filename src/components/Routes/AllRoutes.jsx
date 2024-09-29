import React from 'react'
import Navbar from '../Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../../Pages/Home'
import Footer from '../Footer/Footer'
import HomeRoute from './HomeRoute'
import MovieWrapper from '../Wrappers/movieWrapper/MovieWrapper'
import SingleItem from '../../Pages/SIngle_Pages/SingleItem'
import MoviesList from '../../Pages/Movie_Pages/MoviesList'
import TvShowList from '../../Pages/TVShow_Pages/TVShowList'
import TvShowWrapper from '../Wrappers/tvshowWrapper/TvShowWrapper'
import { SearchContextProvider } from '../../Context/SearchContext/SearchContext'
import { SingleContextProvider } from '../../Context/SinglePageContext/SinglePageContext'
import axios from 'axios'
import SingleTvItem from '../../Pages/SIngle_Pages/SingleTvItem'

const getSingleMovie = async (id) => {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg'
  const config = {
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
      },
  };
  try {
      const res1 = (await axios.get(`https://api.themoviedb.org/3/movie/${id}`, config)).data;
      const res2 = (await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, config)).data;
      return {
        singleMovie:res1,
        castData:res2
      }
  } catch (error) {
      console.log(error)
  }
}
const getSingleTVShow = async (id) => {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTQ5YzJkMjc0ZGMxMTljZjgzOWE2MzJlZTY3Mzg4OSIsIm5iZiI6MTcyNzMyMTA3Ni43NzgyMiwic3ViIjoiNjZmNGMxYmQ1ZTM1NGM1MDEyNzNkNzIyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.URRGeEEIliDxWIGrNW3Sxq-ranymEiZ5IlDfP1ssHvg'
  const config = {
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
      },
  };
  try {
      const res1 = (await axios.get(`https://api.themoviedb.org/3/tv/${id}`, config)).data;
      const res2 = (await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits`, config)).data;
      return {
        seriesData:res1,
        castData:res2
      }
  } catch (error) {
      console.log(error)
  }
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
    children: [
      {
        index: true,
        element: <SingleContextProvider><SearchContextProvider> <Home /></SearchContextProvider></SingleContextProvider>
      },
      {
        path: '/movies',
        element: <MovieWrapper />,
        children: [
          {
            path: ':id',
            element: <SingleItem />,
            loader: (e)=>{
              return getSingleMovie(e.params.id)
            }
          },
          {
            index: true,
            element: <MoviesList />,
          }
        ]
      },
      {
        path: '/tvshows',
        element: <TvShowWrapper />,
        children: [
          {
            path: ':id',
            element: <SingleTvItem/>,
            loader: (e)=>{
              return getSingleTVShow(e.params.id)
              }
          },
          {
            index: true,
            element: <TvShowList />
          }
        ]
      }
    ]
  }
]);

const AllRoutes = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default AllRoutes
