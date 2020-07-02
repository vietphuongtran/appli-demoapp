import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MyResponsiveCalendar from './calendar-view.component';
import axios from "axios";


/**
 * The main landing page for Data Visualization
 */
export default class CalendarVizHomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {datum: [], breakdown: []};
        this.calendarClick = this.calendarClick.bind(this);
    }



    componentDidMount(){
        axios.get('/appli-job-app-tracker/calendarviz')
            .then(response => {
                this.setState({datum: response.data})
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    calendarClick(pointer, event) {
        console.log(pointer);
        axios.get(`/appli-job-app-tracker/calendarviz/getByDate/${pointer.data.day}`)
            .then(response => {
                console.log(response);
                this.setState({breakdown: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })

    }

    render() {
        let output;
        if(this.state.breakdown.length > 0) {
            output = (
                <div key={'calendarResultHeader'}>
                    <h2>Applications for {this.state.breakdown[0].formatDate}</h2>
                    {this.state.breakdown.map((data) => {
                        return <div key={`CalendarViz${data._id}`}>{data.jobapp_title} @ {data.jobapp_companyname}</div>
                    })}

                </div>
            )
        }
        return (
            <div key='datavizcontainer' className="contentcontainer" style={{ borderTop: "4px solid #052d4a", height: "75vh" }}>

                <div className="container" style={{ marginTop: 10, height: "50vh"}}>
                    <MyResponsiveCalendar  datum={this.state.datum} calendarClick = {this.calendarClick} />
                </div>

                <div>
                    {output}
                </div>



            </div>
        );
    }
}
