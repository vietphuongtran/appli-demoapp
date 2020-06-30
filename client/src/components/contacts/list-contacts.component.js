import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

const Contacts = props => (
    <div className='contact'>
        <div className='contact__name'>
            <h2>{ props.contact.contact_firstname }<br/>{ props.contact.contact_lastname }</h2>
        </div>
        <div className='contact__info'>
                <span className='contact__jobtitle'>{props.contact.contact_jobtitle}</span><br/>
                <span className='contact__company'>{ props.contact.contact_company }</span>
            <div className='contacts__social'>
                { displayEmailIcon( props.contact.contact_email ) }
                { displayPhoneIcon( props.contact.contact_phone ) }
                { displayLinkedInIcon( props.contact.contact_linkedin ) }
                <a href={"/contacts/show/" + props.contact._id}>
                    <img src="/images/icons/more.svg" className='contact__moreicon' alt="More Info" />
                </a>

            </div>
        </div>
    </div>
)

// ---------- Functions ---------- //


// Function to display email icon only if linked in account exists:
function displayEmailIcon (stringURL) {
    if (stringURL) {
        return (
            <a href={'mailto:' + stringURL } className='tooltip-toggle' data-tooltip={'Email: ' + stringURL}>
                <img src="/images/icons/mail.svg" className='contact__socialicons' alt="Link to Email"/>
            </a>
        )
    }
}

// Function to display phone icon only if linked in account exists:
function displayPhoneIcon (stringURL) {
    if (stringURL) {
        return (
            <a href='/' target='_blank' className='tooltip-toggle' data-tooltip= {'Phone Number: ' + stringURL}>
                <img src="/images/icons/call.svg" className='contact__socialicons' alt="Phone Number"/>
            </a>
        )
    }
}

// Function to display LinkedIn icon only if linked in account exists:
function displayLinkedInIcon (stringURL) {
    if (stringURL) {
        return (
            <a href={stringURL} target='_blank' className='tooltip-toggle' data-tooltip='Link to Profile'>
                <img src="/images/icons/linkedin.svg" className='contact__socialicons' alt="Link to LinkedIn Profile"/>
            </a>
        )
    }
}

export default class ListContactsComponent extends Component {

    // Take a constructor and pass in props from the component:
    constructor(props) {
        // Taking the parent constructor and passing in props:
        super(props);
        // Set initial state object to contain a property of contact:
        // And that property is initially containing an empty array:
        this.state = {
            contact: [],
            search: ''
        };
    }

    updateSearch (e) {
        console.log(e.target.value);
        this.setState({search: e.target.value})
    }



    // Need ot initialize the contact state property here with the contact
    // need to find a way to initially send request to teh backend, to get the response
    // back a list of contact items to set the state property accordingly
    componentDidMount(){
        axios.get('http://localhost:4000/appli-job-app-tracker/contacts')
            .then(response => {
                this.setState({contact: response.data})
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    // Create contactList method:
    contactList() {
        let filteredContacts = this.state.contact;
        if (filteredContacts !== null) {
            filteredContacts = this.state.contact.filter(
                (contact) => {
                    // indexOf looking for index of that particular character string
                    // If you cannot find this.state.search, then do not return it
                    return (
                        contact.contact_firstname.toLocaleLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        contact.contact_lastname.toLocaleLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        contact.contact_email.toLocaleLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        contact.contact_phone.toLocaleLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        contact.contact_company.toLocaleLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        contact.contact_jobtitle.toLocaleLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        contact.contact_notes.toLocaleLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                    )
                }
            );
        }


        // Iterate over elements
        // map callback function gets all items
        // return this.state.contact.map(function(currentContact, i) {
        return filteredContacts.map(function(currentContact, i) {
            return <Contacts contact={currentContact} key={i} />;
        })
    }

    render() {
        return (
            <div className="contentcontainer">
                <h1>Contacts</h1>
                <div className="page__nav">
                    <a href='/contacts/add' className='btn btn-outline-primary'>Add New Contact</a>
                    <form>
                        <label htmlFor="contactlist_search" hidden>Search</label>
                        <input
                            className="search__bar"
                            id="contactlist_search"
                            type="text"
                            placeholder="Search"
                            value={this.state.search}
                            onChange={this.updateSearch.bind(this)}
                        />
                    </form>
                </div>

                <div className="contacts__container">
                    { this.contactList() }
                </div>
            </div>
        )
    }
}