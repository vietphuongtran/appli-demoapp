import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MyResponsiveLine from './graph-view.component';
import axios from "axios";


/**
 * The main landing page for Data Visualization
 */
export default class GraphVizHomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {datum: [], dayView: false};
        this.graphClick = this.graphClick.bind(this);
    }

    graphClick(pointer, event) {
        console.log(pointer);
        if(!this.state.dayView) {

            axios.get(`/appli-job-app-tracker/graphviz/getDaysByMonth/${pointer.data.x}`)
                .then(response => {
                    console.log(response);
                    this.setState({datum: [{"id": "Job Applications", "color": "#00FFFF", "data": response.data}], dayView: true});
                })
                .catch(function(error) {
                    console.log(error);
                })
        } else {
            axios.get('/appli-job-app-tracker/graphviz')
                .then(response => {
                    this.setState({datum: [{"id": "Job Applications", "color": "#00FFFF", "data": response.data}], dayView: false});
                })
                .catch(function(error) {
                    console.log(error);
                })
        }

    }



    componentWillMount(){
        axios.get('/appli-job-app-tracker/graphviz')
            .then(response => {
                this.setState({datum: [{"id": "Job Applications", "color": "#00FFFF", "data": response.data}]});
            })
            .catch(function(error) {
                console.log(error);
            })
    }


    render() {

        return (
            <div key='datavizcontainer' className="contentcontainer" style={{borderTop: "4px solid #052d4a", height: "75vh", paddingLeft: 0}}>
                <div style={{background: "#052d4a", color: "#fefefe", textAlign: "center"}}>{this.state.dayView ? `Click to return to Month by Month View` : `Click any month point to see day by day view`}</div>
                <div className="container" style={{ marginTop: 10, height: "75vh"}}>
                    <MyResponsiveLine  datum={this.state.datum} graphClick = {this.graphClick} />
                </div>




            </div>
        );
    }
}
