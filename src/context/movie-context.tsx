import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { moviesData } from "../assets/data";
import { MovieDataType } from "../assets/data";

// User interface definition
interface User {
  email: string;
  token: string;
}

// MovieState interface
interface MovieState {
  movies: MovieDataType[];
  user: User | null;
}

type MovieAction =
  | { type: "ADD_MOVIE"; movie: MovieDataType }
  | { type: "TOGGLE_BOOKMARK"; id: string }
  | { type: "SET_USER"; user: User | null };

// Initial state
const initialState: MovieState = {
  movies: moviesData, // Importing the default movie data
  user: null,
};

const movieReducer = (state: MovieState, action: MovieAction): MovieState => {
  switch (action.type) {
    case "ADD_MOVIE":
      return { ...state, movies: [...state.movies, action.movie] };
    case "TOGGLE_BOOKMARK":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.id
            ? { ...movie, isBookmarked: !movie.isBookmarked }
            : movie
        ),
      };
    case "SET_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
};

interface MovieContextProps {
  state: MovieState;
  dispatch: React.Dispatch<MovieAction>;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = (): MovieContextProps => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};


