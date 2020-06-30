import React, { Component } from 'react';
import axios from 'axios';
import Validator from 'validator';
import helpers from "../../functions/susan-helperfunctions";

const initialState = {
    event_title: '',
    event_host: '',
    event_date: '',
    event_description: '',
    event_location: '',
    event_link: '',
    event_rating: '',
    event_notes: '',
    event_creator_id: localStorage.getItem('userId'), //sam's addition - setting the user who is making this event. 
    //FIXME: The above variable will never change until the website is refreshed, meaning if someone logs out and logs in with another account, the old variable is still kept
    //because the page never reloaded. State variables refresh every time the component is created, but this variable is outside the component, so it does not refresh

    titleError: '',
    dateError: '',
    linkError: '',
    hostError: '',
    locationError: ''
}

export default class AddNetworkingComponent extends Component {

    // Step 1: Add a constructor to the component class:
    constructor(props) {
        super(props);


        // Step 4: B/c in the four implemented methods we’re dealing with the component’s state object we need to
        // make sure to bind those methods to this by adding the following lines of code to the constructor:
        this.onChangeEvent_Title = this.onChangeEvent_Title.bind(this);
        this.onChangeEvent_Host = this.onChangeEvent_Host.bind(this);
        this.onChangeEvent_Date = this.onChangeEvent_Date.bind(this);
        this.onChangeEvent_Description = this.onChangeEvent_Description.bind(this);
        this.onChangeEvent_Location = this.onChangeEvent_Location.bind(this);
        this.onChangeEvent_Link = this.onChangeEvent_Link.bind(this);
        this.onChangeEvent_Rating = this.onChangeEvent_Rating.bind(this);
        this.onChangeEvent_Notes = this.onChangeEvent_Notes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Inside the constructor set the initial state of the component by assigning an object to this.state.
        // The state comprises the following properties:
        this.state = initialState;

        console.log("User id in the initial state variable - " + this.state.event_creator_id);
        console.log("user id in local storage - " + localStorage.getItem("userId"));
        console.log("are they the same? " + (this.state.event_creator_id === localStorage.getItem("userId")));
    }

    // Step 2: Add methods which can be used to update the state properties:
    onChangeEvent_Title(e) {
        this.setState({
            event_title: e.target.value,
            titleError: ''
        });
    }

    onChangeEvent_Host(e) {
        this.setState({
            event_host: e.target.value,
            hostError: ''
        });
    }

    onChangeEvent_Date(e) {
        this.setState({
            event_date: e.target.value,
            dateError: ''
        });
    }

    onChangeEvent_Description(e) {
        this.setState({
            event_description: e.target.value
        });
    }


    onChangeEvent_Location(e) {
        this.setState({
            event_location: e.target.value,
            locationError: ''
        });
    }

    onChangeEvent_Link(e) {
        this.setState({
            event_link: e.target.value,
            linkError: ''
        });
    }

    onChangeEvent_Rating(e) {
        this.setState({
            event_rating: e.target.value
        });
        console.log(this.state.event_rating);
    }


    onChangeEvent_Notes(e) {
        this.setState({
            event_notes: e.target.value
        });
    }

