import React, { Fragment, useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { Bar } from "react-chartjs-2";
import './style.css'

const Vix = ({data}) => {

    const [chartOptions, setChartOptions] = useState({
        scales: {
            yAxes: [{
                id: 'A',
                type: 'linear',
                position: 'left',
            }, {
                id: 'B',
                type: 'linear',
                position: 'right',
            }]
        }
    })
    const [chartData, setChartData] = useState()

    const getChartData = () => {
       
    }

    useEffect(() => {
        console.log('running use effect');
        const dataArr = data[0].history
        const vixChart = {
            labels: dataArr.map(x => dayjs(x.date).format('MM/DD/YY')),
            datasets: [

                {
                    type: 'line',
                    label: 'open',
                    data: dataArr.map(x => x.open),
                    yAxisID: 'A',
                    fill: false,
                    order: 1,
                    borderColor: 'rgba(180, 171, 227, 0.41)',
                    //borderWidth: 4,
                },
                {
                    type: 'line',
                    label: 'close',
                    data: dataArr.map(x => x.price),
                    yAxisID: 'A',
                    fill: false,
                    order: 1,
                    borderColor: 'rgba(255, 206, 86, 0.2)',
                    //borderWidth: 4,
                },
                {
                    type: 'line',
                    label: 'high',
                    data: dataArr.map(x => x.dayHigh),
                    yAxisID: 'A',
                    fill: false,
                    order: 1,
                    borderColor: 'rgba(75, 192, 192, 0.2)',
                    //borderWidth: 4,
                },
                {
                    type: 'line',
                    label: 'low',
                    data: dataArr.map(x => x.dayLow),
                    yAxisID: 'A',
                    fill: false,
                    order: 1,
                    borderColor: 'rgba(180, 171, 227, 0.41)',
                    //borderWidth: 4,
                },

            ],

            name: data.name,
        }
        setChartData(vixChart)
        

    }, [data])

    return (
        <Fragment>
            <Bar data={chartData} options={chartOptions} />
        </Fragment>
    )
}


export default Vix