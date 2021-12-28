import React, { Component, Fragment} from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import './EditMovie.css';
import { Input, Select } from "./form-components";
import { Alert } from "./ui-components";
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export default class EditMovie extends Component {        
    constructor(props) {
        super(props);
        this.state = {
            movie: {
                id: 0,
                title: '',
                release_date: '',
                runtime: '',
                mpaa_rating: '',
                rating: '',
                description: ''
            },
            isLoaded: false,
            error: null,
            errors: [],
            alert: {
                type: 'd-none',
                message: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        console.log('JWT in EditMovie component did mount: ', this.props.jwt)
        const id = this.props.match.params.id;
        
        if (id > 0) {
            const res = await fetch(`http://localhost:4000/v1/movie/${id}`);

            if (res.status !== 200) {
                const err = Error;
                err.message = `Invalid response code ${res.status}`;

                this.setState({ error: err });
            }
            const data = await res.json();
            const releaseDate = new Date(data.movie.release_date);

            this.setState({
                movie: {
                    id,
                    title: data.movie.title,
                    release_date: releaseDate.toISOString().split('T')[0],
                    runtime: data.movie.runtime,
                    mpaa_rating: data.movie.mpaa_rating,
                    rating: data.movie.rating,
                    description: data.movie.description
                },
                isLoaded: true
            }, (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
        } else {
            this.setState({ isLoaded: true });
        }
    }
    
    handleSubmit = async (evt) => {
        evt.preventDefault();
        
        // client side validation
        let errors = [];
        for (let prop in this.state.movie) {
            if (!this.state.movie[prop] && prop !== 'id') {
                errors = [...errors, prop];
            }
        }
        this.setState({ errors });

        console.log(errors);
        if (errors.length > 0) {
            return false;
        }

        const data = new FormData(evt.target);
        const payload = Object.fromEntries(data.entries());
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${this.props.jwt}`);

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: myHeaders
        };

        const res = await fetch('http://localhost:4000/v1/admin/editmovie', requestOptions);
        const dataJSON = await res.json();
        console.log(dataJSON)
        if (dataJSON.error) {
            this.setState({
                alert: { type: 'alert-danger', message: dataJSON.error.message }
            });
            return false;
        }
        this.setState({
            alert: { type: 'alert-success', message: 'Changes saved!' }
        });
    }

    handleChange = (evt) => {
        let value = evt.target.value;
        let name = evt.target.name;

        this.setState(prevState => ({
            movie: {
                ...prevState.movie,
                [name]: value
            }
        }));
    }

    hasError = (key) => {
        return this.state.errors?.length && this.state.errors.indexOf(key) !== -1;
    }

    confirmDelete = (e) => {
        console.log("Would delete movie id", this.state.movie.id);
        confirmAlert({
            title: 'Delete movie?',
            message: 'Are you sure?',
            buttons: [
              {
                label: 'Yes',
                onClick: async () => {
                    const res = await fetch(`http://localhost:4000/v1/admin/deletemovie/${this.state.movie.id}`, {
                        method: 'GET'
                    });

                    const data = await res.json();
                    console.log(data);
                    if (data.error) {
                        this.setState({ 
                            alert: { type: 'alert-danger', message: data.error.message }
                        })
                    } else {
                        this.props.history.push({
                            pathname: '/admin'
                        });
                    }
                }
              },
              {
                label: 'No',
                onClick: async () => {
                    
                }
              }
            ]
        });
    }

    render() {
        let { movie, isLoaded, error, alert } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            const form =  [
                {
                    name: 'id',
                    label: 'Id',
                    type: 'hidden',
                    option_list: []
                },
                {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    option_list: []
                },
                {
                    name: 'release_date',
                    label: 'Release Date',
                    type: 'date',
                    option_list: []
                },
                {
                    name: 'runtime',
                    label: 'Runtime',
                    type: 'text',
                    option_list: []
                },
                {
                    name: 'mpaa_rating',
                    label: 'MPAA Rating',
                    type: 'select',
                    option_list: [
                        {
                            label: 'G',
                            value: 'G'
                        },
                        {
                            label: 'PG',
                            value: 'PG'
                        },
                        {
                            label: 'PG13',
                            value: 'PG13'
                        },
                        {
                            label: 'R',
                            value: 'R'
                        },
                        {
                            label: 'NC17',
                            value: 'NC17'
                        },
                    ]
                },            
                {
                    name: 'rating',
                    label: 'Rating',
                    type: 'text',
                    option_list: []
                },
                {
                    name: 'description',
                    label: 'Description',
                    type: 'text',
                    option_list: []
                },
    
            ];
    
            return (
                <Fragment>
                    <h2>Add/Edit Movie</h2>
                    <Alert alertType={alert.type} alertMessage={alert.message}/>
                    <hr/>
    
                    <form onSubmit={this.handleSubmit}>                    
                        {form.map((f, i) => (
                            <div key={i}>
                                {
                                    f.type !== 'select'
                                    ?
                                        <Input 
                                            className={this.hasError(f.name) ? 'is-invalid' : ''}
                                            title={f.label}
                                            type={f.type}
                                            name={f.name}
                                            value={movie[f.name]}
                                            handleChange={this.handleChange}
                                            errorDiv={this.hasError(f.name) ? 'text-danger' : 'd-none'}
                                            errorMsg={`Please enter a ${f.label}`}
                                        />
                                    : 
                                        <Select
                                            title={f.label}
                                            name={f.name}
                                            value={movie[f.name]}
                                            handleChange={this.handleChange}
                                            option_list={f.option_list}    
                                        />
    
                                }
                            </div>
                        ))}
                        <hr/>
                        <button className="btn btn-primary">Save</button>
                        <Link to="/admin" className="btn btn-warning ms-1">
                            Cancel
                        </Link>
                        {movie.id > 0 && (
                            <a 
                                href="#!" 
                                className="btn btn-danger ms-1"
                                onClick={this.confirmDelete}
                            >
                                Delete
                            </a>
                        )}
                    </form> 
                </Fragment>
            )
        }
    }
}