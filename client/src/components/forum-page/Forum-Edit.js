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

export default class ForumEdit extends Component {
    constructor (props) {
        super (props);
        this.onChangePost_Content = this.onChangePost_Content.bind(this);
        this.onChangePost_Topic = this.onChangePost_Topic.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            topic: '',
            content: ''
        }
    }
    componentDidMount = () => {
        this.getDetails();
    }

    // Retrieves the list of items from the Express app
    getDetails = () => {
        axios.get('https://appli-demoapp.herokuapp.com/appli-job-app-tracker/forum-details/' + this.props.match.params.id)
            .then ((response) => {
                this.setState({
                    content: response.data.content,
                    topic: response.data.topic
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //step 2: add method to update the props
    onChangePost_Content(e) {
        this.setState({
            content: e.target.value
            // content: e.editor.setData()
        });
    }
    onChangePost_Topic(e) {
        this.setState({
            topic: e.target.value
        });
    }
    //step 3:
    onSubmit(e) {
        e.preventDefault();

        // console.log(`Form submitted:`);
        console.log(`Post Content:  ${this.state.content}`);
        console.log(`Post Topic:  ${this.state.topic}`);

        const forumdata = {
            content: this.state.content,
            topic: this.state.topic
        }
        console.log(forumdata);
        //sending the forumdata to the server using axios
        axios.post('https://appli-demoapp.herokuapp.com/appli-job-app-tracker/forum-edit/' + this.props.match.params.id, forumdata)
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
                <h2>Edit this post</h2>
                <form method="POST" action="/" onSubmit={this.onSubmit} >
                    <div>
                        <label>Share your experience:</label>
                        <div>
                            <textarea className="form-control z-depth-1" rows="6"
                                value={this.state.content}
                                onChange={this.onChangePost_Content}
                            />
                            {/*<CKEditor*/}
                            {/*    activeClass="p10"*/}
                            {/*    //the content props is built in to CKEditor to display defaultValue of a textarea*/}
                            {/*    content = {this.state.content}*/}
                            {/*    config={{*/}
                            {/*        // toolbar: [*/}
                            {/*        //     [ 'Cut', 'Copy' ],*/}
                            {/*        //     [ 'About' ]*/}
                            {/*        // ],*/}
                            {/*        //this will not append the p tag*/}
                            {/*        autoParagraph: false,*/}
                            {/*        //this will not append the nsbp, gt, lt, amp when you enter special character*/}
                            {/*        basicEntities: false*/}
                            {/*    }}*/}

                            {/*    onChange={this.onChangePost_Content}*/}
                            {/*/>*/}
                            <div>
                                <div>Select your topic</div>
                                <select value={this.state.topic} onChange={this.onChangePost_Topic}>
                                    <option value ="">--Please choose one--</option>
                                    <option value="Coding Technical test">Coding Technical Test</option>
                                    <option value="Resume and Cover Letter related">Resume and Cover Letter related</option>
                                </select>
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit" value="submit">Edit post</button>
                    </div>
                    {/*<div>*/}
                </form>
            </div>
        );
    }

}
