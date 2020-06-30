import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class HomeComponent extends React.Component {
    componentWillMount() {
        document.title = "Appli - Home";
    }

    render() {
        return (
            <div>
                <img src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX5794294.jpg" />
                <h1>Welcome to Appli: where your career starts!</h1>
                <div>A smart and intuitive way to search for jobs, track your application and connect with others through forum and networking events</div>
                <div>Wanna find out? <Link to = "/user"> Register</Link> or <Link to = "/login"> log in</Link> to find out</div>
            </div>
        );
    }
}