import React, { Component } from "react";
import Ticket from "./../images/movie-ticket.jpg";
import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <div className="text-center">
                <h2>This is the home</h2>
                <hr/>
                <img className="ticket" src={Ticket} alt="movie ticket"/>
                <hr/>
                <div className="ticket"></div>
            </div>
        )
    }
}