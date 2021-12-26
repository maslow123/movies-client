import React, { Component, Fragment} from "react";

export default class OneMovie extends Component {
    state = {
        movie: {},
        isLoaded: false,
        error: null
    };

    async componentDidMount() {
        const res = await fetch(`http://localhost:4000/v1/movie/${this.props.match.params.id}`);
        if (res.status !== 200) {
            const err = Error;
            err.message = `Invalid response code: ${res.status}`;

            this.setState({ error: err });
            return
        }

        const data = await res.json();
        this.setState({
            movie: data.movie,
            isLoaded: true
        });
    }

    render() {
        const { movie, isLoaded, error } = this.state;
        if (movie.genres) {
            movie.genres = Object.values(movie.genres);
        } else {
            movie.genres = []
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
                                <h2>Movie: {movie.title} ({movie.year})</h2>
                                
                                <div className="float-start">
                                    <small>Rating: {movie.mpaa_rating}</small>
                                </div>
                                <div className="float-end">
                                    {movie.genres.map((m, i) => (
                                        <span className="badge bg-secondary me-1" key={i}>
                                            {m}
                                        </span>
                                    ))}
                                </div>
                                <div className="clearfix"/>
                                <hr/>

                                <table className="table table-compact table-striped">
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Title:</strong></td>
                                            <td>{movie.title}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Description:</strong></td>
                                            <td>{movie.description}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Run time:</strong></td>
                                            <td>{movie.runtime}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        ) 
                    }
                </Fragment>
            )
        }
    }
}