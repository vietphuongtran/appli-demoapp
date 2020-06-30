import React, { Component } from 'react';
import axios from 'axios';
import Validator from "validator";
import helpers from "../../functions/susan-helperfunctions";
import {createBrowserHistory} from 'history';

const initialState = {
    contact_firstname: '',
    contact_lastname: '',
    contact_linkedin: '',
    contact_email: '',
    contact_phone: '',
    contact_company: '',
    contact_jobtitle: '',
    contact_datemet: '',
    contact_notes: '',
    firstnameError: '',
    lastnameError: '',
    linkedinError: '',
    emailError: '',
    phoneError: '',
    companyError: '',
    jobtitleError: '',
    datemetError: ''
}

export const history = createBrowserHistory({forceRefresh:true});


export default class AddContactsComponent extends Component {

    // Step 1: Add a constructor to the component class:
    constructor(props) {
        super(props);


        // Step 4: B/c in the four implemented methods we’re dealing with the component’s state object we need to
        // make sure to bind those methods to this by adding the following lines of code to the constructor:

        this.onChangeContact_FirstName = this.onChangeContact_FirstName.bind(this);
        this.onChangeContact_LastName = this.onChangeContact_LastName.bind(this);
        this.onChangeContact_LinkedIn = this.onChangeContact_LinkedIn.bind(this);
        this.onChangeContact_Email = this.onChangeContact_Email.bind(this);
        this.onChangeContact_Phone = this.onChangeContact_Phone.bind(this);
        this.onChangeContact_Company = this.onChangeContact_Company.bind(this);
        this.onChangeContact_JobTitle = this.onChangeContact_JobTitle.bind(this);
        this.onChangeContact_DateMet = this.onChangeContact_DateMet.bind(this);
        this.onChangeContact_Notes = this.onChangeContact_Notes.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        // Inside the constructor set the initial state of the component by assigning an object to this.state.
        // The state comprises the following properties:
        this.state = initialState;
    }

    // Step 2: Add methods which can be used to update the state properties:
    onChangeContact_FirstName(e) {
        this.setState({
            contact_firstname: e.target.value,
            firstnameError: ''
        });
    }

    onChangeContact_LastName(e) {
        this.setState({
            contact_lastname: e.target.value,
            lastnameError:''
        });
    }

    onChangeContact_LinkedIn(e) {
        this.setState({
            contact_linkedin: e.target.value,
            linkedinError: ''
        });
    }

    onChangeContact_Email(e) {
        this.setState({
            contact_email: e.target.value,
            emailError: ''
        });
    }

    onChangeContact_Phone(e) {
        this.setState({
            contact_phone: e.target.value,
            phoneError: ''
        });
    }

    onChangeContact_Company(e) {
        this.setState({
            contact_company: e.target.value,
            companyError: ''
        });
    }

    onChangeContact_JobTitle(e) {
        this.setState({
            contact_jobtitle: e.target.value,
            jobtitleError: ''
        });
    }

    onChangeContact_DateMet(e) {
        this.setState({
            contact_datemet: e.target.value,
            datemetError: ''
        });
    }

    onChangeContact_Notes(e) {
        this.setState({
            contact_notes: e.target.value
        });
    }

    // ----- Function Validate Form ----- //
    validateForm = () => {
        let firstnameError = '';
        let lastnameError = '';
        let linkedinError = '';
        let emailError = '';
        let phoneError = '';
        let companyError = '';
        let jobtitleError = '';
        let datemetError = '';



        // ----- Name Validation ----- //
        if (Validator.isEmpty(this.state.contact_firstname)){
            firstnameError = 'Please enter a first name';
        }

        if (firstnameError){
            this.setState({firstnameError});
        }

        if (Validator.isEmpty(this.state.contact_lastname)){
            lastnameError = 'Please enter a last name';
        }

        if (lastnameError){
            this.setState({lastnameError});
        }

        // ----- URL Validation ----- //
        if (this.state.contact_linkedin && !Validator.isURL(this.state.contact_linkedin, {protocols: ['http','https'], require_protocol: true})) {
            linkedinError = 'Please enter a valid URL starting with https';
        }

        if (linkedinError) {
            this.setState({linkedinError});
        }

        // ----- Email Validation ----- //
        if ( this.state.contact_email && !Validator.isEmail(this.state.contact_email)){
            emailError = 'Please enter a valid e-mail';
        }

        if (emailError) {
            this.setState({emailError});
        }

        // ----- Phone Validation ----- //
        if (this.state.contact_phone && !Validator.isMobilePhone(this.state.contact_phone)){
            phoneError = 'Please enter a valid phone number';
        }

        if (phoneError){
            this.setState({phoneError});
        }

        // ----- Company Validation ----- //
        if (Validator.isEmpty(this.state.contact_company)){
            companyError = 'Please enter a company';
        }

        if (companyError){
            this.setState({companyError});
        }

        // ----- Job Title Validation ----- //

        if (Validator.isEmpty(this.state.contact_jobtitle)){
            jobtitleError = 'Please enter a job title';
        }

        if (jobtitleError) {
            this.setState({jobtitleError})
        }

        // ----- When We Met Validation ----- //
        if ( this.state.contact_datemet && !Validator.isDate(this.state.contact_datemet)){
            datemetError = 'Please enter a date using the following format: yyyy-mm-dd';
        }

        if (datemetError) {
            this.setState({datemetError});
        }

        if (firstnameError || lastnameError || linkedinError || emailError || phoneError || companyError || jobtitleError || datemetError) {
            return false;
        }


        return true;
    }


