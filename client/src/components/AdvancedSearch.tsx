import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavTabs from './NavTabs';

const AdvancedSearch: React.FC = () => {
  const [filters, setFilters] = useState({
    title: '',
    genre: '',
    releasedYear: '',
    Director: '',
    rating: '',
  });
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/movies/advanced-search", {
        ...filters,
      });
      setResults(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <NavTabs />
      <h1 className="text-2xl font-bold mb-4">Advanced Movie Search</h1>
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">← Back to Simple Search</Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={handleFilterChange}
          placeholder="Title"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="genre"
          value={filters.genre}
          onChange={handleFilterChange}
          placeholder="Genre"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="releasedYear"
          value={filters.releasedYear}
          onChange={handleFilterChange}
          placeholder="Released Year"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="Director"
          value={filters.Director}
          onChange={handleFilterChange}
          placeholder="Director"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
          placeholder="Rating"
          className="p-2 border rounded"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      <ul className="mt-6 space-y-4">
        {results.map((movie, idx) => (
          <li key={idx} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-600">{movie.genre} • {movie.releasedYear}</p>
            <p className="text-sm text-gray-700">Director: {movie.Director}</p>
            <p className="text-sm text-gray-700">Rating: {movie.rating}</p>
            <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
              movie.matchType === "exact match"
                ? "bg-green-200 text-green-800"
                : movie.matchType === "partial match"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-gray-200 text-gray-800"
            }`}>
              {movie.matchType}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvancedSearch;
