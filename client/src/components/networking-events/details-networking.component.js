import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';
import queryString from 'query-string';


export default class DetailsNetworkingEvents extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            event: [],
            attendeeUsernames: [],
            urlQueries: queryString.parse(this.props.location.search),
            show: false,  //whether or not the delete modal is showing
            showPublicWindow: false,  //whether or not the make public modal is showing
            redirectToMyList: false, //whether or not to redirect to the my event list page
            redirectToHome: false

        }

        document.title = "Appli - Networking Event Details";

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClosePublicWindow = this.handleClosePublicWindow.bind(this);
        this.handleShowPublicWindow = this.handleShowPublicWindow.bind(this);
        this.handleMakePublic = this.handleMakePublic.bind(this);
        this.drawPageContent = this.drawPageContent.bind(this);

    }

    componentDidMount() {
        //TODO: check for missing id

        axios.get('/appli-job-app-tracker/networking/' + this.props.match.params.id)
            .then(response => {
                this.setState({ event: response.data }, () => {
                    //after the event data is finished parsing, get the username data
                    let object = { user_id_array: this.state.event.event_attendees };
                    axios.post('/appli-job-app-tracker/user/getUsernames', object)
                        .then((res) => {
                            if (res.status === 200) {
                                console.log("username data");
                                console.log(res.data);
                                this.setState({ attendeeUsernames: res.data.usernames });
                            }
                        });
                })
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })

        //if this event isn't public and you didn't create it, redirect to a different page
        if (this.state.event.event_creator_id !== localStorage.getItem('userId') && this.state.event.event_is_public === false) {
            console.log("this event is not public and you did not create it, therefore you should not see it. Redirecting to a different page...");
            this.setState({ redirectToHome: true });
        }


    }



    drawPageContent() {
        //return the spinner if the db content isn't loaded yet
        if (this.state.event.length === 0) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <Link to="/networking-events"><button className="btn btn-outline-dark mr-1" >Go Back</button></Link>
                        </div>
                        <div className="col-sm">
                            <div className="spinner-border d-flex justify-content-center" role="status" >
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        //else, if db content has been loaded

        //convert the date string to the text representation ie. 10 -> October
        let eventDate = new Date(this.state.event.event_date);
        //add a day because it subtracts a day for some reason
        eventDate.setDate(eventDate.getDate() + 1);
        console.log(eventDate);
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        eventDate = eventDate.toLocaleString('en-CA', options);

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <Link to="/networking-events"><button className="btn btn-outline-dark mr-1" >Go Back</button></Link>

                            {this.printButtons()}
                        </div>
                        <div className="col-sm">
                            {this.drawPublicPanel()}
                            <h3>{this.state.event.event_title}</h3>
                            <div>{eventDate}</div>
                            <div>{this.state.event.event_location}</div>
                            <div>Hosted by {this.state.event.event_host}</div>
                            <div>{this.state.event.event_description}</div>
                            <div>Your rating: {this.state.event.event_rating}</div>
                            <div><a href={this.state.event.event_link} target="_blank">Link to event</a></div>
                            <div>Notes: {this.state.event.event_notes}</div>
                            <div>Event Attendees: </div>
                            {this.printAttendeeNames()}
                        </div>
                    </div>
                </div>
                {/*<!-- Modal --> https://bit.dev/react-bootstrap/react-bootstrap/modal*/}
                <Modal show={this.state.show} onHide={this.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered >
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this event from the database?</Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-outline-dark" onClick={this.handleClose}>
                            Cancel
                        </button>
                        <button className="btn btn-danger" onClick={() => this.handleDelete(this.state.event._id)}>
                            Delete
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>

        )

    }

    //MODAL METHODS
    handleClose() {
        console.log("hiding modal...");
        this.setState({ show: false });
    }

    handleShow() {
        console.log("showing modal...");
        this.setState({ show: true });
    }
    handleClosePublicWindow() {
        console.log("hiding make public modal...");
        this.setState({ showPublicWindow: false });
    }

    handleShowPublicWindow() {
        console.log("showing make public modal...");
        this.setState({ showPublicWindow: true });
    }

    /**
     * Deletes an entry at the given id
     * @param {string} id the id of the entry being deleted
     */
    handleDelete(id) {
        console.log("deleting entry with id = " + id);
        axios.get("/appli-job-app-tracker/networking/delete/" + id)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log("Event successfully deleted.");
                    //event deleted, redirect to list page
                    this.setState({ redirectToMyList: true });
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    /**
     * Updates an entry and makes it public
     * @param {string} id the id of the entry being updated
     */
    handleMakePublic(id) {
        console.log("updating entry with id = " + id);
        let event = {
            event_title: this.state.event.event_title,
            event_host: this.state.event.event_host,
            event_date: this.state.event.event_date,
            event_description: this.state.event.event_description,
            event_location: this.state.event.event_location,
            event_link: this.state.event.event_link,
            event_rating: this.state.event.event_rating,
            event_notes: this.state.event.event_notes,
            event_is_public: true,
            event_creator_id: localStorage.getItem('userId'),
            event_attendees: this.state.event.event_attendees
        }
        axios.post('/appli-job-app-tracker/networking/update/' + id, event)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    this.handleClosePublicWindow();
                    //change url to show that something has updated, set this page's event to the newly updated entry
                    this.props.history.push('/networking-events/details/' + res.data._id + "?action=updated");
                    this.setState({ event: res.data, urlQueries: queryString.parse(this.props.location.search) });
                }
            });
    }



    /**
     * Checks if there are any CRUD actions in the URL and prints an alert panel to show it (ie. url?action=added will print a panel showing something has been added)
     */
    checkForAlerts() {
        if (this.state.urlQueries.action === "added") {
            return (
                <div className="alert alert-success " role="alert">
                    Networking event successfully added.
                </div>
            )
        }
        else if (this.state.urlQueries.action === "updated") {
            return (
                <div className="alert alert-info " role="alert">
                    Networking event successfully updated.
                </div>
            )
        }
    }

    /**
     * Checks if this event is public. If it isn't, print the button that makes it public
     */
    printButtons() {
        //if the event is not yet public, but the creator is currently logged in, print all buttons
        if (this.state.event.event_is_public === false && localStorage.getItem('userId') === this.state.event.event_creator_id) {
            return (
                <span>
                    <Link to={"/networking-events/update/" + this.state.event._id}><button className="btn btn-outline-secondary mr-1">Update Event</button></Link>
                    <button className="btn btn-outline-danger mr-1" onClick={this.handleShow} >Delete</button>
                    <button className="btn btn-outline-info" onClick={this.handleShowPublicWindow}>Make Public</button>
                    <Modal show={this.state.showPublicWindow} onHide={this.handleClosePublicWindow}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered >
                        <Modal.Header closeButton>
                            <Modal.Title>Make This Event Public?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to make this event public? Other Appli users will be able to see this event and add it to their private event logs. This cannot be undone.</p>
                            <p><em>Appli is a friendly and welcoming community. Please do not share any content that could be considered offensive or illegal.</em></p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-outline-dark" onClick={this.handleClosePublicWindow}>
                                Cancel
                    </button>
                            <button className="btn btn-info" onClick={() => this.handleMakePublic(this.state.event._id)}>
                                Make Public
                    </button>
                        </Modal.Footer>
                    </Modal>
                </span>
            );
        }
        //else if the event is public and the creator is the currently logged in user, show all buttons except for the make public button
        else if (this.state.event.event_is_public === true && localStorage.getItem('userId') === this.state.event.event_creator_id) {
            return (
                <span>
                    <Link to={"/networking-events/update/" + this.state.event._id}><button className="btn btn-outline-secondary mr-1">Update Event</button></Link>
                    <button className="btn btn-outline-danger mr-1" onClick={this.handleShow} >Delete</button>
                </span>
            );
        }
        //else, the event is public and the logged in user is not the creator. They can still see the event, but will have no update or delete buttons
        else return;
    }
    /**
     * Checks if the event is public, and draws the icon that shows its public
     */
    drawPublicPanel() {
        if (this.state.event.event_is_public === true)
            return (
                <div className="d-flex justify-content-center">
                    <div className="publicPanel">PUBLIC EVENT</div>
                </div>
            )
    }

    /**
     * Prints the list of attendee names to the card. Returns a spinner if the names haven't loaded yet
     */
    printAttendeeNames() {
        if (this.state.attendeeUsernames.length === 0) {
            return (
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            )
        }
        else return (
            <div>
                {this.state.attendeeUsernames.map(function (attendee, i) {
                    console.log(attendee)
                    return <div key={i}>{attendee}</div>;
                })}
            </div>
        )
    }





    render() {
        //check state variable to see if it needs to redirect to my events page
        if (this.state.redirectToMyList === true) {
            return <Redirect to="/networking-events/my-events?action=deleted" />
        }
        if (this.state.redirectToHome === true) {
            return <Redirect to="/" />
        }
        return (
            <div className="contentcontainer" style={{ marginTop: 10 }}>
                <h1>Networking Events</h1>
                <h2>Networking Event Details</h2>
                {this.checkForAlerts()}


                {this.drawPageContent()}
            </div>
        );
    }
}