import React, { useState } from "react";
import { useMovieContext } from "../../context/movie-context";
import { MovieDataType } from "../../assets/data";
import MovieCard from "../../components/movie-card"; // Use your current MovieCard component
import { Box, Typography } from "@mui/material";

const Bookmark = () => {
  const { state } = useMovieContext();
  const { movies = [] } = state;

  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState<MovieDataType[]>([]);

  // Filter for bookmarked movies
  const bookmarks = movies.filter((movie) => movie.isBookmarked);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    const filteredList = bookmarks.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchList(filteredList);
  };

  return (
    <Box px={3} py={5} sx={{ backgroundColor: "#10141f", minHeight: "100vh" }}>
      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <input
          type="text"
          placeholder="Search bookmarks..."
          value={search}
          onChange={handleSearch}
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </Box>

      {/* Bookmark Results */}
      {search && searchList.length === 0 && (
        <Typography color="white" variant="h6" textAlign="center">
          No results found.
        </Typography>
      )}
      {!search && bookmarks.length === 0 && (
        <Typography color="white" variant="h6" textAlign="center">
          No bookmarks found.
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: searchList.length > 0 || bookmarks.length > 0 ? "flex-start" : "center",
        }}
      >
        {(search ? searchList : bookmarks).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
    </Box>
  );
};

export default Bookmark;








