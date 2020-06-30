import React, { Component } from 'react';
import ForumHotTopic from './Forum-HotTopic';
import { Link } from 'react-router-dom';

class ForumList extends Component {
    // Initialize the state
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            list: []
        }
    }

    // Fetch the list on first mount
    componentDidMount() {
        this.getList();
    }

    // Retrieves the list of items from the Express app
    getList = () => {
        fetch('https://appli-demoapp.herokuapp.com/appli-job-app-tracker/forum-list')
            .then((data) => data.json())
            .then((res) => this.setState({ list: res.data }))
    }

    render() {
        const { list } = this.state;
        console.log (list);
        // let viewsCount = Math.round(Math.random()*10);
        // let interestCount = Math.round(viewsCount * Math.random())
        return (
            <div className="forumPage">
                <h1>List of Topics</h1>
                {/* Check to see if any items are found*/}
                {list.length ? (
                    <div className="forumFlexContainer">
                            {/* Render the list of items */}
                            <div className="forumFlexContent">
                            {list.map((item, i) => {
                                return(
                                    <div key={i}>
                                        <div className="forumContentList">
                                            <span>{item.content}</span>
                                            <div className="forumComment"><span> {Math.round(Math.random()*10)} views</span> <span> {Math.round(Math.round(Math.random()*10)*Math.random())} interests</span></div>
                                            <div><Link to={'./forum-details/' + item._id}>Read more</Link></div>
                                        </div>
                                        {/*<div>{item.topic}</div>*/}
                                    </div>
                                );
                            })}
                            </div>
                            <ForumHotTopic />
                    </div>
                ) : (
                    <div>
                        <h2>No List Items Found</h2>
                    </div>
                )
                }
                <div><Link to={'./Forum-Add'}>Add a new post</Link></div>
            </div>
        );
    }
}

export default ForumList;