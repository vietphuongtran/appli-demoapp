import React, { Component } from 'react';
import axios from 'axios';
import CKEditor from 'ckeditor4-react';
//Step 1: add contructors
//step 4: bind the method to the contructors
//step 2: add method to update the props
//step 3: add method to handle onsubmit event
//step 5: render it to the DOM
 //1

export default class ForumAdd extends Component {
    constructor (props) {
        super (props);
        this.onChangePost_Content = this.onChangePost_Content.bind(this);
        this.onChangePost_Topic = this.onChangePost_Topic.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            post_topic: '',
            post_content: '',
            post_reply: []
        }
    }

    onChangePost_Content( e) {
        this.setState( {
            post_content: e.editor.getData()
        } );
    }
    //step 2: add method to update the props
    // onChangePost_Content(e) {
    //     this.setState({
    //         post_content: e.target.value
    //     });
    // }
    onChangePost_Topic(e) {
        this.setState({
            post_topic: e.target.value
        });
    }
    onChangePost_Reply(e) {
        this.setState({
            post_reply: e.target.value
        });
    }
    //step 3:
    onSubmit(e) {
        e.preventDefault();

        // console.log(`Form submitted:`);
        console.log(`Post Content:  ${this.state.post_content}`);
        console.log(`Post Topic:  ${this.state.post_topic}`);

        const forumdata = {
            post_content: this.state.post_content,
            post_topic: this.state.post_topic,
            post_replies: this.state.post_reply
        }
        console.log(forumdata);
        //sending the forumdata to the putData in the server using axios

        axios.post('https://appli-demoapp.herokuapp.com/appli-job-app-tracker/forum-add', forumdata)
            // {
            //     content: this.state.post_content,
            //     topic: this.state.post_topic
            // })
            .then((res) => {
                //after done with the adding redirect back to List
                this.props.history.push("./Forum-List");
                console.log(res.data)
            }).catch((error) => {
            console.log(error)
        });
    }
    render () {
        return (
            <div>
                <h2>Add a post</h2>
                <form method="POST" action="/" onSubmit={this.onSubmit} >
                    <div>
                        <label>Share your experience:</label>
                        <div>
                            {/*<textarea*/}
                            {/*    value={this.state.post_content}*/}
                            {/*    onChange={this.onChangePost_Content}*/}
                            {/*/>*/}
                            <CKEditor
                                config={{
                                    // toolbar: [
                                    //     [ 'Cut', 'Copy' ],
                                    //     [ 'About' ]
                                    // ],
                                    //this will not append the p tag
                                    autoParagraph: false,
                                    //this will not append the nsbp, gt, lt, amp when you enter special character
                                    basicEntities: false
                                }
                                }
                                post_content={this.state.post_content}
                                onChange={this.onChangePost_Content}
                            />
                            <div>
                                <div>Select your topic</div>
                                <select value={this.state.post_topic} onChange={this.onChangePost_Topic}>
                                    <option value ="">--Please choose one--</option>
                                    <option value="Coding Technical test">Coding Technical Test</option>
                                    <option value="Resume and Cover Letter related">Resume and Cover Letter related</option>
                                </select>
                            </div>
                        </div>
                        <input type="hidden" value={this.state.post_reply} onChange={this.onChangePost_Reply}/>
                        <button className="btn btn-primary" type="submit" value="submit">Add post</button>
                    </div>
                    {/*<div>*/}
                </form>
            </div>
        );
    }
}
