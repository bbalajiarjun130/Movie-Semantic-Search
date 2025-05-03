import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavTabs() {
    const navigate = useNavigate();

    return (
        <div className="nav-tabs">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/advanced-search")}>Advanced Search</button>
            <button onClick={() => navigate("/add-movie")}>Add Movie</button>
            <button onClick={() => navigate("/about")}>About</button>
            <button onClick={() => navigate("/contact")}>Contact</button>
        </div>
    );
} 