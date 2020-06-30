import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ForumHotTopic from './Forum-HotTopic';
import ForumComment from "./Forum-Comment";
import ForumReply from "./Forum-Reply";

class ForumDetails extends Component {
    // Initialize the state
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            topic:'',
            content: '',
            replies: []
         }
    }

    // Fetch the list on first mount
    componentDidMount() {
        this.getDetails();
    }
    // Retrieves the list of items from the Express app
    getDetails = () => {
        axios.get('https://appli-demoapp.herokuapp.com/appli-job-app-tracker/forum-details/' + this.props.match.params.id)
            .then ((response) => {
                this.setState({
                    content: response.data.content,
                    topic: response.data.topic,
                    replies: response.data.replies
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const { replies } = this.state
        return (
            <div>
                <h1>Thread Details</h1>
                {/* Check to see if any items are found*/}
                {/*{list.length ? (*/}
                <div className="forumFlexContainer">
                    <div className="forumFlexContent">
                        <div className="forumDetail"> {this.state.content}</div>
                        <div className="forumTopic">{this.state.topic}</div>
                        <div>
                             <span>
                                <Link to={'/forum-edit/' + this.props.match.params.id}> &#128393; Edit post </Link>
                            </span>
                            <span>
                                <Link to={'/forum-delete/' + this.props.match.params.id}> &#128465; Delete post </Link>
                            </span>
                            <div>
                                <Link to={'/forum-list'}> 	&#128281; Back to List</Link>
                            </div>
                        </div>

                        <div className="forumDetailComment">
                            {replies.length ? (
                                <div>
                                    {replies.map((reply, i) => {
                                        return (
                                            <div className="forumFlexContainer" key={i}>
                                                <div className="profilePic">
                                                    <img src={require('../../images/blankProfilePic.jpg')}/>
                                                </div>
                                                <div>{reply}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div>No reply found</div>
                            )
                            }
                        </div>
                        {/*<ForumComment />*/}
                    </div>
                    <ForumHotTopic />
                </div>
                {/*<ForumReply />*/}
                <Link to={'/forum-reply/' + this.props.match.params.id}>Add a reply</Link>
            </div>
        );
    }
}
export default ForumDetails;
