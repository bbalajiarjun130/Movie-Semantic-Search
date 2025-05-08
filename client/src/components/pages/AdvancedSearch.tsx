import { useState, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from "../layout/PageLayout";
import MovieCard from "../movies/MovieCard";
import { mockMovies, genres } from "@/data/mockMovies";
import { Movie } from "@/types/movie";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CheckboxGroup } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const yearRange = { min: 1900, max: new Date().getFullYear() };
const ratingRange = { min: 0, max: 10 };

const AdvancedSearch = () => {
  const [results, setResults] = useState<Movie[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  
  // Form state
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [yearFrom, setYearFrom] = useState(yearRange.min.toString());
  const [yearTo, setYearTo] = useState(yearRange.max.toString());
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [ratingFrom, setRatingFrom] = useState(0);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const filtered = mockMovies.filter(movie => {
      // Title filter
      if (title && !movie.title.toLowerCase().includes(title.toLowerCase())) {
        return false;
      }
      
      // Director filter
      if (director && !movie.director.toLowerCase().includes(director.toLowerCase())) {
        return false;
      }
      
      // Year range filter
      const year = movie.year;
      if (year < Number(yearFrom) || year > Number(yearTo)) {
        return false;
      }
      
      // Genre filter
      if (selectedGenres.length > 0 && !selectedGenres.some(genre => movie.genre.includes(genre))) {
        return false;
      }
      
      // Rating filter
      if (ratingFrom > 0 && (!movie.rating || movie.rating < ratingFrom)) {
        return false;
      }
      
      return true;
    });
    
    setResults(filtered);
    setShowResults(true);
    
    if (filtered.length === 0) {
      toast({
        title: "No results found",
        description: "Try adjusting your search criteria",
        variant: "destructive",
      });
    } else {
      toast({
        title: `Found ${filtered.length} movies`,
        description: "Search completed successfully",
      });
    }
  };
  
  const resetForm = () => {
    setTitle("");
    setDirector("");
    setYearFrom(yearRange.min.toString());
    setYearTo(yearRange.max.toString());
    setSelectedGenres([]);
    setRatingFrom(0);
    setShowResults(false);
  };
  
  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Advanced Search</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" /> Search Filters
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Movie Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter movie title" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="director">Director</Label>
                    <Input 
                      id="director" 
                      placeholder="Enter director name" 
                      value={director}
                      onChange={(e) => setDirector(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="yearFrom">Year From</Label>
                      <Input 
                        id="yearFrom" 
                        type="number"
                        min={yearRange.min}
                        max={yearRange.max}
                        value={yearFrom}
                        onChange={(e) => setYearFrom(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="yearTo">Year To</Label>
                      <Input 
                        id="yearTo" 
                        type="number"
                        min={yearRange.min}
                        max={yearRange.max}
                        value={yearTo}
                        onChange={(e) => setYearTo(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="genres">Genres</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select genres" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Minimum Rating: {ratingFrom}</Label>
                    <Slider
                      value={[ratingFrom]}
                      min={0}
                      max={10}
                      step={0.5}
                      onValueChange={(vals) => setRatingFrom(vals[0])}
                      className="mt-2"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Search
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm} 
                    className="w-full"
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="md:col-span-2">
            {showResults ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Search Results ({results.length})</h2>
                
                {results.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((movie) => (
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
                ) : (
                  <div className="text-center py-16 bg-card rounded-lg border border-border">
                    <h3 className="text-xl font-medium mb-2">No movies found</h3>
                    <p className="text-muted-foreground">Try adjusting your search criteria</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-card rounded-lg border border-border h-full flex flex-col items-center justify-center">
                <h3 className="text-xl font-medium mb-2">Advanced Movie Search</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Use the filters to narrow down your search and find exactly what you're looking for
                </p>
                <Filter className="h-16 w-16 text-primary/30" />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdvancedSearch;
