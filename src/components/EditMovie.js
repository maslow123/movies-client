import React, { Component, Fragment} from "react";
import './EditMovie.css';
import { Input, Select } from "./form-components";

export default class EditMovie extends Component {
    state = {
        movie: {},
        isLoaded: false,
        error: null
    };
    
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
            error: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (evt) => {
        console.log('Form was submitted');
        evt.preventDefault();
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
    async componentDidMount() {
        
    }

    render() {
        let { movie } = this.state;
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
                type: 'text',
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
                <hr/>

                <form onSubmit={this.handleSubmit}>                    
                    {form.map((f, i) => (
                        <div key={i}>
                            {
                                f.type === 'text' || f.type === 'hidden'
                                ?
                                    <Input 
                                        title={f.label}
                                        type={f.type}
                                        name={f.name}
                                        value={movie[f.name]}
                                        handleChange={this.handleChange}
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
                </form> 

                <div className="mt-3">
                    <pre>{JSON.stringify(this.state, null, 3)}</pre>
                </div>
            </Fragment>
        )
    }
}