import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import helpers from "../../functions/susan-helperfunctions";

class CalendarDay extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dateValue: props.dateValue,
      value: props.value,
      getData: props.getData,
      events: [],
      showEvent: props.showEvent === undefined ? false : props.showEvent,
      calendar: props.calendar
    } 
  }
  
  componentDidMount() {
    //Here we will grab the data from the database using Axios
    //this.state.value = 1;

    //Must have some way to get on a specific day using the dateValue
    if (this.state.showEvent) {
      //Convert the Date to the same timezone and time in the database
      var dateTime = this.state.dateValue;
      //dateTime.toUTCString();
      //dateTime.setHours(20);
      //console.log(dateTime);
      //Make multiple request for the Job Applications and Networking
      Promise.all([
        axios.get('/appli-job-app-tracker/jobapps?date=' + dateTime),
        axios.get('/appli-job-app-tracker/networking?date=' + dateTime)
      ]).then(([response1, response2]) => {
        var events = [];
        //Loop through all the data in the Job Applications
        for(var i = 0; i < response1.data.length; i++) {
          events.push(
            {
              id: response1.data[i]._id, 
              name: response1.data[i].jobapp_title, 
              type: "Apply", 
              location: response1.data[i].jobapp_companyname,
              link: "/jobapp/show/" + response1.data[i]._id
            });
        }
        //Loop through all the data in the Networking
        for(var i = 0; i < response2.data.length; i++) {
          events.push(
            {
              id: response2.data[i]._id,
              name: response2.data[i].event_title === undefined ? "" : response2.data[i].event_title, 
              type: "Network",
              location: response2.data[i].event_location,
              link: "/networking-events/details/" + response2.data[i]._id
            });
        }
        //Set the event data to the events
        this.setState(
          {events: events}
        );
      })
      .catch(function(error) {
        console.log(error);
      })
    }
    //if we showing the events in the Calendar Month View
    else {
      //Convert the Date to the same timezone and time in the database
      var dateTime = this.state.dateValue;
      //dateTime = new Date(dateTime.toUTCString());
      //dateTime.setHours(20);
      //console.log(this.state.dateValue);
      //console.log(dateTime);
      //console.log(dateTime);
      //Make multiple request for the Job Applications and Networking
      Promise.all([
        axios.get('/appli-job-app-tracker/jobapps?date=' + dateTime),
        axios.get('/appli-job-app-tracker/networking?date=' + dateTime)
      ]).then(([response1, response2]) => {
        var events = [];
        //Loop through all the data in the Job Applications
        for(var i = 0; i < response1.data.length; i++) {
          events.push(
            {
              id: response1.data[i]._id, 
              name: response1.data[i].jobapp_title, 
              type: "Apply", 
              location: response1.data[i].jobapp_companyname,
              link: "/jobapp/show/" + response1.data[i]._id
            });
        }
        //Loop through all the data in the Networking
        for(var i = 0; i < response2.data.length; i++) {
          events.push(
            {
              id: response2.data[i]._id, 
              name: response2.data[i].event_title === undefined ? "" : response2.data[i].event_title, 
              type: "Network", 
              location: response2.data[i].event_location,
              link: "/networking-events/details/" + response2.data[i]._id
            });
        }
        //Set the event data to the events
        this.setState(
          {events: events}
        );
      })
      .catch(function(error) {
        console.log(error);
      })
    }

  }

  //Function that checks if the (eventName or eventLocation) and the eventType passes the filter condition
  //Return: bool
    //true: if the condition is meet
    //false: otherwise
  //Param:
    //eventName: The name of the event
    //eventType: The type of the event (Apply, Interview, Network)
    //eventLocation: The location of the event
  checkEventPassFilter(eventName, eventType, eventLocation) {
    if (!eventName.toLowerCase().includes(this.state.calendar.state.filterText.toLowerCase()) 
    && !eventLocation.toLowerCase().includes(this.state.calendar.state.filterText.toLowerCase())) {
      return false;
    }
    if (this.state.calendar.state.filterEventType === "") {
      return true;
    }
    else if (!(eventType === this.state.calendar.state.filterEventType)) {
      return false;
    }
    return true;
  }

  //Function that will notify that the calendar must show the events of a paticular day
  showDay() {
    this.setState({showEvent: true});
    this.state.calendar.setState(
      {
        day: this.state.value,
        dayComponent: this,
        mode: "day"
      });
  }
  
  render() {  
    const events = [];
    //Showing the day on the calendar
    if (this.state.showEvent) {
      for (let index = 0; index < this.state.events.length; index++) {
        if (this.checkEventPassFilter(this.state.events[index].name, this.state.events[index].type, this.state.events[index].location)) {
          events.push(
            <div key={"events-" + index} className= {"calendar__" + this.state.events[index].type.toLowerCase()} >
              <Link to={ this.state.events[index].link }>
                {this.state.events[index].type} for {this.state.events[index].name} for {this.state.events[index].location}
              </Link>
            </div>
            );
        }
      }
      return (
        <div className="calendar__dayEvents">
          {events}
        </div>
      );
    }
    //Showing the event in the month view
    else {
      for (let index = 0; index < this.state.events.length; index++) {
        if (this.checkEventPassFilter(this.state.events[index].name, this.state.events[index].type, this.state.events[index].location)) {
          events.push(
            <div key={"events-" + index} className={"calendar__" + this.state.events[index].type.toLowerCase()} >
              <Link to={ this.state.events[index].link }>
                {this.state.events[index].type}
              </Link>
            </div>
            );
        }
      }
      return (
          <div className="calendar__dayBody">
            <button className="btn btn-outline-primary calendar__dayHeader" onClick={() => this.showDay()}>
                { this.state.value }
            </button>
            <div className="calendar__dayEvents">
                {events}
            </div>
          </div>
      );
    }
  }
}

