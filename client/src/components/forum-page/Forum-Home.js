import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ForumHome extends Component {
  render() {
    return (
    <div className="App">
      <h1>Welcome to Appli discussion forum</h1>
      <h2>A place to share your experience and seeking advice from others</h2>
      {/* Link to ForumList.js */}
      <Link to={'./forum-list'}>
        <button className="btn btn-primary">
            Start discuss and sharing now!
        </button>
      </Link>
    </div>
    );
  }
}
export default ForumHome;