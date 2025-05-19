
export interface Movie {
  id: string;
  title: string;
  year: number;
  director: string;
  genre: string[];
  poster: string;
  plot: string;
  rating?: number;
  runtime?: string;
  actors?: string[];
}