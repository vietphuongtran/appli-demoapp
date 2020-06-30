import React, { Component } from 'react';
import axios from 'axios';
import helpers from "../../functions/susan-helperfunctions";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "bootstrap/dist/css/bootstrap.min.css";


export default class ShowJobAppComponent extends Component {


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

	// Click listener to open modal:
	onClick_Delete(e) {
		this.openModal();
	}

	// Set state to open modal:
	openModal() {
		this.setState({
			isOpen: true
		});
		console.log(this.state.isOpen);
	}

	// Change state to hide modal:
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

		axios.get('http://localhost:4000/appli-job-app-tracker/jobapps/id/' + this.props.match.params.id)
			.then(response => {
				this.setState({
					_id: response.data._id,
                    jobapp_title: response.data.jobapp_title,
                    jobapp_postlink: response.data.jobapp_postlink,
                    jobapp_postingID: response.data.jobapp_postingID,
                    jobapp_companyname: response.data.jobapp_companyname,
                    jobapp_companyphone: response.data.jobapp_companyphone,
                    jobapp_companywebsite: response.data.jobapp_companywebsite,
                    jobapp_applydate: response.data.jobapp_applydate,
                    jobapp_followupdate: response.data.jobapp_followupdate,
                    jobapp_contactfirstname: response.data.jobapp_contactfirstname,
                    jobapp_contactlastname: response.data.jobapp_contactlastname,
                    jobapp_contactjobtitle: response.data.jobapp_contactjobtitle,
                    jobapp_contactphone: response.data.jobapp_contactphone,
                    jobapp_contactemail: response.data.jobapp_contactemail,
                    jobapp_resume: response.data.jobapp_resume,
                    jobapp_cv: response.data.jobapp_cv,
                    jobapp_notes: response.data.jobapp_notes,
                    jobapp_status: response.data.jobapp_status


				})
			})
			.catch(function (error) {
				console.log(error);
			})
	}

	// Delete function:
	delete(){
		axios.get('http://localhost:4000/appli-job-app-tracker/jobapps/delete/' + this.props.match.params.id)
			.then(console.log('Deleted'))
			.catch(err => console.log(err));
		this.props.history.push('/jobapp/1');
	}

	render() {
		return (
			<>
			<div className="contentcontainer">
				<h1>Job Application Details</h1>
				<a href="/jobapp/1" className='btn btn-outline-primary'>Back to List</a>
				<div className='showjobapp'>
					<div className="showcontact__cardbanner"></div>
					<div className='showcontact__info'>
						<div id='showcontact__titlediv'>
							<h2 className='showcontact__name'>{ this.state.jobapp_title }</h2>
							<a href={"/jobapp/update/" + this.state._id} ><img src="/images/icons/edit-button.svg" className='showcontact__actionbtn' alt="Edit Button" /></a>
							<button className='btn__action' onClick={this.onClick_Delete} ><img src="/images/icons/quit.svg" className='showcontact__actionbtn' alt="Delete Button" /></button>
						</div>

						<Modal show={this.state.isOpen} size='modal-sm' onRequestHide={this.hideModal}>
						  <ModalHeader>
							<ModalTitle>Delete Confirmation</ModalTitle>
							<button type="button" class="close" onClick={this.hideModal}><span
                                aria-hidden="true">×</span>
                            <span class="sr-only">Close</span>
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

						<div className='uppercasetext borderbottom__lightgray margin-top__15px marginbottom__5px'>
							Job Posting Details
						</div>
                        <div id='jobapp__postinglink' className="marginbottom__5px">
							<img src="/images/icons/link.svg" className='showcontact__socialicons' alt="Link Icon"/>
                            Job Posting Link: <a href={ this.state.jobapp_postlink} target='_blank'>{ this.state.jobapp_postlink}</a>
                        </div>
                        <div id='jobapp__postingID' className="marginbottom__5px">
							<img src="/images/icons/tag.svg" className='showcontact__socialicons' alt="ID Icon"/>
                            Job Posting ID: { this.state.jobapp_postingID}
                        </div>

                        <div className='uppercasetext borderbottom__lightgray margin-top__15px marginbottom__5px'>
							Company Details
						</div>
                        <div id='jobapp__companyname' className="marginbottom__5px">
							<img src="/images/icons/company.svg" className='showcontact__socialicons' alt="Company Icon"/>
                            Company Name: <a href={ this.state.jobapp_companywebsite} target='_blank'>{ this.state.jobapp_companyname}</a>
                        </div>
                        <div id='jobapp__companyphone' className="marginbottom__5px">
							<img src="/images/icons/call.svg" className='showcontact__socialicons' alt="Phone Icon"/>
                            Company Phone: { this.state.jobapp_companyphone}
                        </div>

						<div className='uppercasetext borderbottom__lightgray margin-top__15px marginbottom__5px'>
							Application Details
						</div>
			 			<div  id='jobapp__applydate' className="marginbottom__5px">
							<img src="/images/icons/calendar.svg" className='showcontact__socialicons' alt="Calendar Icon"/>
                            Application Date: { helpers.formatDateString(this.state.jobapp_applydate) }
                        </div>
                        <div  id='jobapp__followupdate' className="marginbottom__5px">
							<img src="/images/icons/calendar.svg" className='showcontact__socialicons' alt="Calendar Icon"/>
                            Follow up Date: { helpers.formatDateString(this.state.jobapp_followupdate) }
                        </div>
						<div  id='jobapp__resume' className="marginbottom__5px">
							<img src="/images/icons/resume.svg" className='showcontact__socialicons' alt="Resume Icon"/>
                            Resume: <a href={ this.state.jobapp_resume } target='_blank'>{ this.state.jobapp_resume }</a>
                        </div>
						<div  id='jobapp__cv' className="marginbottom__5px">
							<img src="/images/icons/curriculum.svg" className='showcontact__socialicons' alt="Curriculum Vitae Icon"/>
                           Cover Letter: <a href={ this.state.jobapp_cv } target='_blank'>{ this.state.jobapp_cv }</a>
                        </div>

						<div className='uppercasetext borderbottom__lightgray margin-top__15px marginbottom__5px'>
							Contact Details
						</div>
						<div  id='jobapp__contactname' className="marginbottom__5px">
							<img src="/images/icons/user.svg" className='showcontact__socialicons' alt="Contact Icon"/>
                            Name: { this.state.jobapp_contactfirstname} { this.state.jobapp_contactlastname}
                        </div>
                        <div  id='jobapp__contactjobtitle' className="marginbottom__5px">
							<img src="/images/icons/description.svg" className='showcontact__socialicons' alt="Job Title Icon"/>
							Job Title: { this.state.jobapp_contactjobtitle}
                        </div>
         				<div id='jobapp__contactphone' className="marginbottom__5px">
							<img src="/images/icons/call.svg" className='showcontact__socialicons' alt="Phone Icon"/>
                            Phone: { this.state.jobapp_contactphone}
                        </div>
                        <div id='jobapp__contactemail' className="marginbottom__5px">
							<img src="/images/icons/mail.svg" className='showcontact__socialicons' alt="Email Icon"/>
                            Email: <a href={'mailto:' + this.state.jobapp_contactemail} > {this.state.jobapp_contactemail}</a>
                        </div>

						<div className='uppercasetext borderbottom__lightgray margin-top__15px marginbottom__5px'>
							Notes
						</div>
						<div  id='jobapp__notes'>
                            { this.state.jobapp_notes}
                        </div>

					</div>
				</div>
			</div>

		</>
		)
	}
}

