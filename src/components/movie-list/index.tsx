import React from "react";
import { MovieDataType } from "../../assets/data";
import { Grid, Box, IconButton, Typography } from "@mui/material";
import BookmarkIcon from "../../assets/icons/icon-nav-bookmark.svg"; // Empty bookmark icon
import BookmarkFullIcon from "../../assets/icons/icon-bookmark-full.svg"; // Filled bookmark icon

interface MovieListProps {
  recommendList: MovieDataType[];
  onBookmark: (id: string) => void;
}

const MovieList = ({ recommendList, onBookmark }: MovieListProps) => {
  return (
    <Grid container spacing={2}>
      {recommendList.map((movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "10px",
              backgroundColor: "#10141f", // Background color for each card
            }}
          >
            <img
              src={movie.thumbnail.regular.large}
              alt={movie.title}
              style={{
                width: "100%",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 1,
              }}
            >
              <IconButton
                onClick={() => onBookmark(movie.id)}
                sx={{
                  backgroundColor: movie.isBookmarked ? "white" : "black",
                  borderRadius: "50%",
                  padding: "8px", // Adjust padding to fit the icon properly
                  border: "2px solid white", // White border for non-bookmarked
                  boxShadow: "none", // Remove any default box-shadow
                }}
              >
                <img
                  src={movie.isBookmarked ? BookmarkFullIcon : BookmarkIcon}
                  alt="bookmark"
                  width={24}
                  height={24}
                  style={{
                    filter: movie.isBookmarked ? "none" : "invert(1)", // Inverts the color to create the "white lined bookmark" effect
                  }}
                />
              </IconButton>
            </Box>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6" color="white">
                {movie.title}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;










