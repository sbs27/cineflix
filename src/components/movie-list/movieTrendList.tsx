import React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { MovieDataType } from "../../assets/data";
import BookmarkIcon from "../../assets/icons/icon-nav-bookmark.svg"; // Bookmark icon
import BookmarkFullIcon from "../../assets/icons/icon-bookmark-full.svg"; // Full bookmark icon

interface MovieTrendListProps {
  trendingList: MovieDataType[];
  onBookmark: (id: string) => void;
}

const MovieTrendList = ({ trendingList, onBookmark }: MovieTrendListProps) => {
  return (
    <Box sx={{ padding: "16px 0" }}>
      <Grid container spacing={2} justifyContent="flex-start">
        {trendingList.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
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
                  height: "100%",
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
                <IconButton onClick={() => onBookmark(movie.id)}>
                  <img
                    src={movie.isBookmarked ? BookmarkFullIcon : BookmarkIcon}
                    alt="bookmark"
                    width={24}
                    height={24}
                  />
                </IconButton>
              </Box>
              <Box sx={{ padding: 2 }}>
                <Typography variant="h6" color="white" fontWeight="bold">
                  {movie.title}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieTrendList;






