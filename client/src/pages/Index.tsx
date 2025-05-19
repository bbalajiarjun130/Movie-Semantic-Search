import React from "react";
import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import SearchBar from "../components/movies/SearchBar";
import MovieCard from "../components/movies/MovieCard";
import { Button } from "../components/ui/button";
import { mockMovies } from "../data/mockMovies";
import { Movie } from "../components/types";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";

const Index = () => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>(mockMovies);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    if (query.length > 0) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    } else {
      toast({
        title: "Please enter a search term",
        description: "Type something to search for movies",
        variant: "destructive",
      });
    }
  };

  return (
    <PageLayout>
      <div className="container py-8 md:py-12">
        <section className="relative py-16 md:py-24 px-4 rounded-lg overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="relative max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Discover Your Next Favorite Movie
            </h1>
            <p className="text-lg text-foreground/80 mb-8">
              Search through our extensive collection of films and find what to watch next
            </p>
            <div className="max-w-xl mx-auto">
              <SearchBar onSearch={handleSearch} placeholder="Search by title, director, or actor..." />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Movies</h2>
            <Button variant="outline" onClick={() => navigate("/search")}>View All</Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {featuredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.year}
                genre={movie.genre}
                poster={movie.poster}
                rating={movie.rating}
              />
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Index;