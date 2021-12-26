import React, { Component, Fragment} from "react";
import { Link } from "react-router-dom";

export default class OneGenre extends Component {
    state = {
        movies: {},
        isLoaded: false,
        error: null,
        genreName: ''
    };

    async componentDidMount() {
        const res = await fetch(`http://localhost:4000/v1/movies/${this.props.match.params.id}`);
        if (res.status !== 200) {
            const err = Error;
            err.message = `Invalid response code: ${res.status}`;

            this.setState({ error: err });
            return
        }

        const data = await res.json();
        this.setState({
            movies: data.movies,
            isLoaded: true,
            genreName: this.props.location.genreName
        });
    }

    render() {
        let { movies, isLoaded, error, genreName } = this.state;        
        if (!movies) {
            movies = [];
        }
        if (error) {
            return <p>Error {error.message} </p>
        } else {
            return (
                <Fragment>
                    {
                        !isLoaded
                        ? <p>Loading...</p>
                        : (
                            <>
                               <h2>Genre: {genreName}</h2>
                                <div className="list-group">
                                    {movies.map((m, i) => (
                                        <Link 
                                            key={i}
                                            to={`/movies/${m.id}`} 
                                            className="list-group-item list-group-item-action"
                                        >
                                            {m.title}
                                        </Link>                                        
                                    ))}
                                </div> 
                            </>
                        ) 
                    }
                </Fragment>
            )
        }
    }
}