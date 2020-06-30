import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';


/**
 * This component loads the short list of my events on the networking-home.component
 */
export default class ShortPublicEventsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            dataReceived: false
        }
    }

    componentDidMount() {
        axios.get('/appli-job-app-tracker/networking/sam/getPublicEventsShort')
            .then(response => {
                console.log(response);
                this.setState({ eventList: response.data, dataReceived: true });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    drawContent() {
        if (this.state.eventList.length === 0 && this.state.dataReceived === false) {
            return (<div className="spinner-border d-flex justify-content-center" role="status" >
                <span className="sr-only">Loading...</span>
            </div>)
        }
        //if data is retrieved but there are no events in the system, say there are currently no events in the system
        else if (this.state.eventList.length === 0 && this.state.dataReceived === true) {
            return <div className="mt-3">There are currently no public events in the system.</div>
        }

        //creates a custom style based on the given delay (in seconds)
        function delayAppearance(delay) {
            return {
                animationName: 'eventAppear',
                animationTimingFunction: 'ease-in-out',
                animationDuration: '0.3s',
                animationDelay: (delay * 0.1 + 0.3) + 's',
                animationIterationCount: 1,
                animationDirection: 'normal',
                animationFillMode: 'forwards'
            }
        }

        return (
            <div className="container">
                <div className="row">
                    {this.state.eventList.map((event, iteration) => {
                        return (
                            <div className="col-sm startOpaque" key={event._id} style={delayAppearance(iteration)}>
                                <h5>{event.event_title}</h5>
                                <div>{event.event_location} | Friday June 12 2020</div>
                                <div><Link to={"/networking-events/details/" + event._id}>Details</Link></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    //TODO: replace dummy content with database entries
    render() {
        return (
            <div className="eventPublicListHolder">
                <h2>Public Events</h2>
                <p>Latest Events:</p>
                {this.drawContent()}
                <div className="d-flex justify-content-end">
                    <Link to="/networking-events/public-events">See More &rarr;</Link>
                </div>
            </div>
        );
    }
}