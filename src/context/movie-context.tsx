import React, { createContext, useContext, ReactNode, useReducer } from "react";
import { MovieDataType } from "../assets/data"; // Import MovieDataType from assets/data

// Define the User interface
interface User {
  email: string;
  token: string; // Or any other info you need for the user
}

interface MovieState {
  movies: MovieDataType[];
  user: User | null; // user can be null when not logged in
}

type MovieAction =
  | { type: "ADD_MOVIE"; movie: MovieDataType }
  | { type: "TOGGLE_BOOKMARK"; id: string }
  | { type: "SET_USER"; user: User | null }; // Action to set the user

const initialState: MovieState = {
  movies: [],
  user: null, // Initial state, no user logged in
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
      return { ...state, user: action.user }; // Set the user
    default:
      return state;
  }
};

interface MovieContextProps {
  state: MovieState;
  dispatch: React.Dispatch<MovieAction>;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

