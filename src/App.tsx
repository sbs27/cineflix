import React from "react";
import { RouterProvider } from "react-router-dom";
import { MovieProvider } from "./context/movie-context";
import { router } from "./routes"; // Import the router with all your routes
import "./App.css";

function App() {
  return (
    <MovieProvider>
      <RouterProvider router={router} />
    </MovieProvider>
  );
}

export default App;


