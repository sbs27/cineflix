import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import { Box, Paper, InputBase, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "../../assets/icons/icon-search.svg";
import MovieTrendList from "../../components/movie-list/movieTrendList";
import MovieList from "../../components/movie-list"; // Ensure this import is correct
import { MovieDataType } from "../../assets/data";
import { useMovieContext } from "../../context/movie-context";

const Home = () => {
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState<MovieDataType[]>([]);

  const { state: { movies, user }, dispatch } = useMovieContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Filter lists based on trending status
  const trendingList = movies.filter((item: MovieDataType) => item.isTrending === true);
  const recommendList = movies.filter((item: MovieDataType) => item.isTrending !== true);

  // Handle the search logic
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const newList = movies.filter((movie: MovieDataType) =>
      movie.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchList(newList);
  };

  // Handle bookmark toggle
  const handleBookmark = (id: string) => {
    dispatch({ type: "TOGGLE_BOOKMARK", id }); // Dispatch the toggle bookmark action
  };

  return (
    <Layout>
      <Box>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "default",
            p: 1,
            backgroundColor: "#10141f",
            border: "none",
          }}
        >
          <InputBase
            placeholder="Search for movies or TV series"
            sx={{
              ml: 1,
              flex: 1,
              color: "white",
              border: "none",
            }}
            value={search}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <img
                  src={SearchIcon}
                  alt="search icon"
                  width={20}
                  height={20}
                />
              </InputAdornment>
            }
          />
        </Paper>
      </Box>

      <Box py={2} px={4}>
        {search === "" ? (
          <Box width="100%">
            <Typography variant="h5" component="h1" my={6} fontWeight={400}>
              Trending
            </Typography>
            <MovieTrendList trendingList={trendingList} onBookmark={handleBookmark} />
            <Typography variant="h5" component="h1" my={6} fontWeight={400}>
              Recommended For You
            </Typography>
            <MovieList recommendList={recommendList} onBookmark={handleBookmark} />
          </Box>
        ) : (
          <Box width="100%">
            <Typography>
              Found {searchList.length} results for "{search}"
            </Typography>
            <MovieList recommendList={searchList} onBookmark={handleBookmark} />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Home;