//My custom made calendar
export default class Calendar extends Component {
  constructor(props) {
    super(props);
    var date = new Date();
    this.state = {
        filterText: "",
        filterEventType: "",
        day: 1,
        //dayComponent: null,
        month: date.getMonth(),
        year: date.getFullYear(),
        mode: "month"
    }

    //Functions that are binded when the user types or select the filter inputs
    this.onChangeFilterText = this.onChangeFilterText.bind(this);
    this.onChangeFilterEventType = this.onChangeFilterEventType.bind(this);
  }

  componentDidMount() {
    //Get the current date
    var date = new Date();
    this.setState({
      month: date.getMonth(),
      year: date.getFullYear()
    });
  }

  /*
  Function that returns the number of days in a month
  Returns a number: 28, 29, 30, or 31
  Param:
    month: The actual month in a calendar (1-12)
    year: The actual year in a calendar (2020)
  */
  daysInMonth(month, year) { 
    return new Date(year, month, 0).getDate(); 
  } 

  prev() {
    if (this.state.mode === "day") {
      var date = new Date(this.state.year, this.state.month, this.state.day - 1); 
      this.setState({
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      });
    }
    else if (this.state.mode === "month") {
      //if the month is Jan then must go back a year and have month to Dec
      if (this.state.month === 0) {
        this.setState({
          month: 11,
          year: this.state.year - 1
        });
      } 
      else {
        //The reason for this.state.month is not decrease by one for the daysInMonth function is that the parameter is accepting not a zero index value which our month value
        this.setState({
          month: this.state.month - 1
        });
      }  
    }
    else if (this.state.mode === "monthSelect") {
      this.setState({
        year: this.state.year - 1
      });
    }
    else if (this.state.mode === "yearSelect") {
      this.setState({
        year: Math.floor(this.state.year / 10) * 10 - 10
      });
    }

  }
  
  next() {
    if (this.state.mode === "day") {
      var date = new Date(this.state.year, this.state.month, this.state.day + 1); 
      this.setState({
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      });
    }
    else if (this.state.mode === "month") {
      //if the month is Jan then must go back a year and have month to Dec
      if (this.state.month === 11) {
        this.setState({
          month: 0,
          year: this.state.year + 1
        });
      } 
      else {
        this.setState({
          month: this.state.month + 1
        });
      }  
    }
    else if (this.state.mode === "monthSelect") {
      this.setState({
        year: this.state.year + 1
      });
    }
    else if (this.state.mode === "yearSelect") {
      this.setState({
        year: Math.floor(this.state.year / 10) * 10 + 10
      });
    }
  }

  //Function that changes the body of the calendar
  //Only gets called from the nav button on the calendar
  changeBody() {
    switch(this.state.mode) {
      case "day":
        this.setState({mode: "month"});
        break;
      case "month": 
        this.setState({mode: "monthSelect"});
        break;
      case "monthSelect": 
        this.setState({mode: "yearSelect"});
        break;
      default:
        break;
    }
  }


  /*
  Function that changes the month of the calendar
  Returns nothing (void)
  Param:
    index: The index value of the month selected (0-11)
  */
  selectMonth(index) {
    this.setState({
      month: index,
      mode: "month"
    });
  }

  /*
  Function that changes the year of the calendar
  Returns nothing (void)
  Param:
    index: The index value of the year selected
  */
  selectYear(index) {
    this.setState({
      year: index,
      mode: "monthSelect"
    });
  }

  onChangeFilterText(e) {
    this.setState({
      filterText: e.target.value
    });
  }

  onChangeFilterEventType(e) {
    this.setState({
      filterEventType: e.target.value
    });
  }

  renderCalendarFilter() {
    return (
      <div className="calendar__filter form-group row">
        <div className="form-group row">
            <label className="col-form-label col-sm-6">Filter Text:</label >
            <input  
              type="text"
              className="form-control col-sm-6"
              value={this.state.filterText}
              onChange={this.onChangeFilterText}
            />
        </div>
        <div className="form-group row">
            <label className="col-sm-6 col-form-label">Event Type:</label>
            <select value={this.state.value} onChange={this.onChangeFilterEventType} className="form-control col-sm-6">
                <option value="">None</option>
                <option value="Apply">Apply</option>
                <option value="Interview">Interview</option>
                <option value="Network">Network</option>
            </select>
        </div>
      </div>
    );
  }

