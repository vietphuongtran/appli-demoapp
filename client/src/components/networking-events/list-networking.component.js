import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Networking = props => (
    <div className='event'>
        <div className="event__date">
            { formatDate(props.networking.event_date) }
        </div>
        <div className='event__info'>
            <h2><span className='event__title'> { props.networking.event_title } </span></h2>
            <div className='event__details tooltip-toggle' data-tooltip='Location'>
                <img src="/images/icons/location.svg" className='event__icons' alt="Event Icon" />
                <p className="display__inlineblock"> { props.networking.event_location }</p>
            </div>
            <div className='event__details tooltip-toggle' data-tooltip='Event Host'>
                <img src="/images/icons/user.svg"  className='event__icons' alt="Event Host Icon" />
                <p className="display__inlineblock">{ props.networking.event_host }</p>
            </div>
            <a href={'/networking-events/update/' + props.networking._id}><img src="/images/icons/plus.svg" className='event__morebtn' alt="See Details Button"/></a>
        </div>
    </div>
)

// ---------- Functions ---------- //
function formatDate(string){
    // Trick to get the correct date since it's giving the date back one day off:
    // SRC: https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
    string = new Date(string.replace(/-/g, '\/').replace(/T.+/, ''));
    var options = { month: 'short', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}

export default class ListNetworkingComponent extends Component {

    // Take a constructor and pass in props from the component:
    constructor(props) {
        // Taking the parent constructor and passing in props:
        super(props);
        // Set initial state object to contain a property of networking events:
        // And that property is initially containing an empty array:
        this.state = {networking: []};
    }

    // Need ot initialize the networking state property here with the networking
    // need to find a way to initially send request to teh backend, to get the response
    // back a list of networking items to set the state property accordingly
    componentDidMount(){
        axios.get('http://localhost:4000/appli-job-app-tracker/networking')
            .then(response => {
                this.setState({networking: response.data})
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    // Create eventList method:
    eventList() {
        // Iterate over elements
        // map callback function gets all items
        return this.state.networking.map(function(currentNetwork, i) {
            return <Networking networking={currentNetwork} key={i} />;
        })
    }


    render() {
        return (
            <div className="contentcontainer">
                <h1>Networking Events</h1>
                <div className="page__nav">
                    <a href='/networking-events/add' className='btn btn-outline-primary'>Add New Networking Event</a>
                    <form>
                        <label for="jobapplist_search" hidden>Search</label>
                        <input className="search__bar" id="jobapplist_search" type="text" placeholder="Search" ></input>
                    </form>
                </div>
                <div className='event__container'>
                        { this.eventList() }
                    </div>
            </div>
        )
    }
}

