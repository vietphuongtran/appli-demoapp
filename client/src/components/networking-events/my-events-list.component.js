/********** NOTE: This component reuses styling and page layout from Susan's list-networking.component.js file ****** */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import queryString from 'query-string';

//the styling for the delayed appearance
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

//this is a networking component
const Networking = props => (
    <div className='event startOpaque' style={delayAppearance(props.iteration)}>
        <div className="event__date">
            {formatDate(props.networking.event_date)}
        </div>
        <div className='event__info'>
            <h2><span className='event__title'> {props.networking.event_title} </span></h2>
            <div className='event__details tooltip-toggle' data-tooltip='Location'>
                <img src="/images/icons/location.svg" className='event__icons' alt="Event Icon" />
                <p className="display__inlineblock"> {props.networking.event_location}</p>
            </div>
            <div className='event__details tooltip-toggle' data-tooltip='Event Host'>
                <img src="/images/icons/user.svg" className='event__icons' alt="Event Host Icon" />
                <p className="display__inlineblock">{props.networking.event_host}</p>
            </div>
            <a href={'/networking-events/details/' + props.networking._id}><img src="/images/icons/plus.svg" className='event__morebtn' alt="See Details Button" /></a>
        </div>
    </div>
)

// ---------- Functions ---------- //
function formatDate(string) {
    // Trick to get the correct date since it's giving the date back one day off:
    // SRC: https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
    string = new Date(string.replace(/-/g, '\/').replace(/T.+/, ''));
    var options = { month: 'short', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
}






/**
 * The my events page, which lists all events the current logged in user personally created
 */
export default class MyEventsListComponent extends React.Component {
    constructor(props) {
        super(props);
        //networking state variable holds all JSON data
        this.state = {
            networking: [],
            urlQueries: queryString.parse(this.props.location.search),
            dataReceived: false
        };

        document.title = "Appli - My Networking Events";




    }

    componentDidMount() {
        //TODO: change this to only be this logged in users applications once user accounts are set up
        axios.get('/appli-job-app-tracker/networking/getMyEvents/'+localStorage.getItem('userId'))
            .then(response => {
                this.setState({ networking: response.data, dataReceived: true })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // Create eventList method:
    eventList() {
        //Sam - show loading spinner before data gets retrieved
        if (this.state.networking.length === 0 && this.state.dataReceived === false) {
            return (<div className="spinner-border d-flex justify-content-center" role="status" >
                <span className="sr-only">Loading...</span>
            </div>)
        }
        //if data is retrieved but there are no events in the system, say there are currently no events in the system
        else if (this.state.networking.length === 0 && this.state.dataReceived === true) {
            return <div className="mt-5">You do not currently have any logged networking events.</div>
        }

        // Iterate over elements
        // map callback function gets all items
        return this.state.networking.map(function (currentNetwork, i) {
            return <Networking networking={currentNetwork} key={i} iteration={i}/>;
        })
    }

    /**
     * Checks if there are any CRUD actions in the URL and prints an alert panel to show it (ie. url?action=deleted will print a panel showing something has been deleted)
     */
    checkForAlerts() {
        if (this.state.urlQueries.action === "deleted") {
            return (
                <div class="alert alert-danger " role="alert">
                    Networking event successfully deleted.
                </div>
            )
        }
    }

    render() {
        return (
            <div className="contentcontainer" style={{ marginTop: 10 }}>
                <h1>Networking Events</h1>
                <h2>My Events</h2>
                {this.checkForAlerts()}
                <div className="page__nav">
                    <div>
                        <Link to="/networking-events"><button className="btn btn-outline-dark mr-1">Go Back</button></Link>
                        <Link to="/networking-events/add"><button className="btn btn-outline-primary">Add Event</button></Link>
                    </div>
                    <form>
                        <label htmlFor="jobapplist_search" hidden>Search</label>
                        <input className="search__bar" id="jobapplist_search" type="text" placeholder="Search" ></input>
                    </form>
                </div>
                <div className='event__container'>
                    {this.eventList()}
                </div>

            </div>
        );
    }
}