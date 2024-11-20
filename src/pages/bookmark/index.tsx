// pages/bookmark/index.tsx
import React, { useState, useEffect } from "react";
import { useMovieContext } from "../../context/movie-context";
import { MovieDataType } from "../../assets/data";

const BookmarkPage = () => {
  const { state } = useMovieContext(); // Access state from context
  const { movies } = state;

  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState<MovieDataType[]>([]);

  // Filter for movies that are bookmarked
  const bookmarks = movies.filter((movie) => movie.isBookmarked);

  // Handle the search input and filter the bookmarked movies
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    // Filter based on search term in movie title
    const filteredList = bookmarks.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchList(filteredList);
  };

  useEffect(() => {
    // If no bookmarks are present, you could show a message or something
    if (bookmarks.length === 0 && search === "") {
      console.log("No bookmarked movies.");
    }
  }, [bookmarks, search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search bookmarks..."
        value={search}
        onChange={handleSearch}
        style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
      />
      <div>
        {search
          ? searchList.length > 0
            ? searchList.map((movie) => <div key={movie.id}>{movie.title}</div>)
            : "No results found"
          : bookmarks.length > 0
          ? bookmarks.map((movie) => <div key={movie.id}>{movie.title}</div>)
          : "No bookmarks found"}
      </div>
    </div>
  );
};

export default BookmarkPage;






