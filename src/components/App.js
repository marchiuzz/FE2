import React from 'react';
import Card from './Card';
import Genre from './Genre'
import axios from 'axios';
import {endpoints, getImageUrl} from '../config';


class App extends React.Component {

    constructor(props) {
        super();

        this.state = {
            moviesList: [],
            genresList: [],
            likedMovies: []
        }
    }

    componentDidMount() {
        axios.get(endpoints.genres())
            .then((data) => {
                this.setState({
                    genresList: data.data.genres
                });
            });


        axios.get(endpoints.mostPopularMovies())
            .then((data) => {
                this.setState({
                    moviesList: data.data.results
                });
            });

    }

    handleGenre = (genreValue) => {
        this.setState({genreId: genreValue}, () =>

            axios.get(endpoints.genreMovies(this.state.genreId))
                .then((data) => {
                    this.setState({
                        moviesList: data.data.results
                    });
                })

        );
    };

    getLikeAction = (value) => {

        var likedMoviesArr = this.state.likedMovies;

        if(likedMoviesArr.includes(value)){
            likedMoviesArr = likedMoviesArr.filter(item => item !== value)
        } else {
            likedMoviesArr.push(value);
        }

        this.setState({
            likedMovies: likedMoviesArr
        });

        console.log(this.state.likedMovies)

    };

    render() {

        return (
            <div className="container">
                <div className="genres">
                    {this.state.genresList.map((genre => (
                        <Genre
                            onSelectGenre={this.handleGenre}
                            key={genre.id}
                            genreId={genre.id}
                            title={genre.name}
                        />
                    )))}
                </div>

                <div className="cards">
                    {this.state.moviesList.map((card) => (
                        <Card
                            key={card.id}
                            movieId={card.id}
                            backgroundImage={getImageUrl(card.backdrop_path)}
                            date={card.release_date}
                            rating={card.vote_average}
                            votes={card.vote_count}
                            description={card.overview}
                            title={card.original_title}

                            likeHandler={this.getLikeAction}
                            isLiked={(this.state.likedMovies).includes(card.id)}

                        />
                    ))}
                </div>

            </div>
        );
    };
}

export default App;