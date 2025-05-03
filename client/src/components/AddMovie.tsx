import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import NavTabs from './NavTabs';

const AddMovie: React.FC = () => {
  type Movie = {
    title: string;
    genre: string;
    releasedYear: string;
    Director: string;
    Cast: string;
    rating: string;
    description: string;
    [key: string]: string;
  };
  const [movie, setMovie] = useState<Movie>({
    title: '',
    genre: '',
    releasedYear: '',
    Director: '',
    Cast: '',
    rating: '',
    description: ''
  });

  const [addedMovie, setAddedMovie] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovie((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/movies/add-movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      const data = await res.json()
      if(res.ok) {
        setAddedMovie(data);
        setMovie({
          title: '',
          genre: '',
          releasedYear: '',
          Director: '',
          Cast: '',
          rating: '',
          description: ''
        });
      } else {
        alert('Failed to add movie: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error adding movie');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <NavTabs />
      <h1 className="text-2xl font-bold mb-4">Add a New Movie</h1>
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">
        ← Back to Simple Search
      </Link>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(movie).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            value={movie[key]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="p-2 border rounded w-full"
          />
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Movie
        </button>
      </form>

      {addedMovie && (
        <div className="mt-8 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Recently Added Movie:</h2>
          <pre className="whitespace-pre-wrap">{JSON.stringify(addedMovie, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AddMovie;