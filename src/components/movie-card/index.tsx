import React from "react";
import { MovieDataType } from "../../assets/data";
import { useMovieContext } from "../../context/movie-context";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import moviesIcon from "../../assets/icons/icon-category-movie.svg";
import tvSeriesIcon from "../../assets/icons/icon-category-tv.svg";
import BookmarkIcon from "../icons/bookmark-icon";
import BookmarkEmptyIcon from "../icons/bookmark-empty-icon";

interface MovieCardProps {
  movie: MovieDataType;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { state, dispatch } = useMovieContext();

  const handleToggleBookmark = (id: string) => {
    dispatch({ type: "TOGGLE_BOOKMARK", id });
  };

  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "transparent", color: "#E0E0E0", my: 3, border: "none" }}
    >
      <CardContent sx={{ p: 0, position: "relative" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <img
              src={movie.thumbnail?.regular?.large || "fallback-image-url"}
              alt={movie.title}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Typography
                  fontSize={10}
                  color="#E0E0E0"
                  aria-label="year of movie"
                >
                  {movie.year}
                </Typography>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    width: "4px",
                    height: "4px",
                    background: "#BDBDBD",
                    borderRadius: "50%",
                  }}
                />
              </Grid>
              <Grid item>
                <img
                  src={movie.category === "Movies" ? moviesIcon : tvSeriesIcon}
                  alt=""
                  width={16}
                  height={16}
                />
              </Grid>
              <Grid item>
                <Typography
                  fontSize={10}
                  color="#E0E0E0"
                  aria-label="movie category"
                >
                  {movie.category}
                </Typography>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    width: "4px",
                    height: "4px",
                    background: "#BDBDBD",
                    borderRadius: "50%",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  fontSize={10}
                  color="#E0E0E0"
                  aria-label="movie rating"
                >
                  {movie.rating}
                </Typography>
              </Grid>
            </Grid>
            <Typography aria-label="movie title" padding={0}>
              {movie.title}
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ position: "absolute", top: 0, right: 0 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                p: "1rem",
              }}
            >
              <Box
                sx={{
                  p: "1rem",
                  backgroundColor: "black",
                  borderRadius: "100%",
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
                onClick={() => handleToggleBookmark(movie.id)}
                aria-label={
                  movie.isBookmarked ? "Remove bookmark" : "Add bookmark"
                }
              >
                {movie.isBookmarked ? (
                  <BookmarkIcon fill={"#E0E0E0"} />
                ) : (
                  <BookmarkEmptyIcon />
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MovieCard;

