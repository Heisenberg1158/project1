import React, { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import "../Components/styles/HomeStyles.css";
import MovieCard from "../Components/MovieCard";

const Home = () => {
    const apiKey = "api_key=5a858c8326da3f328024afc1c5dca9e9";
    const [list, setList] = useState([]);
    const [homeGenreList, setHomeGenreList] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [currMovies, setCurrMovies] = useState([]);

    useEffect(() => {
        setCurrMovies([]);
        setSelectedGenres([]);
        setHomeGenreList([]);
        setList([]);
        
        // Getting the list of all movies from our flask server for our searchbar
        fetch("/api/movies")
            .then((response) => response.json())
            .then((data) => {
                console.log("Movies List:", data.arr);
                setList(data.arr);
            });
        
        // Getting the list of all genres
        fetch(`https://api.themoviedb.org/3/genre/movie/list?${apiKey}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Genres List:", data.genres); // Log to verify the data
                setHomeGenreList(data.genres);
            })
            .catch((error) => {
                console.error("Error fetching genres:", error);
            });
    }, []);

    useEffect(() => {
        console.log("Home Genre List Updated:", homeGenreList); // Log state changes
    }, [homeGenreList]);

    useEffect(() => {
        setCurrMovies([]);
        if (selectedGenres.length > 0) {
            fetch(
                `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${apiKey}&release_date.lte=2019-12-12&with_genres=${encodeURI(
                    selectedGenres.join(",")
                )}`
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log("Selected Genre Movies:", data.results);
                    setCurrMovies(data.results);
                });
        }
    }, [selectedGenres]);

    const onTagClick = (genreId) => {
        let isPresent = false;
        for (let id of selectedGenres) {
            if (id === genreId) {
                isPresent = true;
                break;
            }
        }
        if (isPresent) {
            setSelectedGenres(
                selectedGenres.filter((item) => item !== genreId)
            );
        } else {
            setSelectedGenres((selectedGenres) => [...selectedGenres, genreId]);
        }
    };

    const renderMovies = () =>
        currMovies.map((movie) => {
            if (movie) {
                return (
                    <MovieCard
                        key={movie.id + movie.original_title}
                        movie={movie}
                    />
                );
            } else {
                return null;
            }
        });

    const handleSearch = (selectedMovie) => {
        const filteredMovies = list.filter((movie) =>
            movie.title.toLowerCase().includes(selectedMovie.toLowerCase())
        );
        setCurrMovies(filteredMovies);
    };

    return (
        <div className="container-fluid">
            <div className="HomePage">
                <NavBar isHome={false} />
                <div className="HomeSearch">
                    {/* Rendering the searchbar */}
                    <SearchBar
                        onSearch={handleSearch}
                        movies={list.map(movie => movie.title)}
                        placeholder="Search for a Movie"
                    />
                </div>

                <h2 className="genreHeader">Get Top Movies Based On Genre</h2>
                <div className="buttonGrid">
                    {homeGenreList.length > 0 ? (
                        homeGenreList.map((genre) => (
                            <div
                                key={genre.id}
                                onClick={() => onTagClick(genre.id)}
                                className={
                                    selectedGenres.includes(genre.id)
                                        ? "genreTagON"
                                        : "genreTagOFF"
                                }
                            >
                                {genre.name}
                                {selectedGenres.includes(genre.id) ? (
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                ) : null}
                            </div>
                        ))
                    ) : (
                        <p>Loading genres...</p> // Show a loading state if genres are not loaded
                    )}
                </div>
            </div>
            {/* Rendering selected genre movies */}
            <div className="container-fluid HomeMovies">
                <div className="container HomeMovieGrid">
                    {currMovies.length > 0 ? renderMovies() : null}
                </div>
            </div>
            <div className="HomeFooter">
                <Footer />
            </div>
        </div>
    );
};

export default Home;
