import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { Movie } from './types';


export default function MovieSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:4000/api/movies/search", {
                query,
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-blob "> Movie Semantic Search</h1>
            <div className='flex space-x-2 mt-4"'>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie..."
                    className="lex-grow px-3 py-2 border rounded-lg shadow"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Search
                </button>
            </div>
        {loading && <p className="mt-4">Loading...</p>}
        
        <ul className="space-y-4 mt-6">
            {results.map((movie, idx) => (
                <li key={idx} className="p-4 border rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                    <p className="text-sm text-gray-600">{movie.genre} • {movie.releasedYear}</p>
                    <p className="text-sm text-gray-700">Director: {movie.Director}</p>
                    <p className="text-sm text-gray-700">Rating: {movie.rating}</p>
                    <p className="text-sm text-gray-700">Cast: {movie.Cast}</p>
                    <p className="text-sm text-gray-700 mt-1">{movie.description}</p>
                    <span
                        className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                        movie.matchType === 'exact match'
                            ? 'bg-green-200 text-green-800'
                            : movie.matchType === 'partial match'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                {movie.matchType}
                    </span>
                </li>
            ))}
        </ul>
    </div>
    )
}