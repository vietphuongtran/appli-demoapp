import React, { Component } from 'react';
import axios from 'axios';
import helpers from "../../functions/susan-helperfunctions";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "bootstrap/dist/css/bootstrap.min.css";


export default class ShowContactsComponent extends Component {


    // Take a constructor and pass in props from the component:
    constructor(props) {
        // Taking the parent constructor and passing in props:
        super(props);

        this.onClick_Delete = this.onClick_Delete.bind(this);
        this.delete = this.delete.bind(this);

        // Adding class constructor to set initial state:
        this.state = {
            isOpen: false
        };


    }

    onClick_Delete(e) {
        this.openModal();

    }

    openModal() {
        this.setState({
            isOpen: true
        });
        console.log(this.state.isOpen);
    }

    hideModal = () => {
        this.setState({
            isOpen: false
        })
    }



    // Need ot initialize the contact state property here with the contact
    // need to find a way to initially send request to the backend, to get the response
    // back a list of contact items to set the state property accordingly

    // componentDidMount life cycle method, this method is used once a
    // component is mounted so we can request the data
    componentDidMount() {

        axios.get('http://localhost:4000/appli-job-app-tracker/contacts/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    contact_firstname: response.data.contact_firstname,
                    contact_lastname: response.data.contact_lastname,
                    contact_linkedin: response.data.contact_linkedin,
                    contact_email: response.data.contact_email,
                    contact_phone: response.data.contact_phone,
                    contact_company: response.data.contact_company,
                    contact_jobtitle: response.data.contact_jobtitle,
                    contact_datemet: response.data.contact_datemet,
                    contact_notes: response.data.contact_notes
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // Delete function:
    delete(){
        axios.get('http://localhost:4000/appli-job-app-tracker/contacts/delete/' + this.props.match.params.id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err));
        this.props.history.push('/contacts');
    }

    render() {
        return (
            <div className="contentcontainer">
                <h1>Contact Details</h1>
                <a href='/contacts' className='btn btn-outline-primary'>Back to List</a>
                <div className='showcontact'>
                    <div className="showcontact__cardbanner"></div>
                    <div className='showcontact__info'>
                        <div id='showcontact__titlediv'>
                            <h2 className='showcontact__name' >{ this.state.contact_firstname } { this.state.contact_lastname }</h2>
                            <a href={"/contacts/update/" + this.state._id} ><img src="/images/icons/edit-button.svg" className='showcontact__actionbtn' alt="Edit Button" /></a>
                            <button className='btn__action' onClick={this.onClick_Delete} ><img src="/images/icons/quit.svg" className='showcontact__actionbtn' alt="Delete Button"/></button>
                        </div>

                        <Modal show={this.state.isOpen} size='modal-sm' onRequestHide={this.hideModal}>
                            <ModalHeader>
                                <ModalTitle>Delete Confirmation</ModalTitle>
                                <button type="button" className="close" onClick={this.hideModal}><span
                                    aria-hidden="true">×</span>
                                    <span className="sr-only">Close</span>
                                </button>
                            </ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this entry?</p>
                                <p>This action cannot be undone.</p>
                            </ModalBody>
                            <ModalFooter>
                                <button className='btn btn-secondary' onClick={this.hideModal}>
                                    Close
                                </button>
                                <button className='btn btn-danger' onClick={this.delete}>
                                    Delete Contact
                                </button>
                            </ModalFooter>
                        </Modal>

                        <div className='uppercasetext borderbottom__lightgray'>
                            { this.state.contact_jobtitle } - { this.state.contact_company }
                        </div>
                        <div className='showcontact__contactinfo'>
                            <div className="marginbottom__5px tooltip-toggle" data-tooltip="LinkedIn Profile">
                                <img src="/images/icons/linkedin.svg" className='showcontact__socialicons' alt="LinkedIn Icon"/>
                                <a href={ this.state.contact_linkedin } target='_blank'>LinkedIn Profile</a>
                            </div>

                            <div className='marginbottom__5px tooltip-toggle' data-tooltip="Email">
                                <img src="/images/icons/mail.svg" className='showcontact__socialicons' alt="Email Icon"/>
                                <a href={ 'mailto:' + this.state.contact_email} >{this.state.contact_email}</a>
                            </div>

                            <div className="marginbottom__5px tooltip-toggle" data-tooltip="Phone Number">
                                <img src="/images/icons/call.svg" className='showcontact__socialicons' alt="Phone Icon" />
                                {this.state.contact_phone}
                            </div>

                            <div className="marginbottom__5px tooltip-toggle" data-tooltip="Date We Met">
                                <img src="/images/icons/calendar.svg" className='showcontact__calendaricon' alt="Calendar Icon"/>
                                { helpers.formatDateString(this.state.contact_datemet) }
                            </div>

                        </div>
                        <div className="uppercasetext borderbottom__lightgray ">Notes</div>
                        <div className='showcontact__text'>
                            { this.state.contact_notes }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
