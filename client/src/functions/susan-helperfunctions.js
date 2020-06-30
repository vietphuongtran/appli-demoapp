import React, { Component } from 'react';



const helpers = {

    // ----- Function: Add form error styling ----- //
    appendErrorClass: function ( state, string) {
        if (state && state[string]) {
            let errorClass = 'form-error-display';
            return errorClass;
        }
    },


    // ----- Function: Format Date ----- //
    formatDateNumber: function (string) {
        if (string){
            string = string.split('T')[0];
            return string;
        }
    },

    // ---------- Functions ---------- //
    formatDateString: function (string){
    if (string) {
        // Trick to get the correct date since it's giving the date back one day off:
        // SRC: https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
        string = new Date(string.replace(/-/g, '\/').replace(/T.+/, ''));
        var options = { year:'numeric', month: 'short', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }
}



}

export default helpers;



