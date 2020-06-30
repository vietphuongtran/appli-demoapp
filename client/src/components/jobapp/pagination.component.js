import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import ListJobAppComponent from "./list-jobapp.component";


export default class PaginationComponent extends Component {
    constructor(props) {
        // Taking the parent constructor and passing in props:
        super(props);
        // Set initial state object to contain a property of jobapp:
        // And that property is initially containing an empty array:
        this.state = {count: 1};

    }

    pageClick(page) {
        this.props.pageChange(page, this.props.filtered);
    }


    componentDidMount(){
        axios.get(`http://localhost:4000/appli-job-app-tracker/jobapps/count`)
            .then(response => {
                let [{value}] = response.data

                this.setState({count: value})
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    render() {
        let perPage = 10;
        let pageRange = 2;
        let pageCount = this.props.filtered ? this.props.length : this.state.count;
        let pages = Math.ceil(pageCount / perPage);
        const pageArray = [];
        for(let i = 1; i <= pages; i++) {
            if(i >= this.props.page - pageRange && i <= this.props.page + pageRange || this.props.page <= pageRange + 1 && i <= pageRange * 2 + 1) {
                pageArray.push(i);
            }


        }
        return (
            <div className='pageNavigation'>
                <Router basename="jobapp">
                <Link to={`/1`} className='page-start' onClick={() =>this.pageClick(1)}>&lt;&lt;</Link>
                <Link to={`/${this.props.page - 1 > 0 ? this.props.page - 1 : 1}`} className='page-back' onClick={() =>this.pageClick(this.props.page - 1 > 0 ? this.props.page - 1 : 1)}>&lt;</Link>
                {pageArray.map((value) => {
                    if(value === this.props.page) {
                        return <Link to={`/${this.props.page}`} className='current-page-number' onClick={() =>this.pageClick(value)}>{value}</Link>
                    } else {
                        return <Link to={`/${value}`} className='page-number' onClick={() =>this.pageClick(value)}>{value}</Link>
                    }


                })}
                <Link to={`/${this.props.page + 1 <= pages ? this.props.page + 1 : pages}`} className='page-forward' onClick={() =>this.pageClick(this.props.page + 1 <= pages ? this.props.page + 1 : pages)}>&gt;</Link>
                <Link to={`/${pages}`} className='page-end' onClick={() =>this.pageClick(pages)}>&gt;&gt;</Link>


                    <Route path="jobapp/:pageIndex" component={ListJobAppComponent}/>
                </Router>
            </div>
        )
    }
}