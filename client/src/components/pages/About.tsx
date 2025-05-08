import PageLayout from "../layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Film, Info, Search, Plus, Mail } from "lucide-react";

const About = () => {
  return (
    <PageLayout>
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Info className="text-primary h-8 w-8" />
            About CineSeek
          </h1>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                CineSeek was created to help movie enthusiasts discover, explore, and organize their 
                favorite films. Our platform provides a comprehensive database of movies from various 
                genres, decades, and cultures, all searchable with our powerful search tools.
              </p>
              <p className="text-muted-foreground">
                Whether you're a casual viewer looking for tonight's watch or a dedicated cinephile 
                building your collection, CineSeek helps you find exactly what you're looking for 
                and discover new favorites along the way.
              </p>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-semibold mb-6">Features</h2>
          
          <div className="grid gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Simple Search</h3>
                    <p className="text-muted-foreground">
                      Quickly find movies by title, director, actor, or genre with our intuitive search bar.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Film className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Advanced Filtering</h3>
                    <p className="text-muted-foreground">
                      Narrow down your search with our advanced filters including year, rating, runtime, and more.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Contribute</h3>
                    <p className="text-muted-foreground">
                      Add missing movies to our database and help build our community-driven film collection.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Get in Touch</h3>
                    <p className="text-muted-foreground">
                      Have questions or feedback? Reach out to our team through our contact form.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                CineSeek began as a passion project by a group of film lovers who wanted a better way to 
                discover and track movies. What started as a simple list-making tool has evolved into 
                a comprehensive platform designed for movie enthusiasts of all kinds.
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to offer a growing database of films spanning decades of cinema history, 
                with detailed information, curated recommendations, and community-driven content. 
                Our goal is to make the world of cinema more accessible and enjoyable for everyone.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;