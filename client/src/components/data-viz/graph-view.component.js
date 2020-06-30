import { ResponsiveLine } from '@nivo/line'

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ datum, graphClick }) => (
    <ResponsiveLine
        data={datum}
        margin={{ top: 50, right: 130, bottom: 100, left: 60 }}
        // xScale={{ type: 'linear' }}
        // yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 50,

            legend: 'Date',
            legendOffset: 90,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Number of Applications',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'set2' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        curve="monotoneX"
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        onClick={(point, event) => {graphClick(point, event)}}
    />
)
export default MyResponsiveLine;