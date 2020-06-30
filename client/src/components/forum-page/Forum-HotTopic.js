import React, { Component } from 'react';
import {Link} from "react-router-dom";

class ForumHotTopic extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            hotTopic: []
        }
    }

    // Fetch the list on first mount
    componentDidMount() {
        this.getHotTopic();
    }

    //Retrieves the list of items from the Express app
    getHotTopic = () => {
        fetch('https://appli-demoapp.herokuapp.com/appli-job-app-tracker/forum-hottopic')
            .then((data) => data.json())
            .then((res) => this.setState({ hotTopic: res.data }))
    }
    render() {
        const { hotTopic } = this.state
        console.log(hotTopic)
        return (
            <div className="forumHotTopic">
                <h2>Hot topic of the day</h2>
                <div>
                    {hotTopic.map((item, i) => {
                        return(
                            <div key={i} className="forumHotTopicLink">
                                <Link to={'./forum-details/' + item._id}>{item.content}</Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}
export default ForumHotTopic;