import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

export default class ForumDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: '',
            content: '',
            id: ''
        }
        this.deletePost = this.deletePost.bind(this);
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
                    topic: response.data.topic,
                    id: response.data._id
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }
    deletePost() {
        axios.get('http://localhost:4000/appli-job-app-tracker/forum-delete/' + this.props.match.params.id)
            .then(() => {
                console.log('Post Deleted !!!');
                this.props.history.push("/Forum-List");
            })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
        return (
            <div>
                <h2>Are you sure you want to delete this post?</h2>
                <div>{this.state.content}</div>
                <div>{this.state.topic}</div>
                <Button onClick={() => this.deletePost()}>Delete</Button>
                <Link to={'/forum-list'}>No, go back to List</Link>
            </div>
        );
    }
}

