import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Box, Typography } from "@mui/material";
import MovieList from "../../components/movie-list";
import { MovieDataType } from "../../assets/data";
import { useMovieContext } from "../../context/movie-context";

const MoviesPage = () => {
  const [search, setSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<MovieDataType[]>([]);

  // Access movies from the context
  const { state: { movies } } = useMovieContext();

  // Update filtered movies based on search
  useEffect(() => {
    if (search === "") {
      setFilteredMovies(movies); // Show all movies if search is empty
    } else {
      const filtered = movies.filter((movie: MovieDataType) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [search, movies]);

  return (
    <Layout>
      <Box>
        <Typography variant="h5" component="h1" my={6} fontWeight={400}>
          Movies
        </Typography>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "20px",
          }}
        />
        <MovieList recommendList={filteredMovies} />
      </Box>
    </Layout>
  );
};

export default MoviesPage;

