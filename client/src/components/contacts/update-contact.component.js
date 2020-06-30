import React, { Component } from 'react';
import axios from 'axios';
import Validator from "validator";
import helpers from "../../functions/susan-helperfunctions";

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

export default class UpdateContactComponent extends Component {
    // Take a constructor and pass in props from the component:
    constructor(props) {
        // Taking the parent constructor and passing in props:
        super(props);

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

        this.state = initialState;

    }

    componentDidMount(){
        axios.get('http://localhost:4000/appli-job-app-tracker/contacts/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    contact_firstname: response.data.contact_firstname,
                    contact_lastname: response.data.contact_lastname,
                    contact_linkedin: response.data.contact_linkedin,
                    contact_email: response.data.contact_email,
                    contact_phone: response.data.contact_phone,
                    contact_company: response.data.contact_company,
                    contact_jobtitle: response.data.contact_jobtitle,
                    contact_datemet: helpers.formatDateNumber(response.data.contact_datemet),
                    contact_notes: response.data.contact_notes,
                })
            })
            .catch(function(error) {
                console.log(error);
            })
    }

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
        console.log(this.state.contact_datemet);
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


    onSubmit(e) {
        e.preventDefault();

        const isValid = this.validateForm();
        if (!isValid) {
            return false;
        }


        const obj = {
            contact_firstname: this.state.contact_firstname,
            contact_lastname: this.state.contact_lastname,
            contact_linkedin: this.state.contact_linkedin,
            contact_email: this.state.contact_email,
            contact_phone: this.state.contact_phone,
            contact_company: this.state.contact_company,
            contact_jobtitle: this.state.contact_jobtitle,
            contact_datemet: this.state.contact_datemet,
            contact_notes: this.state.contact_notes
        };
        console.log(obj);
        axios.post('http://localhost:4000/appli-job-app-tracker/contacts/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        // History is library from React Router, it keeps track of session history for React Router
        // When a component is rendered By React Router, that component is passed 3 props: location, match, and history
        // history.push pushes a new entry into the history stack which redirects users to another route
        this.props.history.push('/contacts');
    }





    render() {
        return (
            <div className="contentcontainer" style={{marginTop: 10}}>
                <h1>Update Contact</h1>
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
                                        value={ this.state.contact_datemet }
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
                                <input type="submit" value="Update Contact" className="btn btn-outline-primary" />
                            </div>

                        </form>
                    </div>
                </div>
            )
        }
}