    // Step 3: Another method is needed to handle the submit event which will be implemented to create a new contact:
    onSubmit(e) {
        e.preventDefault();

        const isValid = this.validateForm();
        if (!isValid) {
            return false;
        }

        console.log(`contact_firstname: ${this.state.contact_firstname}`);
        console.log(`contact_lastname: ${this.state.contact_lastname}`);
        console.log(`contact_linkedin: ${this.state.contact_linkedin}`);
        console.log(`contact_email ${this.state.contact_email}`);
        console.log(`contact_phone: ${this.state.contact_phone}`);
        console.log(`contact_company: ${this.state.contact_company}`);
        console.log(`contact_jobtitle: ${this.state.contact_jobtitle}`);
        console.log(`contact_datemet: ${this.state.contact_datemet}`);
        console.log(`contact_notes: ${this.state.contact_notes}`);


        // Bring in code to communicate with backend. First we need to create a new Contact object:
        const newContact = {
            contact_firstname: this.state.contact_firstname,
            contact_lastname: this.state.contact_lastname,
            contact_linkedin: this.state.contact_linkedin,
            contact_email: this.state.contact_email,
            contact_phone: this.state.contact_phone,
            contact_company: this.state.contact_company,
            contact_jobtitle: this.state.contact_jobtitle,
            contact_datemet: this.state.contact_datemet,
            contact_notes: this.state.contact_notes
        }

        // Endpoint accepting incoming requests:
        axios.post('http://localhost:4000/appli-job-app-tracker/contacts/add', newContact)
            .then( (res) => {
                if(res.status === 200) {
                    console.log(res.data);
                    this.setState({
                        contact_firstname: '',
                        contact_lastname: '',
                        contact_linkedin: '',
                        contact_email: '',
                        contact_phone: '',
                        contact_company: '',
                        contact_jobtitle: '',
                        contact_datemet: '',
                        contact_notes: ''
                    });
                    this.props.history.push('/contacts') ;
            }

        })


    }


    // Step 5: Finally we need to add the JSX code which is needed to display the form:

    render() {

        return (
            <div className="contentcontainer" style={{marginTop: 10}}>
                <h1>Add New Contact</h1>
                <a href='/contacts' className='btn btn-outline-primary'>Back to List</a>
                <div>
                    <form onSubmit={this.onSubmit} >
                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Contact Name: <span className="form__required">*</span></label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className= {"form-control " + helpers.appendErrorClass(this.state,'firstnameError') }
                                    value={this.state.contact_firstname}
                                    onChange={this.onChangeContact_FirstName}
                                />
                                <div className='col text-error-display'>{this.state.firstnameError}</div>
                            </div>
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className= {"form-control col margin-left__10px " + helpers.appendErrorClass(this.state,'lastnameError') }
                                    value={this.state.contact_lastname}
                                    onChange={this.onChangeContact_LastName}
                                />
                                <div className='col text-error-display'>{this.state.lastnameError}</div>
                            </div>
                        </div>


                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >LinkedIn Profile: </label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    className= {"form-control " + helpers.appendErrorClass(this.state,'linkedinError') }
                                    value={this.state.contact_linkedin}
                                    onChange={this.onChangeContact_LinkedIn}
                                />
                                <div className='text-error-display'>{this.state.linkedinError}</div>
                            </div>
                        </div>


                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Email: </label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    className={"form-control " + helpers.appendErrorClass(this.state,'emailError') }
                                    value={this.state.contact_email}
                                    onChange={this.onChangeContact_Email}
                                />
                                <div className='text-error-display'>{this.state.emailError}</div>
                            </div>
                        </div>


                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Phone: </label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    placeholder="xxx-xxx-xxxx"
                                    className= {"form-control " + helpers.appendErrorClass(this.state,'phoneError') }
                                    value={this.state.contact_phone}
                                    onChange={this.onChangeContact_Phone}
                                />
                                <div className='text-error-display'>{this.state.phoneError}</div>
                            </div>
                        </div>


                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Company: <span className="form__required">*</span></label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    className={"form-control " + helpers.appendErrorClass(this.state,'companyError') }
                                    value={this.state.contact_company}
                                    onChange={this.onChangeContact_Company}
                                />
                                <div className='text-error-display'>{this.state.companyError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Job Title: <span className="form__required">*</span></label >
                            <div className="col col_margin">
                                <input
                                    type="text"
                                    className={"form-control " + helpers.appendErrorClass(this.state,'jobtitleError') }
                                    value={this.state.contact_jobtitle}
                                    onChange={this.onChangeContact_JobTitle}
                                />
                                <div className='text-error-display'>{this.state.jobtitleError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >When we met: </label >
                            <div className="col col_margin">
                                <input
                                    type="date"
                                    placeholder="yyyy-mm-dd"
                                    className={"form-control " + helpers.appendErrorClass(this.state,'datemetError') }
                                    value={this.state.contact_datemet}
                                    onChange={this.onChangeContact_DateMet}
                                />
                                <div className='text-error-display'>{this.state.datemetError}</div>
                            </div>
                        </div>


                        <div className="form-group row">
                            <label className="col-sm-6 col-form-label" >Notes: </label >
                            <textarea
                                type="textarea"
                                className="form-control col-sm-6"
                                value={this.state.contact_notes}
                                onChange={this.onChangeContact_Notes}
                            />
                        </div>


                        <div className="form-group row submit__rightalign">
                            <input type="submit" value="Add Contact" className="btn btn-outline-primary" />
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}