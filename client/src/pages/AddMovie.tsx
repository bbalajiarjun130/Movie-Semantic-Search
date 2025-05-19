import React from "react";
import { useState } from "react";
import { useToast } from "../components/ui/use-toast";
import PageLayout from "../components/layout/PageLayout";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { genres } from "../data/mockMovies";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../components/ui/form";
import { FilmIcon, Info } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const currentYear = new Date().getFullYear();

const movieFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z.coerce.number().min(1900).max(currentYear),
  director: z.string().min(1, "Director is required"),
  genre: z.string().min(1, "Genre is required"),
  poster: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  plot: z.string().min(10, "Plot should be at least 10 characters"),
  rating: z.coerce.number().min(0).max(10).optional(),
  runtime: z.string().optional(),
  actors: z.string().optional()
});

type MovieFormValues = z.infer<typeof movieFormSchema>;

const AddMovie = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MovieFormValues>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: {
      title: "",
      year: currentYear,
      director: "",
      genre: "",
      poster: "",
      plot: "",
      rating: undefined,
      runtime: "",
      actors: ""
    }
  });

  const onSubmit = (data: MovieFormValues) => {
    setIsSubmitting(true);
    
    // Convert actors string to array
    const formattedData = {
      ...data,
      actors: data.actors ? data.actors.split(",").map(a => a.trim()) : undefined
    };
    
    // Simulate API submission
    setTimeout(() => {
      console.log("Submitted movie:", formattedData);
      setIsSubmitting(false);
      
      toast({
        title: "Movie added successfully!",
        description: `"${data.title}" has been added to the database.`
      });
      
      form.reset();
    }, 1000);
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <FilmIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Add New Movie</h1>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Movie Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter movie title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Release Year</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="Enter release year"
                            min={1900}
                            max={currentYear}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="director"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Director</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter director name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genre</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genres.map((genre) => (
                              <SelectItem key={genre} value={genre}>
                                {genre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="poster"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Poster URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter poster image URL" {...field} />
                        </FormControl>
                        <FormDescription>
                          Link to the movie poster image
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating (0-10)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="Rate from 0 to 10"
                            step="0.1"
                            min={0}
                            max={10}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="runtime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Runtime</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 120 min" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="actors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Actors</FormLabel>
                        <FormControl>
                          <Input placeholder="Comma separated list of actors" {...field} />
                        </FormControl>
                        <FormDescription>
                          Separate names with commas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="plot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plot Summary</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter movie plot summary"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    disabled={isSubmitting}
                  >
                    Reset
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin"></span>
                        Saving...
                      </>
                    ) : (
                      "Add Movie"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AddMovie;
