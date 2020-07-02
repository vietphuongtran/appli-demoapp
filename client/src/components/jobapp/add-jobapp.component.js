import React, { Component } from 'react';
import axios from 'axios';
import Validator from 'validator';
import helpers from "../../functions/susan-helperfunctions";
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory({forceRefresh:true});

const initialState = {
    jobapp_title: '',
    jobapp_postlink: '',
    jobapp_postingID: '',
    jobapp_companyname: '',
    jobapp_companyphone: '',
    jobapp_companywebsite: '',
    jobapp_applydate: '',
    jobapp_followupdate: '',
    jobapp_contactfirstname: '',
    jobapp_contactlastname: '',
    jobapp_contactjobtitle: '',
    jobapp_contactphone: '',
    jobapp_contactemail: '',
    jobapp_resume: '',
    jobapp_cv: '',
    jobapp_notes: '',
    jobapp_status: false,

    titleError: '',
    postlinkError: '',
    postingIDError: '',
    companynameError: '',
    companyphoneError: '',
    companywebsiteError: '',
    applydateError: '',
    followupdateError: '',
    contactfirstnameError: '',
    contactlastnameError: '',
    contactjobtitleError: '',
    contactphoneError: '',
    contactemailError: '',
    resumeError: '',
    cvError: '',
    notesError: ''

}



export default class AddJobAppComponent extends Component {

    // Step 1: Add a constructor to the component class:
    constructor(props) {
        super(props);


        // Step 4: B/c in the four implemented methods we’re dealing with the component’s state object we need to
        // make sure to bind those methods to this by adding the following lines of code to the constructor:
        this.onChangeJobApp_Title = this.onChangeJobApp_Title.bind(this);
        this.onChangeJobApp_PostLink = this.onChangeJobApp_PostLink.bind(this);
        this.onChangeJobApp_PostingID = this.onChangeJobApp_PostingID.bind(this);
        this.onChangeJobApp_CompanyName= this.onChangeJobApp_CompanyName.bind(this);
        this.onChangeJobApp_CompanyPhone = this.onChangeJobApp_CompanyPhone.bind(this);
        this.onChangeJobApp_CompanyWebsite = this.onChangeJobApp_CompanyWebsite.bind(this);
        this.onChangeJobApp_ApplyDate = this.onChangeJobApp_ApplyDate.bind(this);
        this.onChangeJobApp_FollowUpDate = this.onChangeJobApp_FollowUpDate.bind(this);
        this.onChangeJobApp_ContactFirstname = this.onChangeJobApp_ContactFirstname.bind(this);
        this.onChangeJobApp_ContactLastname = this.onChangeJobApp_ContactLastname.bind(this);
        this.onChangeJobApp_ContactJobTitle = this.onChangeJobApp_ContactJobTitle.bind(this);
        this.onChangeJobApp_ContactPhone = this.onChangeJobApp_ContactPhone.bind(this);
        this.onChangeJobApp_ContactEmail = this.onChangeJobApp_ContactEmail.bind(this);
        this.onChangeJobApp_Resume = this.onChangeJobApp_Resume.bind(this);
        this.onChangeJobApp_CV = this.onChangeJobApp_CV.bind(this);
        this.onChangeJobApp_Notes = this.onChangeJobApp_Notes.bind(this);
        this.onChangeJobApp_Status = this.onChangeJobApp_Status.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        // Inside the constructor set the initial state of the component by assigning an object to this.state.
        // The state comprises the following properties:
        this.state = initialState;

    }

    // Step 2: Add methods which can be used to update the state properties:
    onChangeJobApp_Title(e) {
        this.setState({
            jobapp_title: e.target.value,
            titleError: ''
        });
    }

    onChangeJobApp_PostLink(e) {
        this.setState({
            jobapp_postlink: e.target.value,
            postlinkError: ''
        });
    }

    onChangeJobApp_PostingID(e) {
        this.setState({
            jobapp_postingID: e.target.value
        });
    }

