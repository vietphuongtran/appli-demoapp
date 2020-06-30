import React from 'react';
import axios from 'axios';
import Validator from 'validator';
import helpers from "../../functions/susan-helperfunctions";


import { Link } from 'react-router-dom';

const initialState = {
    event_title: '',
    event_host: '',
    event_date: '',
    event_description: '',
    event_location: '',
    event_link: '',
    event_rating: '',
    event_notes: '',
    titleError: '',
    dateError: '',
    linkError: '',
    hostError: '',
    locationError: '',

    //sam's addition, storing information for whether a event is public and who is attending, so that it is not overwritten
    event_is_public: false,
    event_attendees: []
}

export default class UpdateNetworkingEvents extends React.Component {

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
    }


    componentDidMount() {
        axios.get('http://localhost:4000/appli-job-app-tracker/networking/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    event_title: response.data.event_title,
                    event_host: response.data.event_host,
                    event_date: response.data.event_date,
                    event_description: response.data.event_description,
                    event_location: response.data.event_location,
                    event_link: response.data.event_link,
                    event_rating: response.data.event_rating.toString(),
                    event_notes: response.data.event_notes,
                    event_is_public: response.data.event_is_public,
                    event_attendees: response.data.event_attendees
                });
                // console.log(this.state.event_rating);
            })
            .catch(function (error) {
                console.log(error);
            })


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
        let linkError = '';
        let hostError = '';

        // ----- Event Title Validation ----- //
        if (Validator.isEmpty(this.state.event_title)) {
            titleError = 'Please enter the Event Name';
        }

        if (titleError) {
            this.setState({ titleError });
        }

        // ----- Event Host Validation ----- //
        if (Validator.isEmpty(this.state.event_title)) {
            hostError = 'Please enter the event host';
        }

        if (hostError) {
            this.setState({ hostError });
        }

        // ----- Event Date Validation ----- //
        // Must first format date to the accepted format:
        this.state.event_date = helpers.formatDateNumber(this.state.event_date);

        if (Validator.isEmpty(this.state.event_date)) {
            dateError = 'Please enter the event date';
        }

        if (this.state.event_date && !Validator.isDate(this.state.event_date)) {
            dateError = 'Please enter a date using the following format: yyyy-mm-dd';
        }

        if (dateError) {
            this.setState({ dateError });
        }

        // ----- Event Date Validation ----- //
        if (Validator.isEmpty(this.state.event_location)) {
            locationError = 'Please enter the event location';
        }

        if (locationError) {
            this.setState({ locationError });
        }

        // ----- URL Validation ----- //
        if (this.state.event_link && !Validator.isURL(this.state.event_link, { protocols: ['http', 'https'], require_protocol: true })) {
            linkError = 'Please enter a valid URL starting with http';
        }

        if (linkError) {
            this.setState({ linkError });
        }


        // return !(titleError || hostError || dateError || linkError);

        //Above line is simplified version of below:

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
        const obj = {
            event_title: this.state.event_title,
            event_host: this.state.event_host,
            event_date: this.state.event_date,
            event_description: this.state.event_description,
            event_location: this.state.event_location,
            event_link: this.state.event_link,
            event_rating: this.state.event_rating,
            event_notes: this.state.event_notes,
            event_is_public: this.state.event_is_public,
            event_creator_id: localStorage.getItem('userId'),
            event_attendees: this.state.event_attendees
        }

        // Endpoint accepting incoming requests:
        axios.post('/appli-job-app-tracker/networking/update/' + this.props.match.params.id, obj)
            .then((res) => {
                //Sam's edit - get newly updated entry from the database and redirect to that entry's details page
                if (res.status === 200) {
                    console.log(res.data);
                    this.props.history.push('/networking-events/details/' + res.data._id + "?action=updated");
                }
            });


    }


    render() {
        return (
            <div className="contentcontainer" style={{ marginTop: 10 }}>
                <h1>Update Networking Event</h1>
                {/*TODO: add network id to these links */}

                {/* Sam's edit - Back button redirects to the event's detail's page */}
                <Link to={'/networking-events/details/' + this.props.match.params.id} className='btn btn-outline-primary'>Back to Details</Link>
                <div>
                    <form onSubmit={this.onSubmit} className="">
                        <div className="form-group row ">
                            <label className="col-sm-6 col-form-label" >Event Name: <span className="form__required">*</span></label >
                            <div className="col col_margin">
                                <input type="text"
                                    className={"form-control col " + helpers.appendErrorClass(this.state, 'titleError')}
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
                                    className={"form-control col " + helpers.appendErrorClass(this.state, 'hostError')}
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
                                    className={"form-control col " + helpers.appendErrorClass(this.state, 'dateError')}
                                    value={helpers.formatDateNumber(this.state.event_date)}
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
                                    className={"form-control col " + helpers.appendErrorClass(this.state, 'locationError')}
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
                                    className={"form-control col " + helpers.appendErrorClass(this.state, 'linkError')}
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
                            <input type="submit" value="Update Networking Event" className="btn btn-outline-primary" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}