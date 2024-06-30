import "./App.css";
import React from 'react';
import Home from "./Pages/Home";
import SearchResult from "./Pages/SearchResult";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieCard from "./Components/MovieCard";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<MovieCard />} />
                    <Route
                        exact
                        path="/search/:id"
                        element={<SearchResult />}
                    />
                    
                </Routes>
            </Router>
        </div>
    );
}

export default App;