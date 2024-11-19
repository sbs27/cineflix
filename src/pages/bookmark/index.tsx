import React, { useState } from "react";
import { useMovieContext } from "../../context/movie-context";
import { MovieDataType } from "../../assets/data"; // Ensure consistency

const BookmarkPage: React.FC = () => {
  const { state } = useMovieContext();
  const { movies } = state;

  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState<MovieDataType[]>([]);

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
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
      />
      <div>
        {search
          ? searchList.map((movie) => <div key={movie.id}>{movie.title}</div>)
          : bookmarks.map((movie) => <div key={movie.id}>{movie.title}</div>)}
      </div>
    </div>
  );
};

export default BookmarkPage;


