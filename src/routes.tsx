// routes.tsx
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Movie from "./pages/movie";
import TvSeries from "./pages/tv-series";
import Error from "./pages/error";
import Home from "./pages/home";
import Bookmark from "./pages/bookmark";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/movies",
    element: <Movie />,
  },
  {
    path: "/tv-series",
    element: <TvSeries />,
  },
  {
    path: "/bookmark",
    element: <Bookmark />,
  },
  // {
  //   path: "*",
  //   element: <Error />,
  // },
]);
