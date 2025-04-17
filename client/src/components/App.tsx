import React, { useState } from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);

    const handleSearch = async (term: string) => {
        setSearchTerm(term);
        if (term) {
            const response = await fetch(`https://api.example.com/movies?search=${term}`);
            const data = await response.json();
            setMovies(data.results);
        } else {
            setMovies([]);
        }
    };

    return (
        <div className="app">
            <h1>Movie Search</h1>
            <SearchBar onSearch={handleSearch} />
            <MovieList movies={movies} />
        </div>
    );
};

export default App;