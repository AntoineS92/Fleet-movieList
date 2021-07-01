import { div } from "prelude-ls";
import React, { Component } from "react";

import SearchBar from "./SearchBar";

class MoviesList extends Component {
  state = {
    movies: this.props.list.map((singleMovie) => {
      return { ...singleMovie };
    }),
    searchValue: "",
    clickedMovie: null,
  };

  handleSearchValue = (value) => {
    this.setState({
      searchValue: value,
    });
  };

  handleSingleMovieClick = (event, singleMovie) => {
    console.log("clicked !", event.target, singleMovie);
    this.setState({
      clickedMovie: singleMovie,
    });
    return <div>hello !</div>;
  };

  render() {
    const filteredMovies = this.state.movies.filter((movie) => {
      //check here if the search value matches with the name of one of the movies and returns it (or them)
      return movie.title
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase());
    });

    return (
      <div>
        <div className="searchBar">
          {/* we give as props the function to handle the value and the search value itself so the state modifies when we type in the search bar */}
          <SearchBar
            handleChange={this.handleSearchValue}
            value={this.state.searchValue}
          />
        </div>
        <div className="mainPage">
          <div className="moviesList">
            {/* we only render the filtered movies. If the search Value is empty, it will show every movies anyway */}
            {filteredMovies.map((singleMovie) => {
              return (
                <div
                  className="singleMovie-card"
                  onClick={(event) =>
                    this.handleSingleMovieClick(event, singleMovie)
                  }
                >
                  <h1 className="singleMovie-card-title">
                    {singleMovie.title}
                  </h1>
                </div>
              );
            })}
          </div>

          {this.state.clickedMovie && (
            <div className="clickedMovieDetails">
              <img
                src="https://s.studiobinder.com/wp-content/uploads/2019/06/Movie-Poster-Template-Movie-Credits-StudioBinder.jpg.webp"
                alt="poster"
                className="clickedMovie-img"
              />
              <div className="clickedMovieDetails-mainInfo">
                <h1 id="clickedMovie-title">{this.state.clickedMovie.title}</h1>
                {/* I removed the decimals of the popularity because they don't make a lot of sense for the user */}
                {/* little use of bulma here to try it */}
                <p id="movie-popularity">Popularity : <progress class="progress is-success" value={parseFloat(this.state.clickedMovie.popularity).toFixed(0)} max="100">{this.state.clickedMovie.popularity}</progress></p>
                <p id="movie-releaseDate">Release date : {this.state.clickedMovie.release_date}</p>
              </div>
              <div className="clickedMovieDetails-description">
                <p id="movie-overview">{this.state.clickedMovie.overview}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MoviesList;