    onChangeJobApp_CompanyName(e) {
        this.setState({
            jobapp_companyname: e.target.value,
            companynameError: ''
        });
    }

    onChangeJobApp_CompanyPhone(e) {
        this.setState({
            jobapp_companyphone: e.target.value,
            companyphoneError: ''
        });
    }

    onChangeJobApp_CompanyWebsite(e) {
        this.setState({
            jobapp_companywebsite: e.target.value,
            companywebsiteError: ''
        });
    }

    onChangeJobApp_ApplyDate(e) {
        this.setState({
            jobapp_applydate: e.target.value,
            applydateError: ''
        });
    }

    onChangeJobApp_FollowUpDate(e) {
        this.setState({
            jobapp_followupdate: e.target.value,
            followupdateError: ''
        });
    }

    onChangeJobApp_ContactFirstname(e) {
        this.setState({
            jobapp_contactfirstname: e.target.value
        });
    }

    onChangeJobApp_ContactLastname(e) {
        this.setState({
            jobapp_contactlastname: e.target.value
        });
    }

    onChangeJobApp_ContactJobTitle(e) {
        this.setState({
            jobapp_contactjobtitle: e.target.value
        });
    }

    onChangeJobApp_ContactPhone(e) {
        this.setState({
            jobapp_contactphone: e.target.value,
            contactphoneError: ''
        });
    }

    onChangeJobApp_ContactEmail(e) {
        this.setState({
            jobapp_contactemail: e.target.value,
            contactemailError: ''
        });
    }

    onChangeJobApp_Resume(e) {
        this.setState({
            jobapp_resume: e.target.value,
            resumeError: ''
        });
    }

    onChangeJobApp_CV(e) {
        this.setState({
            jobapp_cv: e.target.value,
            cvError: ''
        });
    }

    onChangeJobApp_Notes(e) {
        this.setState({
            jobapp_notes: e.target.value
        });
    }


    onChangeJobApp_Status(e) {
        this.setState({
            jobapp_status: e.target.value
        });
    }

    // ----- Function Validate Form ----- //

    validateForm = () => {
        let titleError = '';
        let postlinkError = '';
        let postingIDError = '';
        let companynameError = '';
        let companyphoneError = '';
        let companywebsiteError = '';
        let applydateError = '';
        let followupdateError = '';
        let contactfirstnameError = '';
        let contactlastnameError = '';
        let contactjobtitleError = '';
        let contactphoneError = '';
        let contactemailError = '';
        let resumeError = '';
        let cvError = '';
        let notesError = '';


        // ----- Job Title Validation ----- //
        if (Validator.isEmpty(this.state.jobapp_title)){
            titleError = 'Please enter the job title';
        }

        if (titleError){
            this.setState({titleError});
        }

        // ----- Job Posting Link Validation ----- //
        if (this.state.jobapp_postlink && !Validator.isURL(this.state.jobapp_postlink, {protocols: ['http','https'], require_protocol: true})){
            postlinkError = "Please enter a valid URL starting with 'http'";
        }

        if (postlinkError){
            this.setState({postlinkError});
        }

        // ----- Company Name Validation ----- //
        if (Validator.isEmpty(this.state.jobapp_companyname)){
           companynameError = "Please enter the company name";
        }

        if ( companynameError){
            this.setState({ companynameError});
        }

        // ----- Company Phone Validation ----- //
        if (this.state.jobapp_companyphone && !Validator.isMobilePhone(this.state.jobapp_companyphone)){
            companyphoneError = "Please enter a valid phone number";
        }

        if ( companyphoneError){
            this.setState({ companyphoneError});
        }

        // ----- Company Website Validation ----- //
        if ( this.state.jobapp_companywebsite && !Validator.isURL(this.state.jobapp_companywebsite, {protocols: ['http','https'], require_protocol: true})){
            companywebsiteError = "Please enter a valid URL starting with 'http'";
        }

        if ( companywebsiteError){
            this.setState({ companywebsiteError});
        }

        // ----- Application Date Validation ----- //

        if (Validator.isEmpty(this.state.jobapp_applydate)) {
            applydateError = "Enter application date";
        }
        if (this.state.jobapp_applydate && !Validator.isDate(this.state.jobapp_applydate)){
            applydateError = 'Please enter a date using the following format: yyyy-mm-dd';
        }


        if (applydateError){
            this.setState({applydateError});
        }


        // ----- Follow Up Date Validation ----- //
        if (this.state.jobapp_followupdate && !Validator.isDate(this.state.jobapp_followupdate)){
            followupdateError = 'Please enter a date using the following format: yyyy-mm-dd';
        }

        if ( followupdateError){
            this.setState({followupdateError});
        }

        // ----- Contact Phone Validation ----- //
        if (this.state.jobapp_contactphone && !Validator.isMobilePhone(this.state.jobapp_contactphone)){
           contactphoneError = "Please enter a valid phone number";
        }

        if (contactphoneError){
            this.setState({contactphoneError});
        }

        // ----- Contact Phone Validation ----- //
        if (this.state.jobapp_contactphone && !Validator.isEmail(this.state.jobapp_contactemail)){
            contactemailError = "Please enter a valid email";
        }

        if (contactemailError){
            this.setState({contactemailError});
        }

        if ( titleError ||
            postlinkError ||
            postingIDError ||
            companynameError ||
            companyphoneError ||
            companywebsiteError ||
            applydateError ||
            followupdateError ||
            contactfirstnameError ||
            contactlastnameError ||
            contactjobtitleError ||
            contactphoneError ||
            contactemailError ||
            resumeError ||
            cvError ||
            notesError ) {

            return false;
        }

        return true;

    }