  renderCalendarNav() {
    var date = new Date(this.state.year, this.state.month, 1);
    //Get the month name
    var monthName = date.toLocaleString('default', { month: 'long' });
    var navHeader;
    if (this.state.mode === "day") {
      navHeader = <button onClick={() => this.changeBody()} className="btn btn-outline-primary">{monthName} {this.state.day} {this.state.year}</button>;
    }
    if (this.state.mode === "month") {
      navHeader = <button onClick={() => this.changeBody()} className="btn btn-outline-primary">{monthName} {this.state.year}</button>;
    } 
    else if (this.state.mode === "monthSelect") {
      navHeader = <button onClick={() => this.changeBody()} className="btn btn-outline-primary">{this.state.year}</button>;
    }
    else if (this.state.mode === "yearSelect") {
      navHeader = 
        <div>
          {Math.floor(this.state.year / 10) * 10} - {Math.floor(this.state.year / 10) * 10 + 9}
        </div>;
    }

    return (
      <div className="calendar__nav">
        <button onClick={() => this.prev()} className="btn btn-outline-primary">Prev</button>
        {navHeader}
        <button onClick={() => this.next()} className="btn btn-outline-primary">Next</button>
      </div>
    );


  }

  renderCalendarBody() {
    if (this.state.mode === "day") {
      return this.renderDay();
    } 
    else if (this.state.mode === "month") {
      return this.renderMonth();
    }
    else if (this.state.mode === "monthSelect") {
      return this.renderMonthSelect();
    }
    else if (this.state.mode === "yearSelect") {
      return this.renderYearSelect();
    }
  }

  renderDay() {
    return (
      <div key={this.state.day} className="calendar__event">
          <CalendarDay 
            dateValue={new Date(this.state.year, this.state.month, this.state.day)}
            value={this.state.day}
            getData={false}
            showEvent={true}
            calendar={this}
            />
      </div>
    );
  }

  renderMonth() {
    //Have to find what day the first day of the month is
    
    //Plan to use css grid to decide how the day will show up

    //Get the current date
    var firstDay = new Date(this.state.year, this.state.month, 1);
    const days = [];
    
    //We only need to set the first day for the css class and the css grid will auto display it in a calendar
    var gridClassNames;
    var firstDayClassName = "calendar__week_" + firstDay.getDay();
    gridClassNames = [
      firstDayClassName,
      "calendar__day"
    ];
    gridClassNames = gridClassNames.join(' ');
    //getData is used to know for grabbing the data from the database events
    days.push(
        <div key={firstDay.toDateString()} className={gridClassNames}>
          <CalendarDay value={1} dateValue={firstDay} getData={false} calendar={this} />
        </div>
      );
    
    var currentDate = firstDay;
    var numDays = this.daysInMonth(this.state.month + 1, this.state.year);
    for (let index = 2; index < numDays + 1; index++) {
      //We have to create a new Date object due to when it is saving in the component it is using reference instead of value
      currentDate = new Date(firstDay.getFullYear(), firstDay.getMonth(), index);
      days.push(
        <div key={currentDate.toDateString()} className="calendar__day">
          <CalendarDay value={index} dateValue={currentDate} getData={false} calendar={this} />
        </div>
      );
    }
    return (
        <div className="calendar__month">
          <div className="calendar__monthHeader">SUN</div>
          <div className="calendar__monthHeader">MON</div>
          <div className="calendar__monthHeader">TUE</div>
          <div className="calendar__monthHeader">WED</div>
          <div className="calendar__monthHeader">THU</div>
          <div className="calendar__monthHeader">FRI</div>
          <div className="calendar__monthHeader">SAT</div>
          {days}
        </div>
      );
  }

  renderMonthSelect() {
    const monthSelctions = [];
    var date;
    var monthName;
    for (let index = 0; index < 12; index++) {
      date = new Date(2020, index, 1);
      monthName = date.toLocaleString('default', { month: 'short' });
      monthSelctions.push(
        <button key={monthName} value={index} onClick={() => this.selectMonth(index)} className="btn btn-outline-primary">
          {monthName}
        </button>
      );
    }

    return (
      <div className="calendar__monthSelect">
        {monthSelctions}
      </div>
    );
  }

  renderYearSelect() {
    const yearSelctions = [];
    var decadeYear = Math.floor(this.state.year / 10) * 10;
    for (let index = 0; index < 10; index++) {
      yearSelctions.push(
        <button key={decadeYear + index} value={decadeYear + index} onClick={() => this.selectYear(decadeYear + index)} className="btn btn-outline-primary">
          {decadeYear + index}
        </button>
      );
    }

    return (
      <div className="calendar__yearSelect">
        {yearSelctions}
      </div>
    );
  }

  //Plan to render a nav and a body for the calendar
  render() {
    return (
      <div className="calendar">
        {this.renderCalendarFilter()}
        {this.renderCalendarNav()}
        {this.renderCalendarBody()}
      </div>
    );
  }
}

