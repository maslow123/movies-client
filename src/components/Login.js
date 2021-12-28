import React, { Component } from 'react'
import { Input } from './form-components';
import { Alert } from './ui-components';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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

    handleChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;

        this.setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    handleSubmit = async (evt) => {
        const { email, password } = this.state;
        evt.preventDefault();
        let errors = [];

        if (email === '') {
            errors = [...errors, 'email'];
        }
        
        if (password === '') {
            errors = [...errors, 'password'];
        }

        this.setState({ errors });

        if (errors.length > 0) {
            return false;
        }

        const data = new FormData(evt.target);
        const payload = Object.fromEntries(data.entries());

        const reqOptions = {
            method: 'POST',
            body: JSON.stringify(payload)
        };

        const res = await fetch('http://localhost:4000/v1/signin', reqOptions);
        const dataJSON = await res.json();

        if (dataJSON.error) {
            this.setState({
                alert: {
                    type: 'alert-danger',
                    message: dataJSON.error.message
                }
            });
        } else {
            this.handleJWTChange(Object.values(dataJSON)[0]); 
            window.localStorage.setItem('jwt', JSON.stringify(Object.values(dataJSON)[0]));           
            this.props.history.push({
                pathname: '/admin'
            });
        }
    }

    hasError = (key) => {
        return this.state.errors?.length > 0 && this.state.errors.indexOf(key) !== -1;
    }

    handleJWTChange = (jwt) => {
        this.props.handleJWTChange(jwt);
    }
    render() {
        const form = [
            {
                name: 'email',
                label: 'Username',
                type: 'text',
                option_list: []
            },
            {
                name: 'password',
                label: 'Password',
                type: 'password',
                option_list: []
            }
        ]

        const { alert } = this.state;
        return (
            <>
                <h2>Login</h2>
                <Alert
                    alertType={alert.type}
                    alertMessage={alert.message}
                />

                <form className="pt-3" onSubmit={this.handleSubmit}>
                    {form.map((f, i) => (
                        <div key={i}>                    
                            <Input 
                                className={this.hasError(f.name) ? 'is-invalid' : ''}
                                title={f.label}
                                type={f.type}
                                name={f.name}
                                value={this.state[f.name]}
                                handleChange={this.handleChange}
                                errorDiv={this.hasError(f.name) ? 'text-danger' : 'd-none'}
                                errorMsg={`Please enter a ${f.label}`}
                            />
                        </div>
                    ))}
                    <hr/>
                    <button className="btn btn-primary">Login</button>
                </form>
            </>
        );
    }
}