    // Step 3: Another method is needed to handle the submit event which will be implemented to create a new todo item:
    onSubmit(e) {
        e.preventDefault();

        const isValid = this.validateForm();
        if (!isValid) {
            return false;
        }

        console.log(`Form submitted:`);
        console.log(`JobApp_Title: ${this.state.jobapp_title}`);
        console.log(`JobApp_PostLink: ${this.state.jobapp_postlink}`);
        console.log(`JobApp_PostingID: ${this.state.jobapp_postingID}`);
        console.log(`JobApp_CompanyName: ${this.state.jobapp_companyname}`);
        console.log(`JobApp_CompanyPhone: ${this.state.jobapp_companyphone}`);
        console.log(`JobApp_CompanyWebsite: ${this.state.jobapp_companywebsite}`);
        console.log(`JobApp_ApplyDate: ${this.state.jobapp_applydate}`);
        console.log(`JobApp_FollowUpDate: ${this.state.jobapp_followupdate}`);
        console.log(`JobApp_ContactFirstName: ${this.state.jobapp_contactfirstname}`);
        console.log(`JobApp_ContactLastName: ${this.state.jobapp_contactlastname}`);
        console.log(`JobApp_ContactJobTitle: ${this.state.jobapp_contactjobtitle}`);
        console.log(`JobApp_ContactPhone: ${this.state.jobapp_contactphone}`);
        console.log(`JobApp_ContactEmail: ${this.state.jobapp_contactemail}`);
        console.log(`JobApp_Resume: ${this.state.jobapp_resume}`);
        console.log(`JobApp_CoverLetter: ${this.state.jobapp_cv}`);
        console.log(`JobApp_Notes: ${this.state.jobapp_notes}`);
        console.log(`JobApp_Status: ${this.state.jobapp_status}`);

        // Bring in code to communicate with backend. First we need to create a new Job Application object:
        const newJobApp = {
            jobapp_title: this.state.jobapp_title,
            jobapp_postlink: this.state.jobapp_postlink,
            jobapp_postingID: this.state.jobapp_postingID,
            jobapp_companyname: this.state.jobapp_companyname,
            jobapp_companyphone: this.state.jobapp_companyphone,
            jobapp_companywebsite: this.state.jobapp_companywebsite,
            jobapp_applydate: this.state.jobapp_applydate,
            jobapp_followupdate: this.state.jobapp_followupdate,
            jobapp_contactfirstname: this.state.jobapp_contactfirstname,
            jobapp_contactlastname: this.state.jobapp_contactlastname,
            jobapp_contactjobtitle: this.state.jobapp_contactjobtitle,
            jobapp_contactphone: this.state.jobapp_contactphone,
            jobapp_contactemail: this.state.jobapp_contactemail,
            jobapp_resume: this.state.jobapp_resume,
            jobapp_cv: this.state.jobapp_cv,
            jobapp_notes: this.state.jobapp_notes,
            jobapp_status: false
        }

        // Endpoint accepting incoming requests:
        axios.post('/appli-job-app-tracker/jobapps/add', newJobApp)
            .then(res => console.log(res.data));


        this.setState({
            jobapp_title: '',
            jobapp_postlink: '',
            jobapp_postingID: '',
            jobapp_companyname: '',
            jobapp_companyphone: '',
            jobapp_companywebsite: '',
            jobapp_applydate: '',
            jobapp_followupdate: '',
            jobapp_contactfirstname: '',
            jobapp_contactlastname: '',
            jobapp_contactjobtitle: '',
            jobapp_contactphone: '',
            jobapp_contactemail: '',
            jobapp_resume: '',
            jobapp_cv: '',
            jobapp_notes: '',
            jobapp_status: false
        });

        this.props.history.push('/jobapp/1');
    }

// Step 5: Finally we need to add the JSX code which is needed to display the form:

