import React from "react";
import { Film } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Film className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CineSeek
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition">
              Home
            </Link>
            <Link to="/search" className="text-muted-foreground hover:text-foreground transition">
              Search
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CineSeek. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;