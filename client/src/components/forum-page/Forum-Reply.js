import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
//import CKEditor from "ckeditor4-react";
import CKEditor from "react-ckeditor-component";
//Step 1: add contructors
//step 4: bind the method to the contructors
//step 2: add method to update the props
//step 3: add method to handle onsubmit event
//step 5: render it to the DOM
//1

export default class ForumReply extends Component {
    constructor (props) {
        super (props);
        //this.onChangePost_Content = this.onChangePost_Content.bind(this);
        this.onChangePost_Replies = this.onChangePost_Replies.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            replies: ''
        }
    }
    // componentDidMount = () => {
    //     this.getDetails();
    // }
    //
    // // Retrieves the list of items from the Express app
    // getDetails = () => {
    //     axios.get('http://localhost:3001/api/forum-details/' + this.props.match.params.id)
    //         .then ((response) => {
    //             this.setState({
    //                 content: response.data.content,
    //                 topic: response.data.topic
    //             });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }
    //step 2: add method to update the props
    onChangePost_Replies(e) {
        this.setState({
            replies: e.target.value
        });
    }
    //step 3:
    onSubmit(e) {
        e.preventDefault();

        // console.log(`Form submitted:`);

        const forumdata = {
            replies: this.state.replies
        }
        //sending the forumdata to the server using axios
        axios.post('https://appli-demoapp.herokuapp.com/appli-job-app-tracker/forum-reply/' + this.props.match.params.id, forumdata)
            // {
            //     content: this.state.post_content,
            //     topic: this.state.post_topic
            // })
            .then((res) => {
                //after done with the adding redirect back to Details
                this.props.history.push("/Forum-Details/" + this.props.match.params.id);
                console.log(res.data)
            }).catch((error) => {
            console.log(error)
        });
    }
    render () {

        return (
            <div>
                <h2>Add your reply</h2>
                <form method="POST" action="/" onSubmit={this.onSubmit} >
                    <div>
                        <div>
                            <textarea className="form-control z-depth-1" rows="6"
                                      value={this.state.replies}
                                      onChange={this.onChangePost_Replies}
                            />

                        </div>
                        <button className="btn btn-primary" type="submit" value="submit">Add a reply</button>
                    </div>
                    {/*<div>*/}
                </form>
            </div>
        );
    }

}
