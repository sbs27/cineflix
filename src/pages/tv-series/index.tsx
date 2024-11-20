import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Box, Typography } from "@mui/material";
import MovieList from "../../components/movie-list";
import { MovieDataType } from "../../assets/data";
import { useMovieContext } from "../../context/movie-context";

const TVSeriesPage = () => {
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState<MovieDataType[]>([]);

  // Access movies and dispatch from the context
  const {
    state: { movies },
    dispatch,
  } = useMovieContext();

  // Filter TV series
  const tvSeries = movies.filter((movie: MovieDataType) => movie.category === "TV Series");

  // Handle search
  useEffect(() => {
    if (search === "") {
      setSearchList(tvSeries); // Show all TV series if search is empty
    } else {
      const filtered = tvSeries.filter((movie: MovieDataType) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchList(filtered);
    }
  }, [search, tvSeries]);

  // Bookmark toggle handler
  const handleBookmark = (id: string) => {
    dispatch({ type: "TOGGLE_BOOKMARK", id });
  };

  return (
    <Layout>
      <Box>
        <Typography variant="h5" component="h1" my={6} fontWeight={400}>
          TV Series
        </Typography>
        <input
          type="text"
          placeholder="Search TV series..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "20px",
          }}
        />
        {/* Pass handleBookmark to MovieList */}
        <MovieList recommendList={searchList} onBookmark={handleBookmark} />
      </Box>
    </Layout>
  );
};

export default TVSeriesPage;


