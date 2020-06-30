import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ShortMyEventsList from './short-my-events.component';
import ShortPublicEventsList from './short-public-events.component';
/**
 * The main landing page for networking events
 */
export default class NetworkingHomeComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        document.title = "Appli - Networking Events";
    }

    render() {
        return (
            <div className="contentcontainer" style={{ marginTop: 10 }}>
                <h1>Networking Events</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div >
                                <Link to="/networking-events/add"><button className="btn btn-outline-primary">Add Event</button></Link>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <ShortMyEventsList />
                        </div>
                    </div>
                </div>
                <div className="containter">
                    <ShortPublicEventsList />
                </div>

            </div>
        );
    }
}