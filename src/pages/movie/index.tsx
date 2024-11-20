import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Box, Typography } from "@mui/material";
import MovieList from "../../components/movie-list";
import { MovieDataType } from "../../assets/data";
import { useMovieContext } from "../../context/movie-context";


const MoviePage = () => {
  const [filteredMovies, setFilteredMovies] = useState<MovieDataType[]>([]);

  const { state: { movies, user }, dispatch } = useMovieContext();

  // Filter movies for "recommendation"
  const recommendList = movies.filter((movie: MovieDataType) => !movie.isTrending);

  // Handle bookmark toggling
  const handleBookmark = (id: string) => {
    dispatch({ type: "TOGGLE_BOOKMARK", id });
  };

  // Filter movies based on search input or other criteria
  useEffect(() => {
    // Set filtered movies for recommendations (or based on search logic)
    setFilteredMovies(recommendList);  // or implement other filters here
  }, [movies]);

  return (
    <Box>
      <Typography variant="h5" component="h1" my={6} fontWeight={400}>
        Recommended Movies
      </Typography>
      <MovieList recommendList={filteredMovies} onBookmark={handleBookmark} />
    </Box>
  );
};

export default MoviePage;


