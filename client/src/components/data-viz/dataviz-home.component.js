import React, { Component } from 'react';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom';

import MyResponsiveCalendar from './calendar-view.component';
import axios from "axios";
import CalendarVizHomeComponent from "./calendarviz-home.component";
import GraphVizHomeComponent from "./graphviz-home.component";


/**
 * The main landing page for Data Visualization
 */
export default class DataVizHomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tabStyles: [{},{}], dataContent: ''};
        this.tabClick = this.tabClick.bind(this);
    }

    componentWillMount() {
        document.title = "Appli - Data Visualization";
        //handling for direct routing
        if(this.props.location.pathname === "/data-viz/graphview") {
            this.setState({dataContent: <GraphVizHomeComponent />});
            this.tabClick(1);
        } else if(this.props.location.pathname === "/data-viz/calendarview") {
            this.setState({dataContent: <CalendarVizHomeComponent />});
            this.tabClick(0);
        }
    }

    tabClick(tab) {
        let newStyle = this.state.tabStyles;
         newStyle = newStyle.map((style, i) => {
            if(i === tab) {
                return {background: "#052d4a", color: "#fefefe"};
            } else {
                return {};
            }
        })
        this.setState({tabStyles: newStyle});
    }


    render() {
        console.log(this.props);
        return (
            <div key='datavizcontainer' className="datavizcontainer">
                <h1>Data Visualization: Applications</h1>

                <Router basename='data-viz'>
                    <div className='dataviz-routing' style={{display: "grid", gridTemplateColumns: "1fr 1fr", width: "50%"}}>

                        <div className='dataviz-link-div'>
                            <Link to={`/calendarview`} onClick={() => this.tabClick(0)} style={this.state.tabStyles[0]}>Calendar</Link>
                        </div>
                        <div className='dataviz-link-div'>
                            <Link to={`/graphview`} onClick={() => this.tabClick(1)} style={this.state.tabStyles[1]}>Graph</Link>
                        </div>
                    </div>

                    <Route path="/calendarview"  component={CalendarVizHomeComponent} />
                    <Route path="/graphview"  component={GraphVizHomeComponent} />
                </Router>



            </div>
        );
    }
}