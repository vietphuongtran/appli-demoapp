import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ResponsiveCalendarCanvas  } from '@nivo/calendar'


const MyResponsiveCalendar = ({datum, calendarClick}) => (
    <ResponsiveCalendarCanvas
        data={datum}
        from="2019-01-02"
        to="2020-07-12"
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
        onClick={(point, event) => {calendarClick(point, event)}}
    />
)

export default MyResponsiveCalendar;