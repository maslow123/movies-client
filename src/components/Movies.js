import React, { Component, Fragment} from "react";
import { Link } from "react-router-dom";

export default class Movies extends Component {
    state = {
        movies: [],
        isLoaded: false,
        error: null
    };

    async componentDidMount() {
        const res = await fetch('http://localhost:4000/v1/movies');
        if (res.status !== 200) {
            const err = Error;
            err.message = `Invalid response code: ${res.status}`;

            this.setState({ error: err });
            return
        }

        const data = await res.json();
        this.setState({
            movies: data.movies,
            isLoaded: true
        });
    }
    render() {
        const { movies, isLoaded, error } = this.state;

        if (error) {
            return <div>Error {error.message} </div>
        } else {
            return (
                <Fragment>
                    {
                        !isLoaded
                        ? <p>Loading...</p>
                        :
                        <>
                            <h2> Choose a movie </h2>                            
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
                    }
                </Fragment>
            )
        }
    }
}