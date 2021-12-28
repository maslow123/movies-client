import React, { Component } from 'react'

export default class GraphQL extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            isLoaded: false,
            error: null,
            alert: {
                type: 'd-none',
                message: ''
            }
        }
    }

    async componentDidMount() {
        const payload = `
        {
            list {
                id
                title
                runtime
                year
            }
        }
        `

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'POST',
            body: payload,
            headers: myHeaders
        };

        const res = await fetch('http://localhost:4000/v1/graphql/list', requestOptions);
        console.log('res: ', res);
        const data = await res.json();

        const theList = Object.values(data.data.list);
        console.log('theList: ', theList);
    }

    render() {
        return (
            <h2>GraphQL</h2>
        )
    }

}