
export type Movie = {
    title: string;
    genre: string;
    releasedYear: number;
    Director: string;
    Cast: string[];
    rating: number;
    description: string;
    similarity: number;
    matchType: "exact match" | "partial match";
  };