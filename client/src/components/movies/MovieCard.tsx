import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MovieCardProps {
  id: string;
  title: string;
  year: number;
  genre: string[];
  poster: string;
  rating?: number;
}

const MovieCard = ({ id, title, year, genre, poster, rating }: MovieCardProps) => {
  return (
    <Card className="overflow-hidden movie-card border-border/50 bg-card/50">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={poster}
          alt={`${title} poster`}
          className="object-cover w-full h-full transition-all hover:scale-105"
        />
        {rating && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              ★ {rating.toFixed(1)}
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <p className="text-muted-foreground text-sm">{year}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2 flex-wrap">
        {genre.slice(0, 2).map((g) => (
          <Badge key={g} variant="outline" className="text-xs">
            {g}
          </Badge>
        ))}
        {genre.length > 2 && (
          <Badge variant="outline" className="text-xs">
            +{genre.length - 2}
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default MovieCard;