    render() {
        return (
            <div className="contentcontainer" style={{marginTop: 10}}>
                <h1>Add New Job Application</h1>
                <a href='/jobapp/1' className='btn btn-outline-primary'>Back to List</a>
                <div>
                    <form onSubmit={this.onSubmit} enctype="multipart/form-data"  >

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Job Title: <span className="form__required">*</span></label >
                            <div className="col col_margin">
                                <input  type="text"
                                        className={"form-control " + helpers.appendErrorClass(this.state, 'titleError') }
                                        value={this.state.jobapp_title}
                                        onChange={this.onChangeJobApp_Title}
                                />
                                <div className='text-error-display'>{this.state.titleError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Job Posting Link: </label >
                            <div className="col col_margin">
                                <input  type="text"
                                    className={"form-control " + helpers.appendErrorClass(this.state, 'postlinkError') }
                                    value={this.state.jobapp_postlink}
                                    onChange={this.onChangeJobApp_PostLink}
                                />
                                <div className='text-error-display'>{this.state.postlinkError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Job Posting ID: </label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    className={"form-control " + helpers.appendErrorClass(this.state, 'postingIDError') }
                                    value={this.state.jobapp_postingID}
                                    onChange={this.onChangeJobApp_PostingID}
                                />
                                <div className='text-error-display'>{this.state.postingIDError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Company Name: <span className="form__required">*</span></label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    className={"form-control " + helpers.appendErrorClass(this.state, 'companynameError') }
                                    value={this.state.jobapp_companyname}
                                    onChange={this.onChangeJobApp_CompanyName}
                                />
                                <div className='text-error-display'>{this.state.companynameError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Company Phone: </label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    className={"form-control " + helpers.appendErrorClass(this.state, 'companyphoneError') }
                                    value={this.state.jobapp_companyphone}
                                    onChange={this.onChangeJobApp_CompanyPhone}
                                />
                                <div className='text-error-display'>{this.state.companyphoneError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Company Website: </label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    className={"form-control " + helpers.appendErrorClass(this.state, 'companywebsiteError') }
                                    value={this.state.jobapp_companywebsite}
                                    onChange={this.onChangeJobApp_CompanyWebsite}
                                />
                                <div className='text-error-display'>{this.state.companywebsiteError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Application Date: <span className="form__required">*</span></label >
                            <div className="col col_margin">
                                <input
                                    type="date"
                                    placeholder="yyyy-mm-dd"
                                    className={"form-control " + helpers.appendErrorClass(this.state, 'applydateError') }
                                    value={helpers.formatDateNumber(this.state.jobapp_applydate)}
                                    onChange={this.onChangeJobApp_ApplyDate}
                                />
                                <div className='text-error-display'>{this.state.applydateError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Follow Up Date: </label >
                            <div className="col col_margin">
                                <input
                                    type="date"
                                    placeholder="yyyy-mm-dd"
                                    className={"form-control " + helpers.appendErrorClass(this.state, 'followupdateError') }
                                    value={helpers.formatDateNumber(this.state.jobapp_followupdate)}
                                    onChange={this.onChangeJobApp_FollowUpDate}
                                />
                                <div className='text-error-display'>{this.state.followupdateError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Contact Name: </label >
                            <input
                                type="text"
                                placeholder="First Name"
                                className="form-control col"
                                value={this.state.jobapp_contactfirstname}
                                onChange={this.onChangeJobApp_ContactFirstname}
                            />

                            <input
                                type="text"
                                placeholder="Last Name"
                                className="form-control col margin-left__10px"
                                value={this.state.jobapp_contactlastname}
                                onChange={this.onChangeJobApp_ContactLastname}
                            />
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Contact Job Title: </label >
                            <input
                                type="text"
                                className="form-control col-sm-6"
                                value={this.state.jobapp_contactjobtitle}
                                onChange={this.onChangeJobApp_ContactJobTitle}
                            />
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Contact Phone: </label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    className={"form-control " + helpers.appendErrorClass(this.state, 'contactphoneError') }
                                    placeholder="xxx-xxx-xxxx"
                                    value={this.state.jobapp_contactphone}
                                    onChange={this.onChangeJobApp_ContactPhone}
                                />
                                <div className='text-error-display'>{this.state.contactphoneError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Contact Email: </label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    className={"form-control " + helpers.appendErrorClass(this.state, 'contactemailError') }
                                    value={this.state.jobapp_contactemail}
                                    onChange={this.onChangeJobApp_ContactEmail}
                                />
                                <div className='text-error-display'>{this.state.contactemailError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Resume: </label >

                            <div className="col col_margin">

                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="jobapp_inputresume">Upload</span>
                                    </div>
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            className={"custom-file-input" + helpers.appendErrorClass(this.state, 'resumeError') }
                                            id="jobapp_addresume"
                                            aria-describedby="jobapp_inputresume"
                                            accept=".pdf, .docx, .doc"
                                            onChange={this.onChangeJobApp_Resume}
                                        />
                                    <label className="custom-file-label" htmlFor="jobapp_addresume">Choose resume file </label>
                                  </div>
                                </div>

                                <div className='text-error-display'>{this.state.resumeError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Cover Letter: </label >

                            <div className="col col_margin">

                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="jobapp_inputcv"> Upload </span>
                                    </div>
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            className={"custom-file-input" + helpers.appendErrorClass(this.state, 'cvError') }
                                            id="jobapp_addcv"
                                            aria-describedby="jobapp_inputcv"
                                            accept=".pdf, .docx, .doc"
                                            onChange={this.onChangeJobApp_CV}
                                        />
                                    <label className="custom-file-label" htmlFor="jobapp_addcv">Choose CV file </label>
                                  </div>
                                </div>

                                <div className='text-error-display'>{this.state.cvError}</div>
                            </div>
                        </div>


                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Notes: </label >
                            <textarea
                                type="textarea"
                                className="form-control col-sm-6"
                                value={this.state.jobapp_notes}
                                onChange={this.onChangeJobApp_Notes}
                            />
                        </div>

                        <div className="form-group row submit__rightalign">
                            <input type="submit" value="Add Job Application" className="btn btn-outline-primary" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