    // ----- Function Validate Form ----- //
    validateForm = () => {
        let titleError = '';
        let dateError = '';
        let locationError = '';
        let linkError ='';
        let hostError ='';

        // ----- Event Title Validation ----- //
        if (Validator.isEmpty(this.state.event_title)) {
            titleError = 'Please enter the event name';
        }

        if (titleError) {
            this.setState({titleError});
        }

        // ----- Event Host Validation ----- //
        if (Validator.isEmpty(this.state.event_title)) {
            hostError = 'Please enter the event host';
        }

        if (hostError) {
            this.setState({hostError});
        }

        // ----- Event Date Validation ----- //
        if (Validator.isEmpty(this.state.event_date)) {
            dateError = 'Please enter the event date';
        }
        if (this.state.event_date && !Validator.isDate(this.state.event_date)) {
            dateError = 'Please enter a date using the following format: yyyy-mm-dd';
        }

        if (dateError) {
            this.setState({dateError});
        }

        // ----- Event Date Validation ----- //
        if (Validator.isEmpty(this.state.event_location)) {
            locationError = 'Please enter the event location';
        }

        if (locationError) {
            this.setState({locationError});
        }


        // ----- URL Validation ----- //
        if (this.state.event_link && !Validator.isURL(this.state.event_link, {protocols: ['http','https'], require_protocol: true})) {
            linkError = 'Please enter a valid URL starting with https';
        }

        if (linkError) {
            this.setState({linkError});
        }



        if (titleError || hostError || dateError || linkError) {
            return false;
        }

        return true;

    }

    // Step 3: Another method is needed to handle the submit event which will be implemented to create a new Event:
    onSubmit(e) {
        e.preventDefault();

        const isValid = this.validateForm();
        if (!isValid) {
            return false;
        }

        console.log(`Form submitted:`);
        console.log(`event_title: ${this.state.event_title}`);
        console.log(`event_host: ${this.state.event_host}`);
        console.log(`event_date ${this.state.event_date}`);
        console.log(`event_description: ${this.state.event_description}`);
        console.log(`event_location: ${this.state.event_location}`);
        console.log(`event_link: ${this.state.event_link}`);
        console.log(`event_rating: ${this.state.event_rating}`);
        console.log(`event_notes: ${this.state.event_notes}`);

        // Bring in code to communicate with backend. First we need to create a new Networking object:
        const newNetworking = {
            event_title: this.state.event_title,
            event_host: this.state.event_host,
            event_date: this.state.event_date,
            event_description: this.state.event_description,
            event_location: this.state.event_location,
            event_link: this.state.event_link,
            event_rating: this.state.event_rating,
            event_notes: this.state.event_notes,
            event_is_public: false, //Sam's edit - events are private by default
            event_creator_id: localStorage.getItem('userId'), //also sam's edit - set who created this event
            event_attendees: [localStorage.getItem('userId')] //sam's edit, create the array of attendees with the creator being set as an attendee
        }

        // Endpoint accepting incoming requests:
        axios.post('http://localhost:4000/appli-job-app-tracker/networking/add', newNetworking)
            .then( (res) => {
                //Sam's edit - get the newly added entry and redirect to the new entry's details page
                if(res.status === 200) {
                    console.log(res.data);
                    this.setState({
                        event_title: '',
                        event_host: '',
                        event_date: '',
                        event_description: '',
                        event_location: '',
                        event_link: '',
                        event_rating: '',
                        event_notes: ''
                    });
                    this.props.history.push('/networking-events/details/'+res.data._id+"?action=added");
                }
                
            });

        

        
    }


    // Step 5: Finally we need to add the JSX code which is needed to display the form:

    render() {
        return (
            <div className="contentcontainer" style={{marginTop: 10}}>
                <h1>Add New Networking Event</h1>
                <a href='/networking-events' className='btn btn-outline-dark'>Back to List</a>
                <div>
                    <form onSubmit={this.onSubmit} className="">
                        <div className="form-group row ">
                            <label className="col-sm-6 col-form-label" >Event Name: <span className="form__required">*</span></label >
                            <div className="col col_margin">
                                <input  type="text"
                                        className={"form-control col " + helpers.appendErrorClass(this.state,'titleError') }
                                        value={this.state.event_title}
                                        onChange={this.onChangeEvent_Title}
                                />
                                <div className='col text-error-display'>{this.state.titleError}</div>
                            </div>
                        </div>


                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Host: <span className="form__required">*</span></label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    className={"form-control col " + helpers.appendErrorClass(this.state,'hostError') }
                                    value={this.state.event_host}
                                    onChange={this.onChangeEvent_Host}
                                 />
                                 <div className='col text-error-display'>{this.state.hostError}</div>
                             </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Date: <span className="form__required">*</span></label >
                            <div className="col col_margin">
                                <input
                                    type="date"
                                    placeholder="yyyy-mm-dd"
                                    className={"form-control col " + helpers.appendErrorClass(this.state,'dateError') }
                                    value={this.state.event_date}
                                    onChange={this.onChangeEvent_Date}
                                />
                                <div className='col text-error-display'>{this.state.dateError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Description: </label >
                            <div className="col col_margin">
                                <textarea
                                    className="form-control"
                                    value={this.state.event_description}
                                    onChange={this.onChangeEvent_Description}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Location: <span className="form__required">*</span></label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    className={"form-control col " + helpers.appendErrorClass(this.state,'locationError') }
                                    value={this.state.event_location}
                                    onChange={this.onChangeEvent_Location}
                                />
                                <div className='col text-error-display'>{this.state.locationError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Event Link: </label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    className={"form-control col " + helpers.appendErrorClass(this.state,'linkError') }
                                    value={this.state.event_link}
                                    onChange={this.onChangeEvent_Link}
                                />
                            <div className='col text-error-display'>{this.state.linkError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Event Rating: </label>
                            <div className="col-sm-6">
                                <div id="rating__headings" className="row">
                                    <div id="rating__bad" className="col">Bad</div>
                                    <div id="rating__good" className="col">Good</div>
                                </div>

                                <div id="rating__spacing" className="row">
                                    <div className="form-check form-check-inline col">
                                        <input className="form-check-input"
                                               type="radio"
                                               name="event_rating_options"
                                               id="rating_1"
                                               value="1"
                                               checked={this.state.event_rating === '1'}
                                               onChange={this.onChangeEvent_Rating}
                                        />
                                        <label className="col-sm-6 col-form-label form-check-label ">1</label>
                                    </div>

                                    <div className="form-check form-check-inline col">
                                        <input className="form-check-input"
                                               type="radio"
                                               name="event_rating_options"
                                               id="rating_2"
                                               value="2"
                                               checked={this.state.event_rating === '2'}
                                               onChange={this.onChangeEvent_Rating}
                                        />
                                        <label className="col-sm-6 col-form-label form-check-label ">2</label>
                                    </div>

                                    <div className="form-check form-check-inline col">
                                        <input className="form-check-input"
                                               type="radio"
                                               name="event_rating_options"
                                               id="rating_3"
                                               value="3"
                                               checked={this.state.event_rating === '3'}
                                               onChange={this.onChangeEvent_Rating}
                                        />
                                        <label className="col-sm-6 col-form-label form-check-label ">3</label>
                                    </div>

                                    <div className="form-check form-check-inline col">
                                        <input className="form-check-input"
                                               type="radio"
                                               name="event_rating_options"
                                               id="rating_4"
                                               value="4"
                                               checked={this.state.event_rating === '4'}
                                               onChange={this.onChangeEvent_Rating}
                                        />
                                        <label className="col-sm-6 col-form-label form-check-label ">4</label>
                                    </div>

                                    <div className="form-check form-check-inline col">
                                        <input className="form-check-input"
                                               type="radio"
                                               name="event_rating_options"
                                               id="rating_5"
                                               value="5"
                                               checked={this.state.event_rating === '5'}
                                               onChange={this.onChangeEvent_Rating}
                                        />
                                        <label className="col-sm-6 col-form-label form-check-label ">5</label>
                                    </div>
                                </div>

                            </div>


                        </div>




                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Notes: </label >
                            <textarea
                                type="textarea"
                                className="form-control col-sm-6"
                                value={this.state.event_notes}
                                onChange={this.onChangeEvent_Notes}
                            />
                        </div>

                        


                        <div className="form-group row submit__rightalign">
                            <input type="submit" value="Add Networking Event" className="btn btn-outline-primary" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}