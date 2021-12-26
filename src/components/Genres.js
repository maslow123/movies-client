import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

export default class Genres extends Component {
    state = {
        genres: [],
        isLoaded: false,
        error: null
    };

    async componentDidMount() {
        const res = await fetch(`http://localhost:4000/v1/genres`);
        if (res.status !== 200) {
            const err = Error;
            err.message = `Invalid response code: ${res.status}`;

            this.setState({ error: err });
            return
        }

        const data = await res.json();
        this.setState({
            genres: data.genres,
            isLoaded: true
        });
    }

    render() {
        const { genres, isLoaded, error } = this.state;

        if (error) {
            return <p>Error {error.message} </p>
        } else {
            return (
                <Fragment>
                    {
                        !isLoaded
                        ? <p>Loading...</p>
                        : 
                        <>
                            <h2>Genres</h2>
                            
                            <div className="list-group">
                                {
                                    genres.map((m) => (
                                        <Link                                             
                                            key={m.id}
                                            className="list-group-item list-group-item-action"
                                            to={{
                                                pathname: `/genre/${m.id}`,
                                                genreName: m.genre_name
                                            }}>
                                            {m.genre_name}
                                        </Link>
                                        
                                    ))
                                }
                            </div>
                        </>
                    }
                </Fragment>
            )
        }
    }
}