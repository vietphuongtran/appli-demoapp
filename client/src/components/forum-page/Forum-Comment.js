import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ForumComment extends Component {
    // Initialize the state
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            replies: []
        }
    }

    // Fetch the list on first mount
    componentDidMount() {
        this.getReplies();
    }

    // Retrieves the list of items from the Express app
    getReplies = () => {
        axios.get('http://localhost:4000/appli-job-app-tracker/forum-details/' + this.props.match.params.id)
            .then ((response) => {
                this.setState({
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
            </div>

        );
    }
}
export default ForumComment;
