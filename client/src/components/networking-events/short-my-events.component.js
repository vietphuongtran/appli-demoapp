import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';


/**
 * This component loads the short list of my events on the networking-home.component
 */
export default class ShortMyEventsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            dataReceived: false
        }
    }

    componentDidMount() {
        axios.get('/appli-job-app-tracker/networking/getMyEventsShort/' + localStorage.getItem('userId'))
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
            return (
                <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="spinner-border" role="status" >
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
        //if data is retrieved but there are no events in the system, say there are currently no events in the system
        else if (this.state.eventList.length === 0 && this.state.dataReceived === true) {
            return <div className="mt-3">You do not currently have any logged networking events.</div>
        }

        //options for the date string
        let options = { year: 'numeric', month: 'long', day: 'numeric' };

        //creates a custom style based on the given delay (in seconds)
        function delayAppearance(delay) {
            return {
                animationName: 'eventAppear',
                animationTimingFunction: 'ease-in-out',
                animationDuration: '0.3s',
                animationDelay: (delay * 0.1) + 's',
                animationIterationCount: 1,
                animationDirection: 'normal',
                animationFillMode: 'forwards'
            }
        }

        return (
            <div>
                {this.state.eventList.map((event, iteration) => {

                    //convert the date string to the text representation ie. 10 -> October
                    let eventDate = new Date(event.event_date);
                    //add a day because it subtracts a day for some reason
                    eventDate.setDate(eventDate.getDate() + 1);
                    eventDate = eventDate.toLocaleString('en-CA', options);

                    return (
                        <div className="mt-2 startOpaque" key={event._id} style={delayAppearance(iteration)}>
                            <h5>{event.event_title}</h5>
                            <div>{event.event_location} | {eventDate}</div>
                            <div><Link to={"/networking-events/details/" + event._id}>Details</Link></div>
                        </div>
                    )
                })}
            </div>
        )
    }

    //TODO: replace dummy content with database entries
    render() {
        return (
            <div className="eventShortListHolder">
                <h2>My Events</h2>
                <div style={{ "minHeight": "18rem" }}>
                    {this.drawContent()}
                </div>
                <div className="mt-2 float-right">
                    <Link to="/networking-events/my-events">See All &rarr;</Link>
                </div>
            </div>
        );
    }
}