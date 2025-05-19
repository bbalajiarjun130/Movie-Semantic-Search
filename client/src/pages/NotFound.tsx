import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "../components/layout/PageLayout";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLayout>
      <div className="container py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">404</h1>
        <p className="text-2xl font-medium mb-8 text-center">Oops! This scene didn't make the final cut.</p>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          The movie page you're looking for doesn't exist or has been moved to a different location.
        </p>
        <Button asChild size="lg">
          <Link to="/">Return to Homepage</Link>
        </Button>
      </div>
    </PageLayout>
  );
};

export default NotFound;